# Causal-order stack proposals

Documentation for suggested improvements and features across the causal-order stack.

Proposals are design inputs only. They do not modify installed packages, introduce local substitute APIs, or authorize the proving repository to emulate missing package behavior.

## Status

Each proposal uses one of these states:

- `proposed`: documented for consideration;
- `accepted`: approved for implementation in the owning package;
- `released`: available through a published package surface; or
- `declined`: intentionally not being pursued.

Only `released` behavior may be used by qualification tests.

## Proposals

| Target | Proposal | Status |
| --- | --- | --- |
| `@causal-order/testing` | [Wall-clock performance observability](testing-wall-clock-observability.md) | Proposed |
| `@causal-order/testing` | [Fault event timeline](testing-fault-event-timeline.md) | Proposed |

## Adding proposals

Each proposal should identify:

- the owning package;
- the problem and operational value;
- proposed public artifacts or behavior;
- compatibility and semantic-versioning impact;
- acceptance criteria;
- explicit non-goals; and
- whether qualification tests are blocked without it.
