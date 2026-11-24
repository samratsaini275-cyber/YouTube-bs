#!/usr/bin/env python3
"""List episode titles that repeat an earlier premise (case/punctuation-insensitive). Exit 1 if any."""
import re, glob, collections, sys
d = collections.defaultdict(list)
for f in sorted(glob.glob('episodes/*.js')):
    m = re.search(r"^  title: '(.*)',", open(f).read(), re.M)
    if not m:
        continue
    t = re.sub(r"[?.!]|\(.*?\)", "", m.group(1).lower()).replace("what would happen if ", "").strip()
    t = re.sub(r"\b(huge|enormous|massive|big)\b", "giant", t)
    d[t].append(f.split('/')[1].split('-')[0])
bad = {t: v for t, v in d.items() if len(v) > 1}
for t, v in bad.items():
    print(' '.join(v), '|', t)
sys.exit(1 if bad else 0)
