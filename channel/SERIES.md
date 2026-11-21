# Series plan

The channel stays in one niche — engineering explained in under a minute — and changes its **narrative**
every 20 episodes. A narrative always runs for exactly 20 episodes before the next one starts.

| Episodes | Narrative | What each video is |
|---|---|---|
| 001–020 | **Case Files** | One real engineering failure: what was built, the decision that broke it, what it cost. |
| 021–031 | **Why Is It Built Like That?** | One everyday object or machine with a design that looks odd until you see the reason (for example: why train wheels are cone-shaped, why manhole covers are round). |
| 032–051 | **Engineering Nonsense** | Silly, absurd shorts built to be funny first: deadpan narration of ridiculous "engineering" (a bridge for one ant, a toaster with a safety briefing, a door that needs a 40-step manual), fast cuts and a punchline. |
| 052–062 | **Bad Ideas, Built Anyway** | More silly, funny-first nonsense engineering, with a hard hook rule: the joke lands in the first two seconds. Ended at 062 when the owner picked the next narrative. |
| 063–082 | **What Would Happen If…** | One absurd "what would happen if" premise (a house made of ice, a cat the size of a building), then a fast, funny chain of consequences shown step by step. |
| 083–102 | **Gary's Big World** | Gary the ant (yellow hard hat, recurring since 032) tries one ordinary human-sized thing per episode (the beach, a birthday cake, bowling, a lift) and it goes hilariously wrong at ant scale. |
| 103–122 | **Animals at Work** | One made-up animal (a snail, a pigeon, a goldfish, a sloth) takes one human job (pilot, barber, lifeguard, delivery driver) and it goes wrong in a way only that animal could manage. |
| 123–142 | **Objects With Opinions** | One everyday object (a fridge, a toaster, a sock, a shopping trolley) gets a voice and complains about its life in a fast run of jokes, with a twist at the end. |
| 143–144 | **Bolt Takes It Literally** | Bolt, a small made-up robot, carries out one saying word for word. Ended at 144 at the owner's request (20 Nov: "keep checking what videos r doing good and base the next ones off those"). |
| 145–164 | **What Would Happen If… (season 2)** | Same format as 063–082, the only narrative with repeated hits (see "Numbers, 20 Nov" below). |
| 165–184 | to be chosen | Picked from the view numbers; production does not wait for approval. |

## Numbers, 20 Nov 2026 ~20:10 UTC (public Shorts tab, read through Firecrawl's youtube-com provider)

Full list: `channel/views-2026-11-20.json`. Counts are as displayed ("1K" = 1,000–1,099).

- Timing: all 16 videos with 280+ views were posted between 19:00 and 03:00 UTC. None of the ~30 posted outside
  that window has more than 26. Gary's Big World 083–096 were all posted 04:59–18:59 UTC and have 0–1 views each,
  so these numbers cannot say whether Gary works; they only say the window matters. 097–102 post inside the
  window tonight and will test Gary fairly.
- Format: inside the window, "What would happen if…" (063–069, 074–081) got 280+ views on 10 of 15 videos
  (067 dogs drive, 068 talking fridge, 069 fast snail, 074 homework, 075 walking trees, 076 human tails,
  079 cats text, 080 everyone flies, 081 pet dinosaur 1.3K). Bursts posted minutes apart (033–049, 053–057) mostly
  flopped even inside the window.
- Update 21 Nov 02:29 UTC (`channel/views-2026-11-21.json`): of the in-window Gary posts, 101 (posted 00:19 UTC)
  has 243 views after ~2 hours, 102 (01:24) has 12 after 1 hour, and 097–100 (posted 20:03–23:16) have 0–1. So Gary
  can get shown; the posting slot seems to matter more than the character. The strongest slot so far is
  00:00–03:00 UTC: 050, 051, 052, 067, 068, 069, 079, 080, 081 and now 101 all went up there (053 is the one miss,
  posted 9 minutes after 052). Of the 19:00–00:00 posts only 031–033 and 074–076 broke out.
