"""Check the synthesized narration and recover word timing.

Usage: python align.py <narration.json> <audio_dir>

Transcribes every sentence clip with faster-whisper. Writes align.json:
  [{"heard": "...", "score": 0..1, "curve": [[char_fraction, seconds], ...]}, ...]

"curve" maps progress through the sentence's characters to time, which the
builder uses to place caption words. "score" is the similarity between what was
asked for and what was heard; low scores mean the clip should be regenerated.
"""

import difflib
import json
import re
import sys
from pathlib import Path

import soundfile as sf
import torch
import torchaudio
from faster_whisper import WhisperModel


def norm(s):
    return re.sub(r"[^a-z0-9 ]", "", s.lower().replace("-", " "))


def main():
    sentences = json.loads(Path(sys.argv[1]).read_text())["sentences"]
    audio = Path(sys.argv[2])
    model = WhisperModel("base.en", device="cpu", compute_type="int8")
    out = []
    for i, text in enumerate(sentences):
        data, sr = sf.read(str(audio / f"s{i:03d}.wav"), dtype="float32")
        pcm = torchaudio.functional.resample(torch.from_numpy(data), sr, 16000).numpy()
        segs, _ = model.transcribe(pcm, word_timestamps=True, beam_size=3)
        words = [w for s in segs for w in s.words]
        heard = "".join(w.word for w in words).strip()
        total = sum(len(w.word.strip()) for w in words) or 1
        curve, c = [[0.0, words[0].start if words else 0.0]], 0
        for w in words:
            c += len(w.word.strip())
            curve.append([c / total, w.end])
        score = difflib.SequenceMatcher(None, norm(text).split(), norm(heard).split()).ratio()
        out.append({"heard": heard, "score": round(score, 3), "curve": curve})
        flag = "" if score > 0.75 else "   <-- CHECK"
        print(f"{i:02d} {score:.2f} {heard}{flag}", flush=True)
    (audio / "align.json").write_text(json.dumps(out))


if __name__ == "__main__":
    main()
