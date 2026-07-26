## T04: dedupe-outage

**Verdict**: `PASS_WITH_EXPECTED_DEGRADATION` ✅

| Metric | Value |
|--------|-------|
| **Events generated** | 564,210 |
| **Anomalies** | 843 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The dedupe-outage scenario tested recovery behavior. All 843 transient reorderings were detected and resolved without data loss or ordering violations, confirming fault tolerance.

**Command**: `npm run t04`  
**Documentation**: [docs/test-04-dedupe-outage.md](docs/test-04-dedupe-outage.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-25T15-04-17Z-t04-dedupe-outage-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-25T15-04-17Z-t04-dedupe-outage-8n-8h/standard-result.json)

---

## T03: transport-outage

**Verdict**: `PASS` ✅

| Metric | Value |
|--------|-------|
| **Events generated** | 564,232 |
| **Anomalies** | 733 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The transport-outage scenario tested recovery behavior. All 733 transient reorderings were detected and resolved without data loss or ordering violations, confirming fault tolerance.

**Command**: `npm run t03`  
**Documentation**: [docs/test-03-transport-outage.md](docs/test-03-transport-outage.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-25T03-45-15Z-t03-transport-outage-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-25T03-45-15Z-t03-transport-outage-8n-8h/standard-result.json)

---

## T02: jitter-dark

**Verdict**: `PASS` ✅

| Metric | Value |
|--------|-------|
| **Events generated** | 562,664 |
| **Anomalies** | 790 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The jitter-dark scenario tested recovery behavior. All 790 transient reorderings were detected and resolved without data loss or ordering violations, confirming fault tolerance.

**Command**: `npm run t02`  
**Documentation**: [docs/test-02-jitter-dark.md](docs/test-02-jitter-dark.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-24T17-07-12Z-t02-jitter-dark-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-24T17-07-12Z-t02-jitter-dark-8n-8h/standard-result.json)

---

# Test log

Chronological record of executed causal-order stack tests. This repository uses a test log rather than a software changelog.

## 2026-07-24 — T02

| Field | Result |
| --- | --- |
| Test | Eight-node jitter and dark-window recovery |
| Duration | 8 hours wall-clock |
| Profile | `typical-real-world-mesh` |
| Faults | jitter on edge-a; dark window on edge-b (start: 10m) |
| Status | `completed` |
| Harness verdict | `pass` |
| Generated | 562,664 |
| Duplicates injected/dropped | 1,762 / 1,762 |
| Transport received | 564,426 |
| Ordered | 562,664 |
| Anomalies | 790 warning-level |
| Duplicate leakage | 0 |
| Peak node queue | 253 (edge-b) |
| Peak RSS | 533.8 MB |
| Final pending work | 0 |

The published harness passed the run. All eight nodes remained represented, the workload completed 8 hours at `timeScale=1` under combined jitter and dark-window faults, every generated unique event was ordered despite transient failures, every injected duplicate was dropped, monitor routing remained normal, and the callback, ordering, lifecycle, monitor, and resource shutdown barriers completed with no pending work.

The 790 anomalies are warning-level diagnostics across nodes, consistent with fault recovery behavior. The published jitter+dark-window scenario verdict does not classify these warnings as contract failures. The absence of corrections (0) confirms all anomalies resolved within the ordering pipeline and did not require corrections. Peak queue depth on edge-b (253) reflects buffering during the dark window and recovery. The run establishes the fault-handling baseline for comparison with later scenarios.

Harness command:

```bash
causal-order-testing-adapter-runtime --adapter @causal-order/transport/testing --monitor --duration 8h --time-scale 1 --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h --profile typical-real-world-mesh --jitter-nodes edge-a --dark-nodes edge-b --dark-start-after 10m --run-name T02-jitter-dark-8n-8h
```

- [Documentation](docs/test-02-jitter-dark.md)
- [Standard report](artifacts/runs/2026-07-24T17-07-12Z-t02-jitter-dark-8n-8h/standard-result.md)
- [Raw harness summary](artifacts/runs/2026-07-24T17-07-12Z-t02-jitter-dark-8n-8h/summary.json)
- [Anomaly evidence](artifacts/runs/2026-07-24T17-07-12Z-t02-jitter-dark-8n-8h/anomalies.ndjson)

## 2026-07-23 — SMOKE-04

| Field | Result |
| --- | --- |
| Test | npm 12 requalification smoke test |
| Runtime | Node `24.15.0`, npm `12.0.1` |
| Install | Clean `npm ci` from the existing lockfile |
| Duration | 10 minutes wall-clock |
| Profile | `typical-real-world-mesh` |
| Faults | None |
| Status | `completed` |
| Verdict | `pass` |
| Generated | 9,985 |
| Duplicates injected/dropped | 3 / 3 |
| Transport received | 9,988 |
| Ordered | 9,985 |
| Anomalies | 0 |
| Duplicate leakage | 0 |
| Peak node queue | 7 |
| Peak RSS | 112.6 MB |
| Final pending work | 0 |

