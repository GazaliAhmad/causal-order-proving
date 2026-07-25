# Test 02: eight-node with jitter and dark window

## Objective

Verify that the published stack handles sustained operation under combined node faults without data loss or ordering violations.

This test introduces two fault classes:
1. **Jitter** on edge-a: simulates unpredictable network latency variations
2. **Dark window** on edge-b: node goes silent (network timeout) after 10 minutes of successful operation

The test proves the stack recovers, maintains causal order, and completes the eight-hour run cleanly.

```text
eight nodes (edge-a with jitter, edge-b dark after 10m)
  -> @causal-order/transport
  -> @causal-order/monitor
  -> @causal-order/dedupe
  -> causal-order
```

`@causal-order/testing` is the harness. It injects the faults, records evidence, and assigns the verdict.

## Requirements

The test must:

- use exactly eight nodes with edge-a under continuous jitter and edge-b entering a dark window at 10 minutes;
- run for eight hours with `--time-scale 1`;
- use the published `@causal-order/transport/testing` adapter;
- enable the monitor-aware delivery path;
- maintain the workload through both active jitter and dark-node recovery phases;
- retain configuration, delivery, dedupe, ordering, monitor, and shutdown evidence; and
- finish with a `pass` verdict despite the injected faults.

The canonical nodes are:

```text
edge-a (jitter), edge-b (dark), edge-c, edge-d, edge-e, edge-f, edge-g, edge-h
```

## Constraints

- Treat all installed package APIs as immutable.
- Use only the published `@causal-order/testing` executable and the published `@causal-order/transport/testing` adapter.
- Do not use mocks, local substitute stages, internal package imports, or shortcuts around the delivery path.
- Do not inject additional monitor scenarios or alter the jitter/dark parameters during the run.
- Do not accelerate time.
- Do not change the node count.
- The run must have its own artifact directory and stable run name.
- The stack must be allowed to complete its bounded recovery, drain, and shutdown work after the eight-hour workload ends.

## Run

```bash
npx --no-install causal-order-testing-adapter-runtime \
  --adapter @causal-order/transport/testing \
  --monitor \
  --duration 8h \
  --time-scale 1 \
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h \
  --profile typical-real-world-mesh \
  --jitter-nodes edge-a \
  --dark-nodes edge-b \
  --dark-start-after 10m \
  --run-name T02-jitter-dark-8n-8h
```

## Evidence

Artifacts are written beneath `artifacts/runs/`.

The test captures the same baseline references as T01, plus:

- jitter impact on edge-a: queue depth, latency variance, duplicate distribution;
- dark-window recovery on edge-b: connection timeout behavior, reconnection timing, work resumption;
- anomaly classification across the failure window and recovery phases; and
- monitor buffering and replay activity during the dark period.

## Proof criteria

Test 02 passes only when:

- all eight nodes appear in the evidence;
- the workload reaches eight wall-clock hours without interruption;
- jitter is continuously applied to edge-a throughout the run;
- edge-b successfully transitions to and recovers from its dark window;
- events continue traversing every stack boundary during fault conditions;
- monitor remains healthy despite the dark window and does not accumulate unexplained buffered work;
- dedupe decisions maintain normal duplicate handling under jitter;
- causal ordering settles despite the transient faults and anomalies;
- no monitor, lifecycle, transport, or ordering work remains pending at final capture;
- callback, drain, and shutdown barriers complete; and
- the harness records `pass`.

Anomalies are expected and permitted—the stack proves its correctness by handling them without data loss or ordering violation.
