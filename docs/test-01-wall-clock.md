# Test 01: eight-node wall-clock baseline

## Objective

Establish a healthy reference run for the published stack before injecting any faults.

The baseline must prove that the installed package versions connect correctly, events traverse the complete pipeline, operational evidence is coherent, and the stack drains cleanly after sustained wall-clock operation.

```text
eight nodes
  -> @causal-order/transport
  -> @causal-order/monitor
  -> @causal-order/dedupe
  -> causal-order
```

`@causal-order/testing` is the harness. It generates the workload, records evidence, and assigns the verdict.

## Requirements

The baseline must:

- use exactly eight nodes;
- run for eight hours with `--time-scale 1`;
- use the published `@causal-order/transport/testing` adapter;
- enable the monitor-aware delivery path;
- run a healthy, steady workload for the entire requested duration;
- retain configuration, delivery, dedupe, ordering, monitor, and shutdown evidence; and
- finish with a `pass` verdict.

The canonical nodes are:

```text
edge-a, edge-b, edge-c, edge-d, edge-e, edge-f, edge-g, edge-h
```

## Constraints

- Treat all installed package APIs as immutable.
- Use only the published `@causal-order/testing` executable and the published `@causal-order/transport/testing` adapter.
- Do not use mocks, local substitute stages, internal package imports, invented functions, or shortcuts around the delivery path.
- Do not inject node jitter, dark-node windows, or component outages.
- Do not enable a fault-oriented monitor scenario.
- Do not accelerate time.
- Do not change the node count or bypass the real transport adapter.
- Shorter runs are diagnostic only and do not replace the baseline.
- The run must have its own artifact directory and stable run name.
- The stack must be allowed to complete its bounded recovery, drain, and shutdown work after the eight-hour workload ends.

Ordinary transport latency, normal duplicate noise, and causal dependencies from the workload profile are baseline traffic characteristics, not injected failures.

The initial clean diagnostic uses the same eight-node stack and wall clock but runs for ten minutes:

```bash
npm run test:smoke
```

## Run

```bash
npx --no-install causal-order-testing-adapter-runtime \
  --adapter @causal-order/transport/testing \
  --monitor \
  --duration 8h \
  --steady-for 8h \
  --time-scale 1 \
  --node-ids edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h \
  --profile typical-real-world-mesh \
  --run-name baseline-8n-8h
```

## Evidence

Artifacts are written beneath `artifacts/runs/`.

```bash
npx --no-install causal-order-testing-latest
npx --no-install causal-order-testing-summary artifacts/runs/<run-folder>
npx --no-install causal-order-testing-duplicates artifacts/runs/<run-folder>
```

The baseline should capture reference values for:

- generated, sent, acknowledged, and delivered events;
- transport errors and acknowledgment latency;
- monitor routing, buffering, replay, and high-water marks;
- dedupe decisions and duplicate reasons;
- ordered output and anomaly counts;
- pending work at final capture; and
- recovery, callback-barrier, drain, and shutdown timing.

These values become the comparison point for every later fault run.

## Proof criteria

Test 01 passes only when:

- all eight nodes appear in the evidence;
- the workload reaches eight wall-clock hours without interruption;
- the installed packages load without compatibility or contract errors;
- events traverse every stack boundary using the expected event, acknowledgment, health, and lifecycle contracts;
- monitor remains healthy and does not accumulate unexplained buffered work;
- dedupe decisions account for normal duplicate noise;
- causal ordering settles without an unexplained contract violation;
- no monitor, lifecycle, transport, or ordering work remains pending at final capture;
- callback, drain, and shutdown barriers complete; and
- the harness records `pass`.

No fault-injection run begins until this baseline has passed and its artifacts have been retained.