npm 12.0.1 requalification passed after a clean locked install. All standardized accounting, final-state, shutdown, and verdict checks passed, with normal monitor routing, zero anomalies, zero duplicate leakage, and no pending work.

Harness command:

```bash
causal-order-testing-adapter-runtime --adapter @causal-order/transport/testing --monitor --duration 10m --steady-for 10m --time-scale 1 --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h --profile typical-real-world-mesh --run-name smoke-clean-8n-10m
```

- [Standard report](artifacts/runs/2026-07-23T22-52-09Z-smoke-clean-8n-10m/standard-result.md)
- [Raw harness summary](artifacts/runs/2026-07-23T22-52-09Z-smoke-clean-8n-10m/summary.json)

## 2026-07-23 — T01

| Field | Result |
| --- | --- |
| Test | Eight-node wall-clock baseline |
| Duration | 8 hours wall-clock |
| Profile | `typical-real-world-mesh` |
| Faults | None |
| Status | `completed` |
| Harness verdict | `pass` |
| Generated | 481,138 |
| Duplicates injected/dropped | 387 / 387 |
| Transport received | 481,525 |
| Ordered | 481,138 |
| Anomalies | 13 warning-level `sequence_regression` |
| Duplicate leakage | 0 |
| Peak node queue | 16 |
| Peak RSS | 716.1 MB |
| Final pending work | 0 |

The published harness passed the run. All eight nodes remained represented, the workload completed 8 hours at `timeScale=1`, every generated unique event was ordered, every injected duplicate was dropped, monitor routing remained normal, and the callback, ordering, lifecycle, monitor, and resource shutdown barriers completed with no pending work.

The 13 anomalies are warning-level sequence-regression diagnostics across six nodes. The run used the harness defaults `strict=false` and `allowUnknownOrder=true`; the published healthy-scenario verdict does not classify these warnings as contract failures. They are retained as a baseline observation and must be compared explicitly in later runs.

Harness command:

```bash
causal-order-testing-adapter-runtime --adapter @causal-order/transport/testing --monitor --duration 8h --steady-for 8h --time-scale 1 --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h --profile typical-real-world-mesh --run-name T01-baseline-8n-8h
```

- [Standard report](artifacts/runs/2026-07-23T13-43-45Z-t01-baseline-8n-8h/standard-result.md)
- [Raw harness summary](artifacts/runs/2026-07-23T13-43-45Z-t01-baseline-8n-8h/summary.json)
- [Anomaly evidence](artifacts/runs/2026-07-23T13-43-45Z-t01-baseline-8n-8h/anomalies.ndjson)

## 2026-07-23 — SMOKE-03

| Field | Result |
| --- | --- |
| Test | Clean eight-node smoke test |
| Duration | 10 minutes wall-clock |
| Profile | `typical-real-world-mesh` |
| Faults | None |
| Status | `completed` |
| Verdict | `pass` |
| Generated | 9,992 |
| Duplicates injected/dropped | 7 / 7 |
| Transport received | 9,999 |
| Ordered | 9,992 |
| Anomalies | 0 |
| Peak node queue | 7 |
| Peak RSS | 113.8 MB |
| Final pending work | 0 |

All standardized accounting, final-state, shutdown, and verdict checks passed. Across all three smoke runs, duplicate leakage and anomalies remained zero, peak queue depth remained 7, and final pending work remained zero.

Harness command:

```bash
causal-order-testing-adapter-runtime --adapter @causal-order/transport/testing --monitor --duration 10m --steady-for 10m --time-scale 1 --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h --profile typical-real-world-mesh --run-name smoke-clean-8n-10m
```

- [Standard report](artifacts/runs/2026-07-23T13-07-59Z-smoke-clean-8n-10m/standard-result.md)
- [Raw harness summary](artifacts/runs/2026-07-23T13-07-59Z-smoke-clean-8n-10m/summary.json)

## 2026-07-23 — SMOKE-02

| Field | Result |
| --- | --- |
| Test | Clean eight-node smoke test |
| Duration | 10 minutes wall-clock |
| Profile | `typical-real-world-mesh` |
| Faults | None |
| Status | `completed` |
| Verdict | `pass` |
| Generated | 10,043 |
| Duplicates injected/dropped | 5 / 5 |
| Transport received | 10,048 |
| Ordered | 10,043 |
| Anomalies | 0 |
| Peak node queue | 7 |
| Peak RSS | 83.3 MB |
| Final pending work | 0 |

All standardized accounting, final-state, shutdown, and verdict checks passed.

Harness command:

```bash
causal-order-testing-adapter-runtime --adapter @causal-order/transport/testing --monitor --duration 10m --steady-for 10m --time-scale 1 --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h --profile typical-real-world-mesh --run-name smoke-clean-8n-10m
```

- [Standard report](artifacts/runs/2026-07-23T12-56-17Z-smoke-clean-8n-10m/standard-result.md)
- [Raw harness summary](artifacts/runs/2026-07-23T12-56-17Z-smoke-clean-8n-10m/summary.json)

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
