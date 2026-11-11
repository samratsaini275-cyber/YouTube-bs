# A number too big for 16 bits destroyed this rocket

**File:** `004-ariane-5.mp4` · 1080x1920 · 51.8 s

## Description

The first Ariane 5 was lost 37 seconds into flight on June 4, 1996. A 64-bit floating point value was converted to a 16-bit signed integer and overflowed, in code reused from Ariane 4.

Narration: synthetic voice. Visuals: original animated diagrams, schematic and not to scale.

#space #ariane5 #softwarebugs #engineeringfailure #programming #shorts

## Sources (internal fact-check record, not part of the upload)

- Wikipedia, "Ariane flight V88" — https://en.wikipedia.org/wiki/Ariane_flight_V88 (retrieved November 2026)
- J. L. Lions et al., "Ariane 5 Flight 501 Failure: Report by the Inquiry Board" (Paris, July 19, 1996) — the inquiry cited there

## Script

This rocket lasted 37 seconds. What destroyed it was a single number, too big to fit.

June 4th, 1996. The first Ariane 5 lifts off, carrying four Cluster research satellites.

Part of its guidance software was reused from the older Ariane 4. But Ariane 5 flew a different path, with much higher horizontal velocity early in the flight.

A value called horizontal bias was converted from a 64-bit floating point number into a 16-bit signed integer. The largest value that fits is 32,767. It overflowed.

The error shut down the inertial reference system. The backup ran the same software, so it failed the same way.

And the code that failed served no purpose after liftoff on Ariane 5.

The rocket veered off course and was destroyed. The loss: more than $370 million.
