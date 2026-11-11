"""Upload the next unposted episode to YouTube as a Short, using the official YouTube Data API.

Run by .github/workflows/publish.yml. Needs three secrets in the environment — never commit them:
  YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN
Optional: YT_PRIVACY (private | unlisted | public, default private), YT_COUNT (how many to post, default 1).

  python3 pipeline/publish_youtube.py           post the next episode now
  python3 pipeline/publish_youtube.py --daily   post only if nothing was posted in the last 20 hours
                                                (used by the hourly check-in, so it posts once a day)

What has been posted is recorded in channel/posted.json so nothing is uploaded twice.
"""

import json
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTED = ROOT / "channel" / "posted.json"


def call(url, data=None, headers=None, method=None):
    req = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    with urllib.request.urlopen(req) as r:
        return r.status, dict(r.headers), r.read()


def access_token():
    body = urllib.parse.urlencode({
        "client_id": os.environ["YT_CLIENT_ID"], "client_secret": os.environ["YT_CLIENT_SECRET"],
        "refresh_token": os.environ["YT_REFRESH_TOKEN"], "grant_type": "refresh_token",
    }).encode()
    _, _, raw = call("https://oauth2.googleapis.com/token", body)
    return json.loads(raw)["access_token"]


def metadata(md_path):
    text = md_path.read_text()
    title = text.splitlines()[0].lstrip("# ").strip()
    m = re.search(r"## Description\n(.*?)(?=\n## |\Z)", text, re.S)
    desc = (m.group(1) if m else "").strip()
    tags = re.findall(r"#(\w+)", desc)
    if "#shorts" not in desc.lower():
        desc += "\n\n#Shorts"
    return title[:100], desc[:4900], tags[:15]


def upload(token, video, title, desc, tags, privacy):
    meta = json.dumps({
        "snippet": {"title": title, "description": desc, "tags": tags, "categoryId": "27"},   # 27 = Education
        "status": {"privacyStatus": privacy, "selfDeclaredMadeForKids": False, "containsSyntheticMedia": False},
    }).encode()
    size = video.stat().st_size
    _, headers, _ = call(
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", meta,
        {"Authorization": f"Bearer {token}", "Content-Type": "application/json; charset=UTF-8",
         "X-Upload-Content-Type": "video/mp4", "X-Upload-Content-Length": str(size)})
    location = headers.get("Location") or headers.get("location")
    _, _, raw = call(location, video.read_bytes(), {"Content-Type": "video/mp4", "Content-Length": str(size)}, "PUT")
    return json.loads(raw)["id"]


def main():
    missing = [k for k in ("YT_CLIENT_ID", "YT_CLIENT_SECRET", "YT_REFRESH_TOKEN") if not os.environ.get(k)]
    if missing:
        sys.exit("Missing environment variables: " + ", ".join(missing))
    posted = json.loads(POSTED.read_text()) if POSTED.exists() else {}
    done = posted.setdefault("youtube", {})
    if "--daily" in sys.argv:
        times = [datetime.fromisoformat(v["at"]) for v in done.values() if "at" in v]
        if times and datetime.now(timezone.utc) - max(times) < timedelta(hours=20):
            print(f"Already posted at {max(times):%Y-%m-%d %H:%M} UTC; next post is due 20 hours after that.")
            return
    privacy = os.environ.get("YT_PRIVACY", "private")
    todo = [v for v in sorted((ROOT / "videos").glob("*.mp4")) if v.stem not in done][: int(os.environ.get("YT_COUNT", "1"))]
    if not todo:
        print("Nothing left to post.")
        return
    token = access_token()
    for video in todo:
        title, desc, tags = metadata(video.with_suffix(".md"))
        vid = upload(token, video, title, desc, tags, privacy)
        done[video.stem] = {"id": vid, "privacy": privacy, "at": datetime.now(timezone.utc).isoformat(timespec="seconds")}
        POSTED.write_text(json.dumps(posted, indent=1) + "\n")
        print(f"Posted {video.stem} -> https://youtube.com/shorts/{vid} ({privacy})")


if __name__ == "__main__":
    try:
        main()
    except urllib.error.HTTPError as e:
        sys.exit(f"YouTube API error {e.code}: {e.read().decode()[:600]}")
