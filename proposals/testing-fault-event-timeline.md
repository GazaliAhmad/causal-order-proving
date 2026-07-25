# Suggested feature: fault event timeline

| Field | Value |
| --- | --- |
| Target package | `@causal-order/testing` |
| Status | Proposed |
| Suggested release | `0.4.0` |
| API impact on other packages | None |
| Initial verdict impact | None |

## Summary

Add explicit fault event timeline records to `@causal-order/testing` wall-clock runs.

The test-plan requires evidence of "requested versus observed fault windows" for all fault injection tests (T02–T12). The current harness records which faults were requested but does not emit when each fault actually started and ended in monotonic time. This prevents correlating observed recovery behavior to the actual duration and boundaries of injected faults.

A recovery latency measurement is meaningless without knowing precisely when the fault ceased. An eight-hour run can show "system recovered" without proving "system recovered within acceptable time of fault resolution" if the fault's actual end time is not captured.

## Constraints

- Implement the feature inside `@causal-order/testing`.
- Use existing published package contracts and harness-owned observations.
- Do not change APIs in `@causal-order/transport`, `@causal-order/monitor`, `@causal-order/dedupe`, or `causal-order`.
- Do not require consumers to import package internals.
- Add evidence fields without removing or renaming existing fields.
- Preserve existing verdict behavior in the first release.
- Do not reconstruct fault timelines from insufficient or inferred artifacts after a run completes.
- Record actual observed fault boundaries, not just requested parameters.

## Suggested artifacts

Add an optional, versioned fault timeline section to `summary.json`:

```json
{
  "faultEvents": {
    "schema": "causal-order-testing/fault-timeline",
    "version": 1,
    "requested": [
      {
        "faultId": "string",
        "faultType": "string",
        "configuration": {},
        "requestedStartMs": "number or null",
        "requestedDurationMs": "number or null",
        "requestedEndMs": "number or null"
      }
    ],
    "observed": [
      {
        "faultId": "string",
        "faultType": "string",
        "observedStartMs": "number",
        "observedEndMs": "number",
        "observedDurationMs": "number",
        "affectedComponents": ["string"],
        "affectedNodes": ["string"],
        "recoveryStartedMs": "number or null",
        "recoveryCompletedMs": "number or null",
        "recoveryDurationMs": "number or null"
      }
    ]
  }
}
```

Fault types should include:

- `node_jitter` — injected network latency on specified nodes;
- `node_dark` — node becomes unreachable and rejoins;
- `transport_outage` — transport connectivity or delivery becomes unavailable;
- `dedupe_outage` — dedupe component becomes unavailable;
- `order_outage` — causal-order component becomes unavailable;
- `combined` — multiple faults with overlapping windows (for composite scenarios).

The `observed` section must distinguish:

- when the fault actually began affecting the system;
- when the injected fault was lifted or recovered;
- when the system began recovering (if observable);
- when recovery completed or stabilized.

## Collection rules

- Use monotonic elapsed time (same clock as other timing fields).
- Record actual observed start/end, not requested start/end.
- If a fault window requested is not actually enforced, emit null values for observed fields and record the discrepancy.
- For multi-component faults, identify which components were actually affected.
- For node faults, list which nodes were in dark or jittered state.
- Record recovery boundaries only if they are observable and distinct from fault end.
- Preserve partial fault timeline if a run is interrupted or fails.
- Record the wall-clock timestamp when each fault event was observed (ISO format).

## Verdict policy

The first release should be observation-only:

- emit the fault timeline;
- include it in summaries and comparisons;
- do not fail existing tests because of fault timeline anomalies; and
- do not change existing scenario verdicts.

Fault-window gates (e.g., "recovery must complete within X milliseconds of fault end") should be introduced only after retained eight-hour baselines provide defensible thresholds. Any later gate must identify its threshold, sample population, comparison direction, and verdict effect.

## Semantic-versioning recommendation

Release as `@causal-order/testing@0.4.0`.

The feature is additive, but it materially expands the package's operational evidence and artifact contract. A feature release communicates that capability more clearly than a patch release.

If implementation changes an existing verdict or removes or redefines an artifact field, that change requires separate compatibility review.

## Acceptance criteria

- Existing harness commands continue to work unchanged.
- Existing summary fields and verdict meanings remain unchanged.
- Fault injection adapter runs emit the new fault timeline evidence.
- Fault timeline records include wall-clock time, monotonic elapsed time, and fault type.
- Observed fault boundaries remain distinct from requested parameters.
- Every fault event includes affected component and node list.
- Recovery milestones (if observable) are distinct from fault end time.
- Summary and comparison commands render the new fault timeline.
- Package documentation explains collection and interpretation.
- Packed-package validation proves the feature using only published surfaces.

## Non-goals

- Changing another causal-order package API.
- Inferring fault windows from absence of evidence.
- Reinterpreting fault-induced latency as stack latency.
- Defining universal pass/fail recovery-time thresholds in the first release.
- Replacing package-owned benchmarks.
