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
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-order-outage `
  --jitter-nodes edge-a `
  --dark-nodes edge-b `
  --dark-start-after 10m `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T08-nodes-order-8n-8h
```

### T09 — Transport and dedupe fail together

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-dual-outage `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T09-transport-dedupe-8n-8h
```

### T10 — Transport and causal-order fail together

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-dual-outage `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T10-transport-order-8n-8h
```

### T11 — Dedupe and causal-order fail together

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-dual-outage `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T11-dedupe-order-8n-8h
```

### T12 — Nodes, transport, dedupe, and causal-order fail together

```powershell
npx --no-install causal-order-testing-adapter-runtime `
  --adapter @causal-order/transport/testing `
  --monitor `
  --monitor-scenario monitor-dual-outage `
  --jitter-nodes edge-a `
  --dark-nodes edge-b `
  --dark-start-after 10m `
  --duration 8h `
  --time-scale 1 `
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h `
  --profile typical-real-world-mesh `
  --run-name T12-all-failures-8n-8h
```

## Notes

- These are command templates based on the published harness CLI and the test-plan scenario names.
- If a requested composite fault scenario is not supported by the installed harness, the test remains `not runnable` until the harness adds the required published configuration.
- Record the exact command and artifact folder in `TESTLOG.md` once each test completes.
