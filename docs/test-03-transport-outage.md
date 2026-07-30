# TEST-03: transport-outage

> [!WARNING]
> **RETRACTED:** This run did not exercise the intended transport outage. No
> transport disconnection occurred during the active test window; the recorded
> disconnects occurred only during final shutdown.

## Objective

Verify the causal-order stack's fault tolerance through a controlled test scenario injecting network faults and measuring recovery without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: transport-outage
- **Published API**: @causal-order/testing

## Constraints

- Stack implementation is a black box; only published testing APIs may be used
- All events must be accounted for without artificial drops
- No shortcuts or privileged access to internal state

## Run Command

```bash
npm run t03
```

Result folder: `artifacts/runs/2026-07-25T03-45-15Z-t03-transport-outage-8n-8h`

## Evidence

The published `@causal-order/testing` APIs recorded the following for the non-outage workload that actually ran:

- **Evidence status**: `INVALID_FOR_INTENDED_SCENARIO`
- **Recorded harness verdict**: `PASS` for the non-outage workload only
- **Events generated**: 564,232
- **Anomalies detected and resolved**: 733
- **Data loss**: 0 (zero leakage)
- **Pending work**: 0 (clean drain)

**Actual scenario:** normal transport operation with the `typical-real-world-mesh` workload and monitor enabled.

**Missing intended fault:** mid-run transport outage and recovery.

[Detailed metrics](../artifacts/runs/2026-07-25T03-45-15Z-t03-transport-outage-8n-8h/standard-result.md)

## Proof Criteria

- ❌ Mid-run transport disconnect: not observed
- ❌ Mid-run transport reconnect: not observed
- ✅ Final accounting and drain checks passed for the workload that ran

This evidence does not satisfy T03. A corrected eight-hour run and a new evidence tag are required.
