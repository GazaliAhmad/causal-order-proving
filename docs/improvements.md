# Improvements

This document tracks actionable improvements for the causal-order-proving repository.

## Current status

- `T01` healthy baseline is completed and recorded.
- `T02` node jitter + dark-node recovery is currently running.
- `T03` through `T12` remain to be executed and documented.

## CLI command templates for T03–T12

The following command templates use the published harness executable and public CLI flags.

### Shared command base

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name <run-name>
```

### T03 — Transport outage

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-transport-outage-burst `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T03-transport-outage-8n-8h
```

### T04 — Dedupe outage

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-dedupe-outage `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T04-dedupe-outage-8n-8h
```

### T05 — Causal-order outage

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-order-outage `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T05-order-outage-8n-8h
```

### T06 — Nodes and transport fail together

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-transport-outage-burst `
  --jitter-nodes edge-a `
  --dark-nodes edge-b `
  --dark-start-after 10m `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T06-nodes-transport-8n-8h
```

### T07 — Nodes and dedupe fail together

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-dedupe-outage `
  --jitter-nodes edge-a `
  --dark-nodes edge-b `
  --dark-start-after 10m `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T07-nodes-dedupe-8n-8h
```

### T08 — Nodes and causal-order fail together

```powershell
npm run t08
```

The T08 wrapper creates a unique durable state directory for every run. It uses
a disk-backed monitor reservoir and a capacity-bounded SQLite dedupe identity
ledger, so correctness does not depend on projecting a previously observed
outage or replay duration into the new run. The 900-second in-memory window is
retained only as a fast-path optimization. Durable identity capacity is
2,000,000 entries; exhaustion fails closed instead of evicting identities.

### T09 — Transport and dedupe fail together

```powershell
npm run t09
```

T09 uses isolated disk-backed monitor and dedupe state with a finite durable
identity capacity. The deliberate dedupe-bypass interval remains expected
degradation: identities that bypass dedupe cannot be protected by its ledger.
Normal and recovered routes through dedupe do use the durable ledger.

### T10 — Transport and causal-order fail together

```powershell
npm run t10
```

T10 uses isolated disk-backed monitor and dedupe state. Its 900-second
in-memory window is only a fast path; correctness does not assume that the next
outage or recovery horizon matches a previous run.

### T11 — Dedupe and causal-order fail together

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-dual-outage `
  --dedupe-config configs/order-outage-dedupe.json `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T11-dedupe-order-8n-8h
```

### T12 — Nodes, transport, dedupe, and causal-order fail together

```powershell
npm run t12
```

T12 uses the same isolated, capacity-bounded durable state while combining the
node, transport, dedupe, and ordering faults. Capacity exhaustion fails closed
instead of silently evicting processed identities.

## Notes

- These are command templates based on the published harness CLI and the test-plan scenario names.
- If a requested composite fault scenario is not supported by the installed harness, the test remains `not runnable` until the harness adds the required published configuration.
- Record the exact command and artifact folder in `TESTLOG.md` once each test completes.
