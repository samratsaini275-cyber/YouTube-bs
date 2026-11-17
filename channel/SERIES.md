# Series plan

The channel stays in one niche — engineering explained in under a minute — and changes its **narrative**
every 20 episodes. A narrative always runs for exactly 20 episodes before the next one starts.

| Episodes | Narrative | What each video is |
|---|---|---|
| 001–020 | **Case Files** | One real engineering failure: what was built, the decision that broke it, what it cost. |
| 021–031 | **Why Is It Built Like That?** | One everyday object or machine with a design that looks odd until you see the reason (for example: why train wheels are cone-shaped, why manhole covers are round). |
| 032–051 | **Engineering Nonsense** | Silly, absurd shorts built to be funny first: deadpan narration of ridiculous "engineering" (a bridge for one ant, a toaster with a safety briefing, a door that needs a 40-step manual), fast cuts and a punchline. |
| 052–071 | **Bad Ideas, Built Anyway** | More silly, funny-first nonsense engineering, with a hard hook rule: the joke lands in the first two seconds. |
| 072–091 | to be chosen | Picked from the view numbers when episode 071 is being written; production does not wait for approval. |

## Rules for every narrative

- 20 episodes, numbered continuously. Do not switch early (unless the channel owner asks) and do not run long.
- Every fact is checked against a source before the script is written. A lighter tone never means a looser fact.
- Narration from 019 on uses voice v3 (livelier: younger, a little higher and faster) and is written to be
  spoken with energy: short sentences, a question early, one idea per line. 014–018 use voice v2.
- Episodes 014 onward use the 3D style and end with a multiple-choice question
  ("comment A, B or C"). Episodes 001–013 keep the 2D style.
- "Engineering Nonsense" (changed from "Expensive Mistakes" at the channel owner's request, to fight early
  swipe-aways): the comedy comes from obviously made-up, absurd situations told in a serious documentary voice.
  Made-up things must be plainly impossible or labelled as a joke, never passed off as real events, people or
  numbers. Any real fact dropped in is still checked against a source. Real accidents, deaths and injuries are
  never the joke.
- Nonsense episodes stay short (about 20–40 s), start on the most absurd image, and still end with an A/B/C
  question (it can be a silly one).

- From 026 on (channel owner's request): no headline text at the top of the screen; hooks use a bit of fear to
  intrigue but stay true; descriptions tease the story instead of explaining it, and never invent facts or tolls.
- The pause after 030 ended on 16 Nov 2026: the channel owner asked to keep making and posting videos, and to switch
  to the funny narrative now. Engineering Nonsense therefore starts at 032 instead of 041.

- "Bad Ideas, Built Anyway" (052–071, channel owner's request on 17 Nov 2026: "keep making stupid funny content but
  make the hook in the first two seconds"): the first spoken line is six words or fewer and must finish within 2.0 s
  (checked in the narration read-back); the on-screen hook text says the same thing; the first frame already shows the
  absurd thing in motion (no slow establishing shot); 15–30 s total. The other Engineering Nonsense rules still apply.

- Engagement rules from 058 on (content audit, 17 Nov 2026; these are judgment calls from reading the scripts and
  timing the narration, not viewer data): the comment question is one spoken line of about 4 s or less (it was taking
  about half of each 052–057 video); every episode has at least four joke beats before the question, including one
  escalation and one twist or punchline; openers and titles vary (not every one "This X is Y" / "Engineers built...");
  a recurring made-up character (Gary the ant, Kevin the blade of grass, Steve the snail) can return now and then.

## Never stop, keep trying new angles (channel owner, 17 Nov 2026)

"Don't stop making content tho and coming up with new narratives or angles to take." So:

- Production does not pause: not for a full queue and not at the end of a narrative. Posting still follows the
  posting rule below, so finished videos wait their turn.
- Inside a narrative, rotate the angle from episode to episode so the view numbers can compare them:
  A. object gag ("This car runs on pizza");
  B. recurring character saga (Gary the ant, Kevin the blade of grass, Steve the snail);
  C. second person ("You bought a door. It came with a manual.");
  D. fake advert or product launch for the bad idea;
  E. "worst three" countdown of made-up inventions;
  F. a real, sourced odd engineering fact told in the same funny voice (the fact is true and checked).
  Note the angle letter in a comment at the top of each episode file.
- When a narrative ends (every 20 episodes), pick the next one without waiting: name it, write it into the table
  above, start it, and tell the channel owner what was picked and why. Base the pick on `channel/stats.json`
  (which angles and episodes got the most views and likes four hours after posting); if the numbers do not
  separate them, try something new rather than repeat.

## What the numbers say (first look, 17 Nov 2026)

Source: public view and like counts read from each video page by `pipeline/stats.py` (history in
`channel/stats.json`). The upload login cannot read analytics, so retention and impressions are unknown.

- 52 public videos had about 2,400 views in total. Four of them had about 95% of those views:
  032 ant bridge (692), 051 Gary's tunnel (601), 031 nitrogen tires (528), 050 top-shelf ladder (472).
- Those four were the first two uploads of 16 Nov (UTC) and the first two of 17 Nov (UTC). The 17 funny videos
  posted between them, 10–20 minutes apart (033–049), had 0–3 views each, although they are the same style.
- The 22 videos uploaded within one minute on 12 Nov had 0–11 views each; the earlier duplicate batch that day had
  a few with 18–104 and the rest near zero.
- Reading (an inference from this pattern, not something YouTube states): only the first few uploads in a burst or
  day get shown to viewers; the rest are barely shown at all. Posting volume, not the content, explains most of the
  difference so far. With only four videos shown, the data cannot yet say which jokes or formats work best. The one
  content hint: the two Gary episodes are the top two.

Posting rule from 17 Nov 2026: at most two uploads per UTC day, at least six hours apart, the first soon after
00:00 UTC. Run `python3 pipeline/stats.py` before each upload and compare each new video's views about four hours
after posting; revisit this rule after three days of data.

## How the next narrative is chosen

The order above is a judgment call, not a measurement: no view, retention or comment data exists for this
channel yet. Once videos are published, the choice for episodes 052+ should follow the numbers — which
narrative held viewers longest and drew the most comments — rather than this table.

## Status

- Case Files: complete — 001–020 written (001–013 in 2D, 014–020 in 3D).
- Why Is It Built Like That?: 021 (manhole covers), 022 (railway ballast), 023 (golf ball dimples), 024 (bridge expansion joints), 025 (stop signs), 026 (window breather hole), 027 (rounded window corners), 028 (Taipei 101 damper), 029 (rumble strips), 030 (elevator brakes), 031 (nitrogen tires) written. Ended at 031.
- Engineering Nonsense: complete — 032–051 written and posted (16–17 Nov 2026).
- Bad Ideas, Built Anyway: starts at 052.
