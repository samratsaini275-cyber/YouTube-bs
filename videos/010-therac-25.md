# A software bug gave patients 100× the radiation dose

**File:** `010-therac-25.mp4` · 1080x1920 · 55.6 s

## Description

The Therac-25 radiation therapy machine was involved in at least six overdoses between 1985 and 1987. Race conditions in its software, and the removal of hardware interlocks, let it deliver around 100 times the intended dose.

Narration: synthetic voice. Visuals: original animated diagrams, schematic and not to scale.

#softwarebugs #therac25 #engineeringfailure #programming #medicaldevices #shorts


## Sources (internal fact-check record, not part of the upload)

- Wikipedia, "Therac-25" — https://en.wikipedia.org/wiki/Therac-25 (retrieved November 2026)
- N. Leveson & C. Turner, "An Investigation of the Therac-25 Accidents", IEEE Computer 26(7), 1993 — the investigation cited there

## Script

This machine was built to treat patients with radiation. A software bug made it deliver around 100 times the intended dose.

The Therac-25, built by Atomic Energy of Canada Limited, was involved in at least six overdoses between 1985 and 1987.

Earlier models had hardware interlocks to block unsafe settings. The Therac-25 removed them, and relied on software checks instead.

If an operator chose X-ray mode, then switched to electron mode within eight seconds, the machine could fire its high-current beam without the X-ray target in place.

The screen showed only a short message: Malfunction 54.

A second bug: a safety flag was set by adding one to it. Occasionally the number overflowed back to zero, and the safety check was skipped.

The software was developed by one person, and reused code from older machines. It has been called the worst series of radiation accidents in the 35 year history of medical accelerators.
