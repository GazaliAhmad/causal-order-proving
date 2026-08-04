# TEST-12: all-failures

> [!WARNING]
> **RETRACTED:** This run exercised dedupe and causal-order outages, but it did
> not exercise the configured node jitter/dark-window behavior or inject the
> transport outage required by the intended all-failures scenario.

## Objective

Verify the causal-order stack's fault tolerance through a controlled test scenario injecting network faults and measuring recovery without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: all-failures
- **Published API**: @causal-order/testing

## Constraints

- Stack implementation is a black box; only published testing APIs may be used
- All events must be accounted for without artificial drops
- No shortcuts or privileged access to internal state

## Run Command

```bash
npm run t12
```

Result folder: `artifacts/runs/2026-07-29T16-59-10Z-t12-all-failures-8n-8h`

## Evidence

The published `@causal-order/testing` APIs recorded the following for the partial scenario that actually ran:

- **Evidence status**: `INVALID_FOR_INTENDED_SCENARIO`
- **Recorded harness verdict**: `PASS` for the partial scenario only
- **Events generated**: 562,871
- **Anomalies detected and resolved**: 770
- **Data loss**: 0 (zero leakage)
- **Pending work**: 0 (clean drain)

**Actual scenario:** dedupe and causal-order outages.

**Missing intended faults:** node jitter/dark-window behavior plus transport outage.

[Detailed metrics](../artifacts/runs/2026-07-29T16-59-10Z-t12-all-failures-8n-8h/standard-result.md)

## Proof Criteria

- ❌ Node jitter/dark-window behavior: not observed
- ✅ Dedupe and causal-order outages were observed
- ❌ Transport outage: not observed
- ✅ Final accounting and drain checks passed for the partial scenario

This evidence does not satisfy T12. A corrected eight-hour run and a new evidence tag are required.

## Run 2026-08-04T01-03-41Z-t12-all-failures-8n-8h

Result folder: `artifacts/runs/2026-08-04T01-03-41Z-t12-all-failures-8n-8h`

- **Verdict**: `PASS`
- **Events generated**: 550,686
- **Anomalies detected and resolved**: 3082
- **Data loss**: 0
- **Pending work**: 0
- **Monitor scenario**: `monitor-transport-dedupe-order-outage`

[Detailed metrics](../artifacts/runs/2026-08-04T01-03-41Z-t12-all-failures-8n-8h/standard-result.md)

This run satisfies the T12 all-failures evidence contract.
