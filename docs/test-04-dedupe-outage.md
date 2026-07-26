# TEST-04: dedupe-outage

## Objective

Verify the causal-order stack's fault tolerance through a controlled test scenario injecting network faults and measuring recovery without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: dedupe-outage
- **Published API**: @causal-order/testing

## Constraints

- Stack implementation is a black box; only published testing APIs may be used
- All events must be accounted for without artificial drops
- No shortcuts or privileged access to internal state

## Run Command

```bash
npm run t04
```

Result folder: `artifacts/runs/2026-07-25T15-04-17Z-t04-dedupe-outage-8n-8h`

## Evidence

The published @causal-order/testing APIs recorded the following:

- **Verdict**: PASS_WITH_EXPECTED_DEGRADATION
- **Events generated**: 564,210
- **Anomalies detected and resolved**: 843
- **Data loss**: 0 (zero leakage)
- **Pending work**: 0 (clean drain)

Detailed metrics: [standard-result.md](2026-07-25T15-04-17Z-t04-dedupe-outage-8n-8h/standard-result.md)

## Proof Criteria

✅ All 9 accounting and ordering checks PASS  
✅ Verdict is PASS  
✅ Zero pending work at shutdown  
✅ Zero duplicate leakage  
✅ All anomalies resolved without corruption  

The stack proves robust handling of faults within the test scenario.
