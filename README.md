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

## Qualification status

Corrected second runs for four fault scenarios passed their intended evidence contracts:

| Test | Corrected run | Verdict |
| --- | --- | --- |
| T02 — node jitter and dark-node recovery | 2026-07-30 | `PASS` |
| T03 — transport outage | 2026-07-31 | `PASS` |
| T06 — nodes and transport fail together | 2026-07-31 | `PASS` |
| T07 — nodes and dedupe fail together | 2026-08-01 | `PASS_WITH_EXPECTED_DEGRADATION` |

All four runs observed their required faults, passed all standardized checks,
recorded no data loss or pending work, and drained cleanly. T07's expected
degradation reflects the bounded, observable direct-to-order path during the
dedupe outage: 14,797 events bypassed dedupe and 43 duplicate events reached
ordering.
See the [T02 evidence](artifacts/runs/2026-07-30T13-01-39Z-t02-jitter-dark-8n-8h/standard-result.md),
[T03 evidence](artifacts/runs/2026-07-31T11-07-07Z-t03-transport-outage-8n-8h/standard-result.md),
[T06 evidence](artifacts/runs/2026-07-31T22-51-29Z-t06-nodes-transport-8n-8h/standard-result.md), and
[T07 evidence](artifacts/runs/2026-08-01T07-39-29Z-t07-nodes-dedupe-8n-8h/standard-result.md).

## Evidence correction

Eight earlier published runs are retained for auditability but are invalid for their intended test claims:

| Test | Status | What actually ran |
| --- | --- | --- |
| T02 | `INVALID_FOR_INTENDED_SCENARIO` | Normal node behavior; configured jitter and dark-window counters remained zero |
| T03 | `INVALID_FOR_INTENDED_SCENARIO` | Normal transport operation; disconnects occurred only during shutdown |
| T06 | `INVALID_FOR_INTENDED_SCENARIO` | Neither configured node faults nor a mid-run transport outage were observed |
| T07 | `INVALID_FOR_INTENDED_SCENARIO` | Dedupe outage without the configured node jitter/dark-window behavior |
| T08 | `INVALID_FOR_INTENDED_SCENARIO` | Causal-order outage without the configured node jitter/dark-window behavior |
| T09 | `INVALID_FOR_INTENDED_SCENARIO` | Dedupe and causal-order outages; no transport outage |
| T10 | `INVALID_FOR_INTENDED_SCENARIO` | Dedupe and causal-order outages; no transport outage |
| T12 | `INVALID_FOR_INTENDED_SCENARIO` | Dedupe and causal-order outages; neither configured node faults nor a transport outage were observed |

The recorded harness `PASS` verdicts for these earlier runs apply only to the scenarios that actually ran. They do not prove the intended T02, T03, T06, T07, T08, T09, T10, or T12 claims. The original artifacts and tags remain available as retracted evidence. T02, T03, T06, and T07 have since passed corrected second runs with new evidence; T08, T09, T10, and T12 still require corrected runs and new evidence tags.

## Install

Requires Node.js `>=22.13.0`.

```bash
npm ci
```

The lockfile installs the corrected local package candidates:

- `@causal-order/transport` 0.2.2
- `@causal-order/monitor` 0.6.2
- `@causal-order/testing` 0.3.5
- `@causal-order/dedupe` 1.2.1

The archives under `.release-candidates/` are required until these versions are
published to npm.

Run the clean ten-minute smoke test:

```bash
npm test
```

## Running and finalizing evidence

Start a test with its canonical npm command:

```bash
npm run t03
```

The corrected composite-fault runs are launched with:

```bash
npm run t09
npm run t10
npm run t12
```

Each of these commands creates a unique local state directory containing a
disk-backed monitor reservoir and SQLite dedupe identity ledger. The ledger is
bounded to 2,000,000 identities and fails closed at capacity instead of
silently evicting processed identities. For T10 and T12, the 900-second
in-memory dedupe window is retained only as a fast path; correctness does not
assume that the next outage or replay horizon matches an earlier run.

T09 deliberately exercises a dedupe-bypass interval and may therefore finish
with `PASS_WITH_EXPECTED_DEGRADATION`. The durable identity ledger protects
normal and recovered routes through dedupe, but cannot protect identities that
intentionally bypass dedupe.

Qualifying evidence must use the commands as written: eight nodes, eight hours,
and `--time-scale 1`. Shortened or accelerated diagnostics do not qualify.

After the eight-hour run completes, use the exact generated folder name:

```bash
npm run finalize-test -- 2026-07-30T12-00-00Z-t03-transport-outage-8n-8h
```

`finalize-test` verifies the package versions, eight-node/eight-hour
configuration, scenario ID, required fault transitions, node-fault counters,
final verdict, and standardized checks before it writes documentation or
creates a tag. For T09, T10, and T12 it also requires evidence of a disk-backed
monitor reservoir, a configured finite durable identity capacity, and recorded
durable-ledger identities. Existing evidence tags are preserved, so a
corrected rerun uses the next available tag such as `evidence-t03-v2`.

To validate a completed folder without writing documentation, committing,
tagging, or pushing:

```bash
npm run finalize-test -- <run-folder> --verify-only
```

Every run can be converted to the same machine-readable and operator-facing [result format](docs/result-standard.md).

`day-boundary` and `sqlite-recovery-envelope` are not part of the causal-order stack and are not included.
