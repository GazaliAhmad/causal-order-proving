# TEST-02: jitter-dark

## Objective

Verify the causal-order stack's fault tolerance through the T02 jitter-dark scenario without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: jitter-dark
- **Published API**: `@causal-order/testing`

## Run Command

```bash
npm run t02
```

Result folder: `artifacts/runs/2026-07-30T13-01-39Z-t02-jitter-dark-8n-8h`

## Evidence

- **Verdict**: `PASS`
- **Events generated**: 551,416
- **Anomalies detected and resolved**: 1129
- **Data loss**: 0
- **Pending work**: 0
- **Monitor scenario**: `none`

[Detailed metrics](../artifacts/runs/2026-07-30T13-01-39Z-t02-jitter-dark-8n-8h/standard-result.md)

## Proof Criteria

- All standardized accounting and ordering checks passed
- The configured scenario matches the T02 evidence contract
- Every required fault was observed
- The stack drained with zero pending work and zero leakage

This run satisfies the T02 jitter-dark evidence contract.
