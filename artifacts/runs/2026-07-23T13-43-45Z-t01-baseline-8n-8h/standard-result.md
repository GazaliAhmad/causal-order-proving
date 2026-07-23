# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T01 |
| Run | T01-baseline-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28800956 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 481138 |
| Duplicates injected | 387 |
| Sent | 481525 |
| Transport received | 481525 |
| Dedupe accepted | 481138 |
| Dedupe dropped | 387 |
| Ordered | 481138 |
| Received rate | 16.719 events/s |
| Duplicate rate | 0.08% |

## Checks

| ID | Check | Status | Actual | Expected |
| --- | --- | --- | --- | --- |
| ACC-01 | generated + duplicates = sent | PASS | 0 | 0 |
| ACC-02 | sent = transport received | PASS | 0 | 0 |
| ACC-03 | received = accepted + dropped | PASS | 0 | 0 |
| ACC-04 | dedupe accepted = ordered | PASS | 0 | 0 |
| FIN-01 | monitor pending rows | PASS | 0 | 0 |
| FIN-02 | monitor pending operations | PASS | 0 | 0 |
| FIN-03 | transport callback boundary | PASS | closed | closed |
| FIN-04 | resources closed | PASS | true | true |
| OUT-01 | harness verdict | PASS | pass | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 68163 | 68221 | 68221 | 58 | 10 |
| edge-b | 62313 | 62367 | 62367 | 54 | 15 |
| edge-c | 57141 | 57187 | 57187 | 46 | 14 |
| edge-d | 58601 | 58639 | 58639 | 38 | 11 |
| edge-e | 58628 | 58675 | 58675 | 47 | 13 |
| edge-f | 58603 | 58656 | 58656 | 53 | 12 |
| edge-g | 58800 | 58843 | 58843 | 43 | 16 |
| edge-h | 58889 | 58937 | 58937 | 48 | 12 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":481525} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 4 |
| Anomalies | 13 |
| Corrections | 0 |
| Peak RSS | 716.1 MB |
| Peak heap used | 66.3 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-23T13-43-45Z-t01-baseline-8n-8h\summary.json` at 2026-07-23T22:45:09.606Z.
