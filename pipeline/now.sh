#!/bin/sh
# Record what the agent is doing right now, for the Control Room dashboard.
# Usage: pipeline/now.sh "Writing episode 027" "3/7: drafting scenes"
cd "$(dirname "$0")/.." && python3 - "$@" <<'PY'
import json, sys
from datetime import datetime, timezone
task = sys.argv[1] if len(sys.argv) > 1 else ""
step = sys.argv[2] if len(sys.argv) > 2 else ""
json.dump({"task": task, "step": step, "at": datetime.now(timezone.utc).isoformat(timespec="seconds")},
          open("channel/now.json", "w"), indent=1)
PY
