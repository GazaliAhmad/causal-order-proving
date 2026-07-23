# Test log

Chronological record of executed causal-order stack tests. This repository uses
a test log rather than a software changelog.

## 2026-07-23 — SMOKE-01

| Field | Result |
| --- | --- |
| Test | Clean eight-node smoke test |
| Duration | 10 minutes wall-clock |
| Profile | `typical-real-world-mesh` |
| Faults | None |
| Status | `completed` |
| Verdict | `pass` |
| Generated | 9,926 |
| Duplicates injected/dropped | 9 / 9 |
| Transport received | 9,935 |
| Ordered | 9,926 |
| Anomalies | 0 |
| Final pending work | 0 |

All standardized accounting, final-state, shutdown, and verdict checks passed.

Harness command:

```bash
causal-order-testing-adapter-runtime --adapter @causal-order/transport/testing --monitor --duration 10m --steady-for 10m --time-scale 1 --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h --profile typical-real-world-mesh --run-name smoke-clean-8n-10m
```

- [Standard report](artifacts/runs/2026-07-23T11-51-30Z-smoke-clean-8n-10m/standard-result.md)
- [Raw harness summary](artifacts/runs/2026-07-23T11-51-30Z-smoke-clean-8n-10m/summary.json)

## Entry requirements

Every future entry should record:

- test ID and run name;
- date, duration, node count, profile, and injected faults;
- the exact published harness command;
- package versions or a link to the standardized result;
- status, verdict, and verdict reasons;
- core accounting totals and invariant failures;
- final pending work and shutdown outcome; and
- links to the standard report and raw summary.
