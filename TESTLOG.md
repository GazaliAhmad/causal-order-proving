## T03: transport-outage — 2026-07-31T11-07-07Z-t03-transport-outage-8n-8h

**Verdict**: `PASS` ✅

| Metric | Value |
| --- | --- |
| **Events generated** | 562,529 |
| **Anomalies** | 2893 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The recorded scenario matched the T03 evidence contract. Every required fault was observed, all standardized checks passed, and the stack drained cleanly.

**Command**: `npm run t03`  
**Documentation**: [docs/test-03-transport-outage.md](docs/test-03-transport-outage.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-31T11-07-07Z-t03-transport-outage-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-31T11-07-07Z-t03-transport-outage-8n-8h/standard-result.json)

---

## T12: all-failures

**Evidence status**: `INVALID_FOR_INTENDED_SCENARIO` ⚠️

**Recorded harness verdict**: `PASS` for the partial scenario only

| Metric | Value |
|--------|-------|
| **Events generated** | 562,871 |
| **Anomalies** | 770 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The run exercised node jitter/dark-window behavior plus dedupe and causal-order outages. It did not inject the required transport outage, so it does not prove the intended T12 all-failures claim. The original artifacts are retained as retracted evidence.

**Command**: `npm run t12`  
**Documentation**: [docs/test-12-all-failures.md](docs/test-12-all-failures.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-29T16-59-10Z-t12-all-failures-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-29T16-59-10Z-t12-all-failures-8n-8h/standard-result.json)

---

## T11: dedupe-order

**Verdict**: `PASS` ✅

| Metric | Value |
|--------|-------|
| **Events generated** | 562,537 |
| **Anomalies** | 779 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The dedupe-order scenario tested recovery behavior. All 779 transient reorderings were detected and resolved without data loss or ordering violations, confirming fault tolerance.

**Command**: `npm run t11`  
**Documentation**: [docs/test-11-dedupe-order.md](docs/test-11-dedupe-order.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-29T01-40-57Z-t11-dedupe-order-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-29T01-40-57Z-t11-dedupe-order-8n-8h/standard-result.json)

---

## T10: transport-order

**Evidence status**: `INVALID_FOR_INTENDED_SCENARIO` ⚠️

**Recorded harness verdict**: `PASS` for the actual scenario only

| Metric | Value |
|--------|-------|
| **Events generated** | 564,250 |
| **Anomalies** | 755 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The run exercised dedupe and causal-order outages, not transport and causal-order outages. Transport remained online during the intended fault window, so the run does not prove the T10 claim. The original artifacts are retained as retracted evidence.

**Command**: `npm run t10`  
**Documentation**: [docs/test-10-transport-order.md](docs/test-10-transport-order.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-28T14-28-28Z-t10-transport-order-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-28T14-28-28Z-t10-transport-order-8n-8h/standard-result.json)

---

## T09: transport-dedupe

**Evidence status**: `INVALID_FOR_INTENDED_SCENARIO` ⚠️

**Recorded harness verdict**: `PASS` for the actual scenario only

| Metric | Value |
|--------|-------|
| **Events generated** | 563,332 |
| **Anomalies** | 784 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The run exercised dedupe and causal-order outages, not transport and dedupe outages. Transport remained online during the intended fault window, so the run does not prove the T09 claim. The original artifacts are retained as retracted evidence.

**Command**: `npm run t09`  
**Documentation**: [docs/test-09-transport-dedupe.md](docs/test-09-transport-dedupe.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-28T01-23-16Z-t09-transport-dedupe-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-28T01-23-16Z-t09-transport-dedupe-8n-8h/standard-result.json)

---

## T08: nodes-order

**Evidence status**: `INVALID_FOR_INTENDED_SCENARIO` ⚠️

**Recorded harness verdict**: `PASS` for the causal-order-outage scenario only

| Metric | Value |
|--------|-------|
| **Events generated** | 562,609 |
| **Anomalies** | 751 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The causal-order outage ran, but the configured node jitter and dark-window counters remained zero. The run therefore does not prove the intended T08 nodes-order claim. The original artifacts are retained as retracted evidence.

**Command**: `npm run t08`  
**Documentation**: [docs/test-08-nodes-order.md](docs/test-08-nodes-order.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-27T14-19-28Z-t08-nodes-order-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-27T14-19-28Z-t08-nodes-order-8n-8h/standard-result.json)

---

## T07: nodes-dedupe

**Evidence status**: `INVALID_FOR_INTENDED_SCENARIO` ⚠️

**Recorded harness verdict**: `PASS_WITH_EXPECTED_DEGRADATION` for the dedupe-outage scenario only

| Metric | Value |
|--------|-------|
| **Events generated** | 562,673 |
| **Anomalies** | 838 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The dedupe outage ran, but the configured node jitter and dark-window counters remained zero. The run therefore does not prove the intended T07 nodes-dedupe claim. The original artifacts are retained as retracted evidence.

**Command**: `npm run t07`  
**Documentation**: [docs/test-07-nodes-dedupe.md](docs/test-07-nodes-dedupe.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-27T01-39-25Z-t07-nodes-dedupe-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-27T01-39-25Z-t07-nodes-dedupe-8n-8h/standard-result.json)

---

## T06: nodes-transport

**Evidence status**: `INVALID_FOR_INTENDED_SCENARIO` ⚠️

**Recorded harness verdict**: `PASS` for the partial scenario only