- Update 21 Nov 08:54 UTC (`channel/views-2026-11-21-0854.json`): 102 Gary superhero (posted 01:24) 814,
  101 Gary yoga (00:19) 485, 103 snail pilot, the first Animals at Work episode (02:29), 296. Everything posted
  03:33–07:49 (104–108) has 0–1. So every format tested in the 00:00–03:00 UTC slot (What would happen if, Gary,
  Animals at Work) gets hundreds of views, and posts outside it get almost none, even days later (070–073 still
  have 3–16). The slot matters more than the format.
- So narrative 10 returns to "What would happen if…" (owner asked to base new videos on what does well).
  Animals at Work, Objects With Opinions and Bolt are not public yet; judge them only on in-window posts.
- How to re-check: Firecrawl `alexandria_library_read` with provider youtube-com, capability videos/channel_shorts,
  channel UCujyDKnNLFxLJS8qcXVuBMQ (sort latest or popular). stats.py is still blocked by YouTube's bot check.

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

- "What Would Happen If…" (063–082, channel owner's request on 17 Nov 2026: "the next narrative I want to take is
  the 'what would happen if' narrative ... show how it would happen but still being funny and engaging with a quick
  hook, also pitch up the voice just a bit"): the first line is the premise as a question
  ("What if houses were made of ice?"), six words or fewer and done within 2.0 s; then three or four consequence beats
  that escalate, each shown on screen; a twist or punchline; a question of about 4 s; 15–30 s total. Premises are
  Failure Point's own, picked for being funny and visual (the owner rejected the square-wheel car on 17 Nov as not
  funny or engaging: avoid dry physics premises; go for big, silly, relatable chaos). Any real fact is sourced in
  `sources`; everything
  else is labelled as a made-up comedy sketch. Voice: `pitch: 1.5` (semitones) in each episode file, which raises
  the voice slightly without changing its timing (pipeline/build.mjs).

- Narration lesson (17 Nov): in the comment question, "..., or rude" was misheard twice ("router", "root"), and
  "Straight A pluses" once; avoid "or" before a short word starting with r, and spell-out-able grades. Update 18 Nov: "pop, or kazoo" and
  "rock, or kazoo" also merged ("Popper", "rocker"); a vowel straight after "or" ("or annoying", "or a nap",
  "or opera") has read back cleanly, so prefer that for the last option. Check the
  read-back on every build. Update 20 Nov: a vowel after "or" is not enough on its own. "scary, or already" read back as
  "scare are already" and "gross, or awesome" as "groves are awesome"; what fixed both was ending the list on a
  short phrase starting with "a" ("or awful", "or a bit gross").

- "Gary's Big World" (083–102, chosen 17 Nov 2026 18:55 UTC from channel/stats.json): of 61 public videos, five
  had ~670–920 views (052 Pizza Car 921, 051 Gary's Tunnel 894, 032 Ant Bridge 856, 050 Top Shelf Ladder 847,
  031 Nitrogen Tires 669) and nearly all the rest had under 20. Two of the top four star Gary the ant, the only
  pattern visible. This is a small, noisy sample (it may reflect which uploads YouTube happened to test), so the
  choice is a bet, not a proven result; re-check after ~10 Gary episodes are public. Format: first line names
  Gary and the premise ("Gary the ant went bowling."), six words or fewer, done within 2.0 s; Gary visible in the
  first frame, small but readable, with the human-sized object; three or four escalating ant-scale jokes and a
  twist; one short comment question; 15–25 s; pitch 1.5. Gary is made up; real ant facts only when sourced.

- "Animals at Work" (103–122, chosen 18 Nov 2026 ~06:50 UTC from channel/stats.json, checked 06:33 UTC): the five
  breakouts (031, 032, 050, 051, 052; 683–924 views each) were all posted inside one ~7-hour window
  (16 Nov 19:19 to 17 Nov 02:40 UTC); every one of the 15 videos posted since (053–067) has 0–9 views, including
  059, a Gary episode, with 3. So the numbers do not show that Gary himself draws viewers; the timing pattern
  suggests a distribution event, but that cannot be confirmed from view counts alone. Gary's Big World episodes
  are not public yet (they post after 082). Animals at Work keeps the one format element that two of the five
  hits shared (a small animal doing a big human-sized task) but rotates the cast, so the next 20 episodes test
  the format rather than one character. Format: first line names the animal and the job ("This snail became a
  pilot."), done within 2.0 s; the animal visible in the first frame with its job prop; three or four escalating
  jokes that come from that animal's nature (slow, forgetful, can't hold things); one short comment question
  with a vowel after "or"; 15–25 s; pitch 1.5. All animals and jobs are made up; real animal facts only when sourced.

