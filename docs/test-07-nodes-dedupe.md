# TEST-07: nodes-dedupe

> [!WARNING]
> **RETRACTED:** The dedupe outage ran, but the configured node jitter,
> dark-window, and reconnect counters were all zero. This run does not prove the
> intended nodes-dedupe composition.

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

Result folder: `artifacts/runs/2026-07-27T01-39-25Z-t07-nodes-dedupe-8n-8h`

## Evidence

The published `@causal-order/testing` APIs recorded the following for the dedupe-only scenario that actually ran:

- **Evidence status**: `INVALID_FOR_INTENDED_SCENARIO`
- **Recorded harness verdict**: `PASS_WITH_EXPECTED_DEGRADATION` for the dedupe-outage scenario only
- **Events generated**: 562,673
- **Anomalies detected and resolved**: 838
- **Data loss**: 0 (zero leakage)
- **Pending work**: 0 (clean drain)

**Actual scenario:** dedupe outage without node jitter/dark-window behavior.

[Detailed metrics](../artifacts/runs/2026-07-27T01-39-25Z-t07-nodes-dedupe-8n-8h/standard-result.md)

## Proof Criteria

- ❌ Configured node jitter: not observed
- ❌ Configured dark window and reconnect: not observed
- ✅ Dedupe outage and final drain were observed

This evidence does not satisfy T07. A corrected eight-hour run and a new evidence tag are required.
