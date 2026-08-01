# TEST-06: nodes-transport

> [!WARNING]
> **RETRACTED:** This run exercised neither the configured node
> jitter/dark-window behavior nor the intended mid-run transport outage.
> Recorded transport disconnects occurred only during final shutdown.

## Objective

Verify the causal-order stack's fault tolerance through a controlled test scenario injecting network faults and measuring recovery without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: nodes-transport
- **Published API**: @causal-order/testing

## Constraints

- Stack implementation is a black box; only published testing APIs may be used
- All events must be accounted for without artificial drops
- No shortcuts or privileged access to internal state

## Run Command

```bash
npm run t06
```

Result folder: `artifacts/runs/2026-07-26T13-59-03Z-t06-nodes-transport-8n-8h`

## Evidence

The published `@causal-order/testing` APIs recorded the following for the partial scenario that actually ran:

- **Evidence status**: `INVALID_FOR_INTENDED_SCENARIO`
- **Recorded harness verdict**: `PASS` for the partial scenario only
- **Events generated**: 563,478
- **Anomalies detected and resolved**: 745
- **Data loss**: 0 (zero leakage)
- **Pending work**: 0 (clean drain)

**Actual scenario:** normal node and transport operation.

**Missing intended faults:** node jitter/dark-window behavior plus mid-run transport outage and recovery.

[Detailed metrics](../artifacts/runs/2026-07-26T13-59-03Z-t06-nodes-transport-8n-8h/standard-result.md)

## Proof Criteria

- ❌ Configured node jitter/dark-window behavior: not observed
- ❌ Mid-run transport disconnect: not observed
- ❌ Mid-run transport reconnect: not observed
- ✅ Final accounting and drain checks passed for the partial scenario

This evidence does not satisfy T06. A corrected eight-hour run and a new evidence tag are required.

## Run 2026-07-31T22-51-29Z-t06-nodes-transport-8n-8h

Result folder: `artifacts/runs/2026-07-31T22-51-29Z-t06-nodes-transport-8n-8h`

- **Verdict**: `PASS`
- **Events generated**: 551,816
- **Anomalies detected and resolved**: 3343
- **Data loss**: 0
- **Pending work**: 0
- **Monitor scenario**: `monitor-transport-outage-burst`

[Detailed metrics](../artifacts/runs/2026-07-31T22-51-29Z-t06-nodes-transport-8n-8h/standard-result.md)

This run satisfies the T06 nodes-transport evidence contract.