- "Objects With Opinions" (123–142, chosen 19 Nov 2026 ~22:00 UTC): this is a judgment call, not a data result.
  The 20:22 UTC stats run returned the same pattern as before (five breakouts posted within one window, 0–9 views
  on 053–067) and no readable counts for 068 onwards, and none of narrative 6 (Gary) or 7 (Animals at Work) is
  public yet (074–076 posted so far). With no signal to follow, narrative 8 tests a different format: the object
  itself is the narrator's subject ("This fridge has opinions."), so the hook is a talking thing rather than an
  animal or Gary. Format: first line names the object and that it has a complaint, within 2.0 s; the object
  visible with a face in the first frame; three or four escalating complaints and a twist; one short comment
  question with a vowel after "or"; 15–25 s; pitch 1.5. Re-check the numbers once Gary and Animals at Work
  episodes have been public for a day.

- "Bolt Takes It Literally" (143–162, chosen 20 Nov 2026 ~18:00 UTC): a judgment call, not a data result. A
  stats.py run at about 17:58 UTC timed out without reading any video (YouTube serves this environment a bot
  check), so the newest real counts are still those from 18 Nov, and they do not separate formats. Following the
  rule "if the numbers do not separate them, try something new", narrative 9 changes the joke engine: instead of a
  creature or object complaining, the comedy is wordplay made visible, with sayings taken literally. It keeps one
  recurring character (Bolt) so viewers can recognise the series, the element the early Gary hits shared. Format:
  the first line is the instruction to Bolt ("Bolt, break the ice."), done within 2.0 s; Bolt and the object
  visible in the first frame; three or four escalating literal readings and a twist; one short comment question
  with a vowel after "or"; 15–25 s; pitch 1.5. Bolt is made up; no person or animal is hurt (a "leg" that
  breaks is a table leg). Re-check the numbers whenever stats.py can read the channel again.

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

Update 04:28 UTC 17 Nov: 052 (posted 2.3 hours after 051, the first of its burst) reached 102 views in 1.8 hours,
while 053–057 (posted 9–50 minutes behind it) stayed at 1–3. So the gap before an upload seems to matter, not only
the calendar day, and a gap of a few hours may be enough. Test: post 058 about three hours after 057 and compare.

Update 12:45 UTC 17 Nov: the public counts did not move at all between 04:28 and 12:39 UTC (052 stayed at 102,
051 at 650), so YouTube's public counter may be lagging; treat short-term numbers with caution. Test started:
058 was posted at about 12:44 UTC, 9 hours after the previous upload, on a day that already had eight uploads.
If it gets views like 052 did, the gap matters more than the calendar day.

Posting rule from 17 Nov 2026, revised 16:22 UTC at the channel owner's request ("Post one video every hour"): post
one video at a time, only when the last upload was at least ONE hour ago (up to 24 a day; if YouTube reports
uploadLimitExceeded, wait and retry the next hour). Previous version (14:35 UTC): at least three hours apart. Previous version
(12:45 UTC): at least six hours apart. This replaces the earlier two-per-UTC-day cap while the gap test runs.
Original rule, kept for the record: at most two uploads per UTC day, at least six hours apart, the first soon after
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
- Bad Ideas, Built Anyway: 052–062 written. Ended at 062 (owner chose the next narrative).
- What Would Happen If…: 063–082 written (17 Nov 2026).
- Gary's Big World: 083–102 written (18 Nov 2026).
- Animals at Work: 103–122 written (18–19 Nov 2026).
- Objects With Opinions: 123–142 written (19–20 Nov 2026).
- Bolt Takes It Literally: 143–144 written; ended early at the owner's request to follow the numbers.
- What Would Happen If… (season 2): starts at 145.
