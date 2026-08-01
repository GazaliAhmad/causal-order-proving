# TEST-07: nodes-dedupe

> [!WARNING]
> **FIRST RUN RETRACTED:** The 2026-07-27 run exercised the dedupe outage, but
> its configured node jitter, dark-window, and reconnect counters were all
> zero. It remains below as historical evidence. The corrected 2026-08-01 run
> satisfies the intended nodes-dedupe evidence contract.

## Objective

Verify the causal-order stack's fault tolerance through a controlled test scenario injecting network faults and measuring recovery without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: nodes-dedupe
- **Published API**: @causal-order/testing

## Constraints

- Stack implementation is a black box; only published testing APIs may be used
- All events must be accounted for without artificial drops
- No shortcuts or privileged access to internal state

## Run Command

```bash
npm run t07
```

## First run — retracted historical evidence

Result folder: `artifacts/runs/2026-07-27T01-39-25Z-t07-nodes-dedupe-8n-8h`

### Evidence

The published `@causal-order/testing` APIs recorded the following for the dedupe-only scenario that actually ran:

- **Evidence status**: `INVALID_FOR_INTENDED_SCENARIO`
- **Recorded harness verdict**: `PASS_WITH_EXPECTED_DEGRADATION` for the dedupe-outage scenario only
- **Events generated**: 562,673
- **Anomalies detected and resolved**: 838
- **Data loss**: 0 (zero leakage)
- **Pending work**: 0 (clean drain)

**Actual scenario:** dedupe outage without node jitter/dark-window behavior.

[Detailed metrics](../artifacts/runs/2026-07-27T01-39-25Z-t07-nodes-dedupe-8n-8h/standard-result.md)

### First-run proof criteria

- ❌ Configured node jitter: not observed
- ❌ Configured dark window and reconnect: not observed
- ✅ Dedupe outage and final drain were observed

This evidence does not satisfy T07. A corrected eight-hour run and a new evidence tag are required.

## Corrected second run — 2026-08-01

Result folder: `artifacts/runs/2026-08-01T07-39-29Z-t07-nodes-dedupe-8n-8h`

- **Verdict**: `PASS_WITH_EXPECTED_DEGRADATION`
- **Events generated**: 551,008
- **Duplicates injected**: 1,748
- **Transport received**: 552,756
- **Dedupe accepted**: 536,254
- **Dedupe dropped**: 1,705
- **Dedupe bypassed to ordering**: 14,797
- **Events ordered**: 551,051
- **Anomalies detected**: 1,202
- **Duplicate events observed outside dedupe**: 43
- **Data loss**: 0
- **Pending work**: 0
- **Monitor scenario**: `monitor-dedupe-outage`

[Detailed metrics](../artifacts/runs/2026-08-01T07-39-29Z-t07-nodes-dedupe-8n-8h/standard-result.md)

### Corrected-run proof criteria

- ✅ Node jitter on edge-a: 80,906 extra delays and 6,456 spike delays observed
- ✅ Dark-window recovery on edge-b: 19 dark windows and 19 reconnects observed
- ✅ Dedupe outage: bounded direct-to-order routing observed
- ✅ Bypass accounting: all 14,797 bypassed events explicitly reconciled
- ✅ Expected duplicate consequence: 43 `duplicate_event` anomalies attributed to bypass
- ✅ Final drain: zero pending monitor rows and operations
- ✅ Shutdown: ordering settled, callback boundary closed, and resources closed

The expected-degradation verdict is intentional. While dedupe was unavailable,
the monitor's bounded bypass preserved accepted work by routing 14,797 events
directly to ordering. That path cannot suppress duplicates, and 43 duplicate
events were therefore observed outside dedupe. The standardized conservation
checks include the bypass path:

```text
552,756 received
= 536,254 dedupe accepted
+   1,705 dedupe dropped
+  14,797 dedupe bypassed

551,051 ordered
= 536,254 dedupe accepted
+  14,797 dedupe bypassed
```

All standardized checks passed and the stack drained cleanly. This corrected
run satisfies the T07 nodes-dedupe evidence contract while the first run remains
retained above as retracted historical evidence.
