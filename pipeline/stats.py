#!/usr/bin/env python3
"""Read the public view / like counts of every posted video and keep a history.

The upload login can only upload (scope youtube.upload), so this reads the numbers
anyone can see on each video's public page. It needs no keys. Retention and
impressions are not public; those are only in YouTube Studio.

  python3 pipeline/stats.py            # refresh channel/stats.json and print a table
"""
import datetime, json, re, subprocess, time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"


def fetch(vid):
    for _ in range(3):
        h = subprocess.run(["curl", "-sS", "-m", "40", "-L", "-A", UA, "-H", "Accept-Language: en-US",
                            "https://www.youtube.com/watch?v=" + vid], capture_output=True, text=True).stdout
        m = re.search(r'"viewCount":"(\d+)"', h)
        if m:
            likes = re.search(r"like this video along with ([\d,]+) other", h)
            return int(m.group(1)), int(likes.group(1).replace(",", "")) if likes else None
        time.sleep(3)
    return None, None


def main():
    posted = json.loads((ROOT / "channel" / "posted.json").read_text()).get("youtube", {})
    path = ROOT / "channel" / "stats.json"
    stats = json.loads(path.read_text()) if path.exists() else {"videos": {}}
    now = datetime.datetime.now(datetime.timezone.utc)
    ok = failed = 0
    for name in sorted(posted):
        rec = posted[name]
        if not isinstance(rec, dict) or not rec.get("id") or rec.get("privacy") != "public":
            continue
        views, likes = fetch(rec["id"])
        if views is None:
            failed += 1
            continue
        ok += 1
        v = stats["videos"].setdefault(name, {"posted": rec.get("at"), "history": []})
        v["views"], v["likes"] = views, likes
        v["history"].append([now.isoformat(timespec="minutes"), views])
        v["history"] = v["history"][-40:]
        time.sleep(1)
    print(f"read {ok} videos, {failed} could not be read (YouTube may be showing a bot check)")
    if ok == 0:
        print("no counts read; stats.json left unchanged")
        return
    stats["checked"] = now.isoformat(timespec="minutes")
    stats["last_run"] = {"read": ok, "failed": failed}
    path.write_text(json.dumps(stats, indent=1) + "\n")
    rows = sorted(stats["videos"].items(), key=lambda kv: -(kv[1].get("views") or 0))
    print(f"{len(rows)} videos, {sum(v.get('views') or 0 for _, v in rows)} views in total (checked {stats['checked']})")
    for name, v in rows[:15]:
        age = (now - datetime.datetime.fromisoformat(v["posted"])).total_seconds() / 3600 if v.get("posted") else 0
        print(f"  {name[:30]:30} {v['views']:6d} views  {v.get('likes') or 0:4d} likes  posted {age:6.1f} h ago")


if __name__ == "__main__":
    main()
