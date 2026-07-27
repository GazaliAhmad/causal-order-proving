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
        "recoveryDurationMs": "number or null",
        "degradation": {
          "schema": "causal-order-testing/dedupe-degradation",
          "version": 1,
          "dedupeUnhealthyDetectedMs": "number or null",
          "dedupeHealthyObservedMs": "number or null",
          "normalDedupeRoutingResumedMs": "number or null",
          "routingIntervals": [
            {
              "route": "normal_dedupe | permitted_bypass | buffered | rejected",
              "startMs": "number",
              "endMs": "number",
              "reason": "string"
            }
          ],
          "traffic": {
            "accepted": "number",
            "normalDedupeRouted": "number",
            "permittedBypassRouted": "number",
            "buffered": "number",
            "rejected": "number"
          },
          "dedupeDecisionsByReason": {},
          "duplicateLeakage": "number or null",
          "replayCompletedMs": "number or null"
        }
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

For `dedupe_outage` faults, the optional `degradation` object records the
observable effect on accepted traffic. `recoveryCompletedMs` must not be set
solely because the dependency became healthy: normal dedupe routing must have
resumed and any affected buffered or bypassed work must be reconciled. The
object is absent when the harness cannot observe the required routing or
decision evidence; it must not be populated from inferred internal state.

## Collection rules

- Use monotonic elapsed time (same clock as other timing fields).
- Record actual observed start/end, not requested start/end.
- If a fault window requested is not actually enforced, emit null values for observed fields and record the discrepancy.
- For multi-component faults, identify which components were actually affected.
- For node faults, list which nodes were in dark or jittered state.
- Record recovery boundaries only if they are observable and distinct from fault end.
- Preserve partial fault timeline if a run is interrupted or fails.
- Record the wall-clock timestamp when each fault event was observed (ISO format).
- For `dedupe_outage`, record the time dedupe unhealthy was detected, the time
  healthy status was observed again, and the time normal dedupe routing
  resumed; do not treat these as interchangeable milestones.
- For each dedupe routing interval, count accepted traffic by outcome:
  normal-dedupe routed, permitted bypass, buffered, or rejected. The interval
  totals must reconcile with the fault event's accepted-traffic total.
- Attribute dedupe decisions and duplicate leakage by the harness-observed
  reason. Do not report a zero duplicate-leakage value when that metric was
  unavailable; emit `null` and list it as unavailable instead.
- Record a permitted bypass only when the active scenario explicitly allows
  one. Record its reason and exact start/end boundaries.
- Record replay completion separately from dependency health restoration and
  normal-route resumption.

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
- Dedupe-outage runs distinguish unhealthy detection, dependency health
  restoration, normal-route resumption, and replay completion.
- Dedupe-outage traffic reconciles accepted events across normal routing,
  permitted bypass, buffering, and rejection; unavailable metrics are explicit.
- Dedupe-outage runs expose duplicate leakage and decision reasons without
  inferring values from package internals.
- Summary and comparison commands render the new fault timeline.
- Package documentation explains collection and interpretation.
- Packed-package validation proves the feature using only published surfaces.

## Non-goals

- Changing another causal-order package API.
- Inferring fault windows from absence of evidence.
- Reinterpreting fault-induced latency as stack latency.
- Defining universal pass/fail recovery-time thresholds in the first release.
- Replacing package-owned benchmarks.
