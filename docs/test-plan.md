# Test plan

## Purpose

Qualify the installed causal-order stack as one connected system and prove that `@causal-order/monitor` contains and recovers from supported runtime failures.

```text
eight nodes
  -> @causal-order/transport
  -> @causal-order/monitor
  -> @causal-order/dedupe
  -> causal-order
```

`@causal-order/testing` is the harness. It generates traffic, injects faults, records transitions and outcomes, and assigns the verdict.

## Non-negotiable API rules

- Treat every installed stack package as immutable.
- Do not modify, monkey-patch, wrap, or replace a package API for a test.
- Use only documented package exports, executables, adapters, options, event contracts, and lifecycle methods.
- Do not import package internals or address files that are not published API entry points.
- Do not invent local stack functions, substitute implementations, mocks, or compatibility shims.
- Do not call a downstream stage directly to bypass transport, monitor, dedupe, or causal-order.
- Workloads, fault injection, orchestration, recovery sequencing, and verdicts must come from the installed `@causal-order/testing` harness.
- Local code may launch a published harness command and normalize its emitted artifacts. It must not change runtime behavior or reinterpret the harness verdict.
- Record the exact package versions and harness command for every run.

If the installed harness cannot express a planned scenario through its published surface, that scenario is `not runnable`. It remains pending until a released harness version supports it. This repository must not fill the gap with made-up functions or shortcuts.

## Common contract

Every test:

- uses `edge-a` through `edge-h`;
- runs an eight-hour workload at `--time-scale 1`;
- uses `@causal-order/transport/testing`;
- enables the monitor-aware path;
- starts with a healthy period before its requested fault;
- includes recovery and a post-recovery observation period;
- retains an independent artifact directory and stable run name; and
- completes recovery, drain, callback barriers, and bounded shutdown.

Every retained run must also be converted to the versioned [standard result format](result-standard.md).

Shorter or accelerated runs are diagnostic and do not qualify.

For upstream node and transport failures, evidence must distinguish events that never reached monitor from work accepted by monitor. Monitor is responsible for accounting for accepted work; it cannot retain an event it never received.

## Execution gates

Tests run in this order:

1. The healthy baseline must pass before any fault test begins.
2. All four single-fault tests must pass before pairwise tests begin.
3. A pairwise test begins only after both corresponding single-fault tests pass.
4. The all-at-once test begins only after all pairwise tests pass.

A failed or invalid run retains its artifacts, is diagnosed, and is rerun under the same test ID. Changing the scenario creates a new run; it does not replace the failed evidence.

## Harness coverage

The installed harness already exposes:

- node jitter and dark/rejoin controls;
- `monitor-transport-outage-burst`;
- `monitor-dedupe-outage`;
- `monitor-order-outage`; and
- `monitor-dual-outage`.

T06 through T10 and T12 require composed fault configuration so their requested windows overlap in one run. They may run only when the installed harness exposes that composition through its published surface. Until then, they remain `not runnable`; this repository will not emulate composition locally.

## Planned tests

### T01 — Healthy baseline

Faults: none.

Proves:

- all installed package versions load and connect;
- all eight nodes can deliver through the complete stack;
- event, acknowledgment, health, and lifecycle contracts agree at every boundary;
- normal duplicate noise is accounted for;
- monitor does not accumulate unexplained buffered work; and
- the stack remains stable for eight hours and shuts down fully drained.

Expected verdict: `pass`.

Detailed specification: [Test 01: eight-node wall-clock baseline](test-01-wall-clock.md).

### T02 — Node jitter and dark-node recovery

Faults: at least one node receives injected jitter and at least one different node goes dark and rejoins. All eight nodes remain configured.

Proves:

- healthy nodes continue delivering;
- jitter and peer-state transitions are observable;
- dark nodes can rejoin without corrupting stack state;
- upstream non-delivery is distinguished from post-acceptance loss; and
- accepted work remains accounted for through recovery.

Expected verdict: `pass`.

### T03 — Transport outage

Faults: transport connectivity or delivery becomes unavailable and later recovers.

Proves:

- transport failure is surfaced rather than mistaken for successful delivery;
- monitor preserves and drains any work already accepted;
- acknowledgments and callback boundaries remain coherent; and
- delivery resumes cleanly after transport recovery.

Harness scenario: `monitor-transport-outage-burst`.

Expected verdict: `pass`.

### T04 — Dedupe outage

Faults: dedupe becomes unavailable and later recovers.

Proves:

- monitor detects the unhealthy dependency;
- any configured direct-to-order bypass is bounded and observable;
- bypassed events and possible duplicate leakage are explicitly accounted for; and
- normal dedupe routing resumes after recovery.

