# Standard result format

Every harness run is converted to two files in its artifact directory:

- `standard-result.json` for stable machine-readable comparison;
- `standard-result.md` for operator review.

Standardization is post-processing only. It reads harness artifacts and does not call, replace, or alter stack runtime APIs. The harness verdict is copied without reinterpretation.

Generate both for the latest run:

```bash
npm run results
```

Generate them for a specific run and test ID:

```bash
npm run results -- artifacts/runs/<run-folder> --test-id T01
```

The schema identifier is `causal-order-proving/result` and its initial version is `1`.

## Stable sections

| Section | Contents |
| --- | --- |
| `identity` | Test ID, run name, artifact paths, Git commit, package versions |
| `environment` | Node version, platform, architecture |
| `configuration` | Duration, time scale, profile, adapter, monitor scenario, node set |
| `timing` | Start, finish, elapsed time, clock drift, interruption |
| `traffic` | Generated, sent, received, deduped, ordered, rates, accounting deltas |
| `nodes` | Per-node traffic, dependencies, queues, jitter, dark windows, reconnects |
| `transport` | Errors, peer states, fault events, callback boundary |
| `monitor` | Routing, buffering, replay, pending work, health, lifecycle and admission |
| `dedupe` | Decisions, identity sources, cache, window |
| `ordering` | Output, anomalies, confidence, order basis, watermarks |
| `resources` | Peak RSS and heap use |
| `performance` | Throughput plus explicit availability of latency, CPU, and event-loop metrics |
| `shutdown` | Milestones, pending work, drains, callback and resource closure |
| `result` | Harness status, verdict, reasons, failure |
| `checks` | Versioned accounting and final-state checks |

## Interpretation

Checks use:

- `pass` when the invariant is satisfied;
- `review` when the value differs from the invariant.

An accounting check marked `review` does not automatically mean a fault test failed. Buffering, admission refusal, or an explicitly permitted degraded route can change the equality. The harness verdict and scenario contract remain the authority; the standardized deltas make the difference visible and comparable.

Runtime component health and shutdown-final component health are stored separately. This prevents normal transport teardown from being interpreted as a runtime outage.

Metrics not emitted by the installed harness are retained as `null` and listed under `performance.unavailableMetrics`. This keeps the schema stable and makes instrumentation gaps visible instead of silently omitting them.
