# TEST-09: transport-dedupe

> [!WARNING]
> **RETRACTED:** This run exercised dedupe and causal-order outages, not the
> intended transport and dedupe outage. Transport remained online during the
> fault window.

## Objective

Verify the causal-order stack's fault tolerance through a controlled test scenario injecting network faults and measuring recovery without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: transport-dedupe
- **Published API**: @causal-order/testing

## Constraints

- Stack implementation is a black box; only published testing APIs may be used
- All events must be accounted for without artificial drops
- No shortcuts or privileged access to internal state

## Run Command

```bash
npm run t09
```

Result folder: `artifacts/runs/2026-07-28T01-23-16Z-t09-transport-dedupe-8n-8h`

## Evidence

The published `@causal-order/testing` APIs recorded the following for the scenario that actually ran:

- **Evidence status**: `INVALID_FOR_INTENDED_SCENARIO`
- **Recorded harness verdict**: `PASS` for the actual scenario only
- **Events generated**: 563,332
- **Anomalies detected and resolved**: 784
- **Data loss**: 0 (zero leakage)
- **Pending work**: 0 (clean drain)

**Actual scenario:** dedupe outage plus causal-order outage.

**Missing intended fault:** transport outage.

[Detailed metrics](../artifacts/runs/2026-07-28T01-23-16Z-t09-transport-dedupe-8n-8h/standard-result.md)

## Proof Criteria

- ❌ Transport outage: not observed
- ✅ Dedupe and causal-order outages were observed
- ✅ Final accounting and drain checks passed for the actual scenario

This evidence does not satisfy T09. A corrected eight-hour run and a new evidence tag are required.
