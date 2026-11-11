"""Narration for one episode, generated with VoiceStudio's OmniVoice engine.

Usage: python tts.py <narration.json> <out_dir>

narration.json : {"sentences": ["spoken text", ...], "files": ["<hash>.wav", ...]}
out_dir        : receives one clip per sentence, named by a hash of its text, so
                 editing one line only regenerates that line

The channel voice is fixed: the first run designs a voice from VOICE_INSTRUCT
and stores it in assets/voice_ref.wav; every later sentence is voice-cloned
from that clip so all episodes sound like the same narrator.

Requires the VoiceStudio checkout on PYTHONPATH (see README).
"""

import json
import sys
from pathlib import Path

import soundfile as sf
import torch

from omnivoice.models.omnivoice import OmniVoice
from omnivoice.models.omnivoice import OmniVoiceGenerationConfig

ROOT = Path(__file__).resolve().parent.parent
VOICE_REF = ROOT / "assets" / "voice_ref.wav"
VOICE_REF_TEXT = (
    "Every structure has a limit. This is the story of what happens "
    "when someone finds it the hard way."
)
VOICE_INSTRUCT = "male, middle-aged, low pitch, american accent"
# Narrator voices. "v1" is used by episodes 001-013. "v2" (014 onward) keeps the serious
# tone but was chosen for wider pitch movement; its reference clip is checked in.
VOICES = {
    "v1": (VOICE_REF, VOICE_REF_TEXT),
    "v2": (ROOT / "assets" / "voice_v2.wav",
           "Here is the strange part. Nobody noticed, not for years! So what actually went wrong? Let's take a closer look."),
}
STEPS = 24
SEED_OFFSET = int(__import__("os").environ.get("TTS_SEED_OFFSET", "0"))  # bump to re-roll a bad clip


def save(path, wav, sr):
    data = wav.detach().cpu().float()
    if data.ndim > 1:
        data = data.squeeze(0)
    sf.write(str(path), data.numpy(), sr, subtype="PCM_16")
    return data.shape[-1] / sr


def main():
    spec = json.loads(Path(sys.argv[1]).read_text())
    out = Path(sys.argv[2])
    out.mkdir(parents=True, exist_ok=True)

    torch.set_num_threads(4)
    model = OmniVoice.from_pretrained(
        "k2-fsa/OmniVoice", device_map="cpu", dtype=torch.float32
    )
    sr = model.sampling_rate
    cfg = OmniVoiceGenerationConfig(num_step=STEPS)

    if not VOICE_REF.exists():
        VOICE_REF.parent.mkdir(parents=True, exist_ok=True)
        cfg_ref = OmniVoiceGenerationConfig(num_step=32)
        wav = model.generate(
            text=VOICE_REF_TEXT,
            language="en",
            instruct=VOICE_INSTRUCT,
            generation_config=cfg_ref,
            seed=7,
        )[0]
        save(VOICE_REF, wav, sr)
        print("designed channel voice ->", VOICE_REF, flush=True)

    ref, ref_text = VOICES[spec.get("voice", "v1")]
    prompt = model.create_voice_clone_prompt(ref_audio=str(ref), ref_text=ref_text)

    for i, (text, name) in enumerate(zip(spec["sentences"], spec["files"])):
        path = out / name
        if path.exists():
            continue
        wav = model.generate(
            text=text,
            language="en",
            voice_clone_prompt=prompt,
            generation_config=cfg,
            seed=1000 + i + SEED_OFFSET,
        )[0]
        print(f"[{i + 1}/{len(spec['sentences'])}] {save(path, wav, sr):.2f}s  {text}", flush=True)


if __name__ == "__main__":
    main()