Harness scenario: `monitor-dedupe-outage`.

Expected verdict: `pass_with_expected_degradation` when bypass is enabled; otherwise `pass`.

### T05 — Causal-order outage

Faults: causal-order becomes unavailable and later recovers.

Proves:

- monitor buffers work instead of losing accepted events;
- backlog remains within configured capacity;
- recovery replays buffered work through restored dedupe;
- ordering settles after replay; and
- monitor drains to a terminal state.

Harness scenario: `monitor-order-outage`.

Expected verdict: `pass`.

### T06 — Nodes and transport fail together

Faults: node jitter/darkness overlaps a transport outage.

Proves:

- node and transport evidence remains distinguishable;
- unaffected nodes and periods are correctly accounted for;
- transport reconnection and node rejoin do not duplicate lifecycle work; and
- accepted work survives the overlapping recovery.

Expected verdict: `pass`.

### T07 — Nodes and dedupe fail together

Faults: node jitter/darkness overlaps a dedupe outage.

Proves:

- peer recovery and dedupe degradation remain independently observable;
- monitor keeps bypass within its configured bounds;
- duplicate consequences remain attributable; and
- restored nodes return to the normal dedupe path.

Expected verdict: scenario-aware `pass` or `pass_with_expected_degradation`.

### T08 — Nodes and causal-order fail together

Faults: node jitter/darkness overlaps a causal-order outage.

Proves:

- monitor buffers delivered work while nodes independently change state;
- rejoining-node traffic is accepted without corrupting the backlog;
- recovery replays through dedupe; and
- ordering and monitor state fully settle.

Expected verdict: `pass`.

### T09 — Transport and dedupe fail together

Faults: transport outage overlaps a dedupe outage.

Proves:

- upstream non-delivery and downstream degradation are not conflated;
- any work accepted before or during the overlap remains accounted for;
- bypass behavior occurs only while allowed; and
- normal acknowledged delivery through dedupe resumes;
- monitor state and dedupe identities on the normal/recovered route are durable
  without assuming a previously observed outage horizon; and
- deliberate bypass remains explicitly degraded because bypassed identities do
  not pass through the dedupe ledger.

Expected verdict: scenario-aware `pass` or `pass_with_expected_degradation`.

### T10 — Transport and causal-order fail together

Faults: transport outage overlaps a causal-order outage.

Proves:

- monitor retains accepted work while ordering is unavailable;
- transport recovery does not overwhelm or bypass the buffered recovery path;
- replay passes through dedupe before ordering; and
- acknowledgment, replay, and shutdown barriers all settle; and
- replay identity protection uses finite, durable storage rather than treating
  the configured in-memory window as a forecast of the next outage.

Expected verdict: `pass`.

### T11 — Dedupe and causal-order fail together

Faults: dedupe and causal-order become unavailable during the same window.

Proves:

- monitor retains work when neither downstream stage is usable;
- no unsafe direct-to-order bypass occurs while ordering is offline;
- restoration re-establishes the correct dedupe-to-order path;
- backlog replay is bounded and accountable; and
- all pending state drains.

Harness scenario: `monitor-dual-outage`.

Expected verdict: `pass`.

### T12 — Nodes, transport, dedupe, and causal-order fail together

Faults: node jitter/darkness overlaps transport, dedupe, and causal-order outages.

Proves:

- the harness and artifacts identify every concurrent failure;
- upstream non-delivery remains distinct from monitor-accepted work;
- monitor contains all accepted work while downstream stages are unusable;
- recovery restores the complete path without an unsafe shortcut;
- rejoin, reconnect, dedupe, replay, and ordering converge; and
- final state and shutdown are fully drained; and
- monitor backlog and dedupe identity state are durable and capacity-bounded,
  with exhaustion failing closed.

Expected verdict: scenario-aware `pass`.

## Evidence required from every test

Each artifact set must contain enough information to verify:

- package versions, resolved configuration, node set, duration, and time scale;
- generated, attempted, acknowledged, delivered, and rejected event counts;
- peer, transport, and component-health transitions;
- monitor routing, buffering, bypass, retry, replay, and capacity evidence;
- dedupe decisions, identity sources, and duplicate leakage;
- ordered output, corrections, and anomalies;
- requested versus observed fault windows;
- recovery milestones and post-recovery state; and
- final pending counts, callback barriers, drain state, shutdown state, and verdict.

## Program completion

The program contains 12 tests and 96 harness-hours when run sequentially:

- 8 hours of healthy baseline;
- 32 hours of single-fault tests;
- 48 hours of pairwise tests; and
- 8 hours of all-at-once testing.

The stack is qualified only when all 12 test IDs have retained, reviewable evidence and their expected successful verdicts.
