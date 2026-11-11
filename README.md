# Failure Point

Faceless vertical shorts (1080x1920, 9:16) that explain one engineering failure each in under a minute:
what was built, the specific decision that broke it, and what it cost.

- `videos/` – finished episodes (`.mp4`) with upload metadata (`.md`: title, description, sources, hashtags, script)
- `episodes/` – one file per episode: narration plus the code that draws each scene
- `pipeline/` – the build system
- `assets/voice_ref.wav` – the channel's narrator voice (reference clip used for cloning)

## How an episode is made

1. **Research.** Every figure in the narration and on screen is checked against the sources listed in the
   episode file and repeated in the video's `.md`. Anything that could not be confirmed is left out.
2. **Narration.** `pipeline/tts.py` synthesizes each sentence with the OmniVoice engine from
   [VoiceStudio](https://github.com/debpalash/voicestudio). The narrator voice was designed once
   (`male, middle-aged, low pitch, american accent`) and is voice-cloned from `assets/voice_ref.wav` afterwards
   so every episode has the same narrator.
3. **Check.** `pipeline/align.py` transcribes the clips back with faster-whisper. This catches garbled
   speech and gives real word timings for the captions.
4. **Picture.** `pipeline/stage.html` draws each frame (animated SVG diagrams, word-highlighted captions) in
   headless Chromium; `pipeline/build.mjs` screenshots 30 frames per second and muxes them with the audio.
   All visuals are original schematic drawings — no stock footage or third-party images.

## Build

```bash
git clone https://github.com/debpalash/voicestudio /path/to/voicestudio
uv venv tts --python 3.12 && source tts/bin/activate
uv pip install torch torchaudio --index-url https://download.pytorch.org/whl/cpu
uv pip install "transformers>=5.10" accelerate soundfile pydub faster-whisper

export TTS_PYTHON=$PWD/tts/bin/python VOICESTUDIO_DIR=/path/to/voicestudio
node pipeline/build.mjs 001-tacoma-narrows            # full video
node pipeline/build.mjs 001-tacoma-narrows --stills   # review frames only
node pipeline/build.mjs 001-tacoma-narrows --audio    # narration only
```

Requires Node 22 with Playwright + Chromium, and ffmpeg. On a 4-core CPU with no GPU, narration takes
roughly 7 minutes per episode and rendering about 2.

## Writing an episode

Copy an existing file in `episodes/`. Each scene has `say` (narration; `{1940|nineteen forty}` shows
"1940" in captions and speaks "nineteen forty") and `draw(h, p, t)`, which returns SVG for a 1000x900
canvas using the helpers in `pipeline/lib.js` (`t` = seconds into the scene).

## Notes

- Narration is a synthetic voice; YouTube's upload form asks about altered or synthetic content, and the
  description of each video states it.
- Diagrams are schematic and not to scale unless a dimension is labelled.
