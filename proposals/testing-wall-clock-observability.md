# Suggested feature: wall-clock performance observability

| Field | Value |
| --- | --- |
| Target package | `@causal-order/testing` |
| Status | Proposed |
| Suggested release | `0.4.0` |
| API impact on other packages | None |
| Initial verdict impact | None |

## Summary

Add performance and responsiveness evidence to `@causal-order/testing` wall-clock runs.

The current harness provides strong correctness, routing, recovery, drain, and resource evidence. It does not currently emit transport acknowledgment latency, end-to-end ordering latency, CPU utilization, or event-loop delay. An eight-hour run can therefore remain correct while gradually becoming slower or less responsive without making that degradation easy to identify.

These metrics are not required for correctness qualification. They are needed for a defensible performance and soak baseline.

For fault runs, whole-run percentiles can conceal a brief but consequential
degraded route. In particular, a dedupe outage may preserve correctness while
changing latency, backlog growth, or the route taken by accepted work. The
harness must therefore make fault-phase performance separable from healthy
operation when it has observed the relevant fault and routing boundaries.

## Constraints

- Implement the feature inside `@causal-order/testing`.
- Use existing published package contracts and harness-owned observations.
- Do not change APIs in `@causal-order/transport`, `@causal-order/monitor`, `@causal-order/dedupe`, or `causal-order`.
- Do not require consumers to import package internals.
- Add evidence fields without removing or renaming existing fields.
- Preserve existing verdict behavior in the first release.
- Do not reconstruct these metrics after a run from insufficient artifacts.
- Do not add local substitutes or instrumentation shortcuts in `causal-order-proving`.

## Suggested metrics

### Transport acknowledgment latency

Measure elapsed monotonic time from a harness adapter send being accepted for delivery until its published acknowledgment promise settles.

Report:

- count;
- p50;
- p95;
- p99;
- maximum;
- timeout count; and
- refusal or failure count.

Successful acknowledgments and unsuccessful outcomes should not be combined into one latency distribution.

### End-to-end ordering latency

Correlate harness-generated event IDs with the corresponding ordered output.

Report:

- generation-to-order p50, p95, p99, and maximum;
- transport-receipt-to-order p50, p95, p99, and maximum;
- count of events included in each distribution; and
- count of events without a terminal ordering observation.

Generation-to-order and receipt-to-order must remain separate so upstream delivery time is not confused with downstream processing time.

### Event-loop delay

Measure harness runtime event-loop delay using a monotonic Node.js facility.

Report:

- p50;
- p95;
- p99;
- maximum; and
- measurement resolution.

If the harness owns multiple relevant processes, identify the process for each measurement rather than merging unrelated event loops.

### CPU utilization

Sample process CPU use over wall time.

Report:

- average utilization;
- p95 utilization;
- peak utilization;
- user and system CPU time;
- sampling interval; and
- process identity.

The artifact must document whether utilization is normalized to one logical CPU or the host's total logical CPU capacity.

### Ordering and backlog lag

Record the difference between accepted work and terminal ordered work over time.

Report:

- current and peak event-count lag;
- current and peak watermark lag;
- duration above zero lag;
- duration above configured warning levels; and
- final lag after drain.

Monitor pending rows, ordering lag, and transport in-flight work must remain separate measures.

### Fault-phase and dedupe-route segmentation

For a run with observed fault events, report performance distributions and
traffic counts separately for each observed fault phase rather than relying
only on whole-run values. For `dedupe_outage`, partition accepted events by
the observed route:

- normal dedupe routing;
- permitted bypass;
- buffering pending dedupe recovery; and
- rejection.

For every available phase/route partition, report event count,
generation-to-order and receipt-to-order latency distributions, unresolved
terminal-order observations, and peak ordering lag. Identify the associated
fault ID and use the actual observed boundaries from the fault timeline; do
not derive a phase from requested fault parameters.

Partitions are supplemental: aggregate distributions remain the primary
whole-run result. A missing routing observation must be represented as
unavailable, not classified as normal routing.

### Existing resource metrics

Retain the existing RSS and heap measurements and standardize:

- initial, final, and peak RSS;
- initial, final, and peak heap use;
- change over the run;
- sampling interval; and
- process identity.

## Suggested artifacts

Add a time-series artifact:

```text
performance.ndjson
```

Each record should include:

- wall and simulated elapsed time;
- process identity;
- CPU sample;
- RSS and heap;
- event-loop delay;
- transport in-flight work;
- monitor pending work;
- ordering lag; and
- active observed fault IDs and phase;
- observed dedupe route, when available; and
- cumulative latency distribution counts.

Add an optional, versioned performance section to `summary.json`:

