# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T03 |
| Run | T03-transport-outage-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28800690 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 562529 |
| Duplicates injected | 1765 |
| Sent | 564294 |
| Transport received | 564294 |
| Dedupe accepted | 562529 |
| Dedupe dropped | 1765 |
| Ordered | 562529 |
| Received rate | 19.593 events/s |
| Duplicate rate | 0.313% |

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
| edge-a | 80899 | 81168 | 81168 | 269 | 2275 |
| edge-b | 73677 | 73916 | 73916 | 239 | 2277 |
| edge-c | 65829 | 66031 | 66031 | 202 | 2277 |
| edge-d | 68564 | 68778 | 68778 | 214 | 2277 |
| edge-e | 68504 | 68700 | 68700 | 196 | 2276 |
| edge-f | 68268 | 68488 | 68488 | 220 | 2275 |
| edge-g | 68481 | 68702 | 68702 | 221 | 2278 |
| edge-h | 68307 | 68511 | 68511 | 204 | 2278 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":564294} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2277 |
| Anomalies | 2893 |
| Corrections | 0 |
| Peak RSS | 575.3 MB |
| Peak heap used | 67.2 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-31T11-07-07Z-t03-transport-outage-8n-8h\summary.json` at 2026-07-31T22:39:39.233Z.
