# TEST-08: nodes-order

> [!WARNING]
> **RETRACTED:** The causal-order outage ran, but the configured node jitter,
> dark-window, and reconnect counters were all zero. This run does not prove the
> intended nodes-order composition.

## Objective

Verify the causal-order stack's fault tolerance through a controlled test scenario injecting network faults and measuring recovery without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: nodes-order
- **Published API**: @causal-order/testing

## Constraints

- Stack implementation is a black box; only published testing APIs may be used
- All events must be accounted for without artificial drops
- No shortcuts or privileged access to internal state

## Run Command

```bash
npm run t08
```

Result folder: `artifacts/runs/2026-07-27T14-19-28Z-t08-nodes-order-8n-8h`

## Evidence

The published `@causal-order/testing` APIs recorded the following for the causal-order-only scenario that actually ran:

- **Evidence status**: `INVALID_FOR_INTENDED_SCENARIO`
- **Recorded harness verdict**: `PASS` for the causal-order-outage scenario only
- **Events generated**: 562,609
- **Anomalies detected and resolved**: 751
- **Data loss**: 0 (zero leakage)
- **Pending work**: 0 (clean drain)

**Actual scenario:** causal-order outage without node jitter/dark-window behavior.

[Detailed metrics](../artifacts/runs/2026-07-27T14-19-28Z-t08-nodes-order-8n-8h/standard-result.md)

## Proof Criteria

- ❌ Configured node jitter: not observed
- ❌ Configured dark window and reconnect: not observed
- ✅ Causal-order outage, replay, and final drain were observed

This evidence does not satisfy T08. A corrected eight-hour run and a new evidence tag are required.

## Run 2026-08-02T15-37-18Z-t08-nodes-order-8n-8h

Result folder: `artifacts/runs/2026-08-02T15-37-18Z-t08-nodes-order-8n-8h`

- **Verdict**: `PASS`
- **Events generated**: 550,135
- **Anomalies detected and resolved**: 1068
- **Data loss**: 0
- **Pending work**: 0
- **Monitor scenario**: `monitor-order-outage`

[Detailed metrics](../artifacts/runs/2026-08-02T15-37-18Z-t08-nodes-order-8n-8h/standard-result.md)

This run satisfies the T08 nodes-order evidence contract.