```json
{
  "performance": {
    "schema": "causal-order-testing/performance-summary",
    "version": 1,
    "transportAcknowledgmentLatencyMs": {
      "count": 0,
      "p50": null,
      "p95": null,
      "p99": null,
      "max": null,
      "timeouts": 0,
      "failures": 0
    },
    "generationToOrderLatencyMs": {
      "count": 0,
      "p50": null,
      "p95": null,
      "p99": null,
      "max": null,
      "unresolved": 0
    },
    "receiptToOrderLatencyMs": {
      "count": 0,
      "p50": null,
      "p95": null,
      "p99": null,
      "max": null,
      "unresolved": 0
    },
    "eventLoopDelayMs": {
      "p50": null,
      "p95": null,
      "p99": null,
      "max": null,
      "resolution": null
    },
    "cpu": {
      "averagePercent": null,
      "p95Percent": null,
      "peakPercent": null,
      "userTimeMs": null,
      "systemTimeMs": null,
      "normalization": null
    },
    "orderingLag": {
      "finalEvents": 0,
      "peakEvents": 0,
      "finalWatermarkMs": null,
      "peakWatermarkMs": null
    },
    "faultPhaseBreakdown": [
      {
        "faultId": "string",
        "phase": "pre_fault | active_fault | recovery | post_recovery",
        "dedupeRoute": "normal_dedupe | permitted_bypass | buffered | rejected | null",
        "eventCount": 0,
        "generationToOrderLatencyMs": {
          "count": 0,
          "p50": null,
          "p95": null,
          "p99": null,
          "max": null,
          "unresolved": 0
        },
        "receiptToOrderLatencyMs": {
          "count": 0,
          "p50": null,
          "p95": null,
          "p99": null,
          "max": null,
          "unresolved": 0
        },
        "peakOrderingLagEvents": null
      }
    ],
    "memory": {
      "initialRssBytes": null,
      "finalRssBytes": null,
      "peakRssBytes": null,
      "initialHeapUsedBytes": null,
      "finalHeapUsedBytes": null,
      "peakHeapUsedBytes": null
    }
  }
}
```

Exact field names remain the owning package's decision. The important contract is that units, sample populations, clock source, and missing values are unambiguous.

## Collection rules

- Use monotonic elapsed time for latency and duration calculations.
- Continue recording ISO timestamps for operator correlation.
- Never use wall-clock adjustments to produce negative latency.
- Bound memory use for percentile calculation.
- Record the number of samples behind every distribution.
- Use `null`, not zero, when a metric is unavailable.
- Preserve partial performance evidence when a run fails or is interrupted.
- Capture final metrics only after the harness's existing drain barriers.
- Derive fault phases only from observed fault-timeline boundaries. If those
  boundaries are unavailable, retain aggregate performance metrics and mark
  phase segmentation unavailable.
- For `dedupe_outage`, assign an event to a route only when the harness
  observed that route. Do not infer normal routing from the absence of bypass
  evidence.
- Keep permitted-bypass, buffered, rejected, and normal-dedupe samples
  separate; never merge their latency distributions.

## Verdict policy

The first release should be observation-only:

- emit the metrics;
- include them in summaries and comparisons;
- do not fail existing tests because of performance values; and
- do not change existing scenario verdicts.

Performance gates should be introduced only after retained eight-hour baselines provide defensible thresholds. Any later gate must identify its threshold, sample population, comparison direction, and verdict effect.

## Semantic-versioning recommendation

Release as `@causal-order/testing@0.4.0`.

The feature is additive, but it materially expands the package's operational evidence and artifact contract. A feature release communicates that capability more clearly than a patch release.

If implementation changes an existing verdict or removes or redefines an artifact field, that change requires separate compatibility review.

## Acceptance criteria

- Existing harness commands continue to work unchanged.
- Existing summary fields and verdict meanings remain unchanged.
- Wall-clock adapter runs emit the new time-series and summary evidence.
- Every distribution includes units, sample count, and population definition.
- Runtime metrics remain distinct from shutdown behavior.
- Fault runs with observed timeline boundaries render aggregate and
  fault-phase performance separately.
- Dedupe-outage runs with observed routing evidence render separate
  performance and ordering-lag populations for each route.
- Missing fault-phase or dedupe-route observations are explicit and are never
  represented as healthy normal-routing samples.
- Interrupted and failed runs retain partial measurements.
- Summary and comparison commands render the new metrics.
- Package documentation explains collection and interpretation.
- Packed-package validation proves the feature using only published surfaces.

## Non-goals

- Changing another causal-order package API.
- Adding production monitoring to application runtimes.
- Replacing package-owned benchmarks.
- Defining universal pass/fail performance thresholds.
- Reinterpreting correctness failures as performance failures.
- Implementing missing harness behavior inside this proving repository.
- Inferring fault phases or dedupe routes from absent observations.