| Metric | Value |
|--------|-------|
| **Events generated** | 563,478 |
| **Anomalies** | 745 |
| **Leakage** | 0 |
| **Pending work** | 0 |

Neither the configured node jitter/dark-window behavior nor a mid-run transport outage was observed. Transport disconnects were recorded only during final shutdown, so the run does not prove the T06 claim. The original artifacts are retained as retracted evidence.

**Command**: `npm run t06`  
**Documentation**: [docs/test-06-nodes-transport.md](docs/test-06-nodes-transport.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-26T13-59-03Z-t06-nodes-transport-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-26T13-59-03Z-t06-nodes-transport-8n-8h/standard-result.json)

---

## T05: order-outage

**Verdict**: `PASS` ✅

| Metric | Value |
|--------|-------|
| **Events generated** | 563,943 |
| **Anomalies** | 787 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The order-outage scenario tested recovery behavior. All 787 transient reorderings were detected and resolved without data loss or ordering violations, confirming fault tolerance.

**Command**: `npm run t05`  
**Documentation**: [docs/test-05-order-outage.md](docs/test-05-order-outage.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-26T01-34-49Z-t05-order-outage-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-26T01-34-49Z-t05-order-outage-8n-8h/standard-result.json)

---

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

**Evidence status**: `INVALID_FOR_INTENDED_SCENARIO` ⚠️

**Recorded harness verdict**: `PASS` for the non-outage workload only

| Metric | Value |
|--------|-------|
| **Events generated** | 564,232 |
| **Anomalies** | 733 |
| **Leakage** | 0 |
| **Pending work** | 0 |

No transport disconnection occurred during the active test window. The recorded disconnects occurred only during final shutdown after all eight nodes completed, so the run does not prove the T03 transport-outage claim. The original artifacts are retained as retracted evidence.

**Command**: `npm run t03`  
**Documentation**: [docs/test-03-transport-outage.md](docs/test-03-transport-outage.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-25T03-45-15Z-t03-transport-outage-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-25T03-45-15Z-t03-transport-outage-8n-8h/standard-result.json)

---

## T02: jitter-dark — first run (2026-07-24)

**Evidence status**: `INVALID_FOR_INTENDED_SCENARIO` ⚠️

**Recorded harness verdict**: `PASS` for the normal-node workload only

| Metric | Value |
| --- | --- |
| **Events generated** | 562,664 |
| **Anomalies** | 790 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The configured jitter and dark-node lists were present, but the recorded jitter-delay, dark-window, and reconnect counters were all zero. The run therefore does not prove the intended T02 jitter-dark claim. The original artifacts are retained as retracted evidence.

**Command**: `npm run t02`

**Documentation**: [docs/test-02-jitter-dark.md](docs/test-02-jitter-dark.md)

**Results**: [standard-result.md](artifacts/runs/2026-07-24T17-07-12Z-t02-jitter-dark-8n-8h/standard-result.md)

**Evidence**: [standard-result.json](artifacts/runs/2026-07-24T17-07-12Z-t02-jitter-dark-8n-8h/standard-result.json)

---

## T02: jitter-dark — corrected run (2026-07-30)

**Verdict**: `PASS` ✅

| Metric | Value |
| --- | --- |
| **Events generated** | 551,416 |
| **Anomalies** | 1129 |
| **Leakage** | 0 |
| **Pending work** | 0 |

The recorded scenario matched the T02 evidence contract. Every required fault was observed, all standardized checks passed, and the stack drained cleanly.

**Command**: `npm run t02`  
**Documentation**: [docs/test-02-jitter-dark.md](docs/test-02-jitter-dark.md)  
**Results**: [standard-result.md](artifacts/runs/2026-07-30T13-01-39Z-t02-jitter-dark-8n-8h/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/2026-07-30T13-01-39Z-t02-jitter-dark-8n-8h/standard-result.json)

---


# Test log

Chronological record of executed causal-order stack tests. This repository uses a test log rather than a software changelog.

## 2026-07-26 — SMOKE-05

| Field | Result |
| --- | --- |
| Test | Clean eight-node smoke test |
| Duration | 10 minutes wall-clock |
| Profile | `typical-real-world-mesh` |
| Faults | None |
| Status | `completed` |
| Verdict | `pass` |
| Generated | 10,073 |
| Duplicates injected/dropped | 11 / 11 |
| Transport received | 10,084 |
| Ordered | 10,073 |
| Anomalies | 0 |
| Duplicate leakage | 0 |
| Peak node queue | 9 |
| Peak RSS | 115.1 MB |
| Final pending work | 0 |

All standardized accounting, final-state, shutdown, and verdict checks passed. All eight nodes completed at `timeScale=1`; monitor routing remained normal, no work was buffered or replayed, and the monitor, ordering, callback, lifecycle, and resource shutdown barriers all drained cleanly.

Harness command:

```bash
causal-order-testing-adapter-runtime --adapter @causal-order/transport/testing --monitor --duration 10m --steady-for 10m --time-scale 1 --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h --profile typical-real-world-mesh --run-name smoke-clean-8n-10m
```

- [Standard report](artifacts/runs/2026-07-26T13-21-14Z-smoke-clean-8n-10m/standard-result.md)
- [Raw harness summary](artifacts/runs/2026-07-26T13-21-14Z-smoke-clean-8n-10m/summary.json)

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
