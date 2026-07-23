# causal-order-proving

Wall-clock qualification of the published `causal-order` stack.

This repository tests whether the published stack connects correctly and whether `@causal-order/monitor` can contain failures, preserve accountable work, and drive the stack to a bounded, fully drained recovery.

```text
eight nodes
  -> @causal-order/transport
  -> @causal-order/monitor
  -> @causal-order/dedupe
  -> causal-order
```

`@causal-order/testing` is the external harness. It generates workloads, injects faults, collects evidence, and assigns scenario-aware verdicts.

All stack packages are tested through their published APIs without modification, mock replacements, invented functions, or bypasses. Test behavior must come from the installed `@causal-order/testing` harness.

## First test

The first qualification test is a healthy baseline: eight connected nodes run for eight wall-clock hours with no injected component or node failures.

See [Test 01: eight-node wall-clock baseline](docs/test-01-wall-clock.md) for its requirements, constraints, execution shape, and proof criteria.

Fault injection starts only after the baseline passes. See the [test plan](docs/test-plan.md) for the complete gated program.

Executed runs are recorded in [TESTLOG.md](TESTLOG.md). Suggested stack improvements are documented under [proposals](proposals/README.md).

## Install

Requires Node.js `>=22.13.0`.

```bash
npm ci
```

Run the clean ten-minute smoke test:

```bash
npm test
```

Every run can be converted to the same machine-readable and operator-facing [result format](docs/result-standard.md).

`day-boundary` and `sqlite-recovery-envelope` are not part of the causal-order stack and are not included.
