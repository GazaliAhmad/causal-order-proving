# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T02 |
| Run | T02-jitter-dark-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28811842 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 551416 |
| Duplicates injected | 1721 |
| Sent | 553137 |
| Transport received | 553137 |
| Dedupe accepted | 551416 |
| Dedupe dropped | 1721 |
| Ordered | 551416 |
| Received rate | 19.198 events/s |
| Duplicate rate | 0.311% |

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
| edge-a | 80729 | 80978 | 80978 | 249 | 270 |
| edge-b | 61777 | 61988 | 61988 | 211 | 240 |
| edge-c | 66362 | 66567 | 66567 | 205 | 270 |
| edge-d | 68617 | 68821 | 68821 | 204 | 271 |
| edge-e | 68560 | 68799 | 68799 | 239 | 272 |
| edge-f | 68695 | 68893 | 68893 | 198 | 268 |
| edge-g | 68292 | 68485 | 68485 | 193 | 268 |
| edge-h | 68384 | 68606 | 68606 | 222 | 268 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":553137} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 51 |
| Anomalies | 1129 |
| Corrections | 0 |
| Peak RSS | 805.1 MB |
| Peak heap used | 68.5 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-30T13-01-39Z-t02-jitter-dark-8n-8h\summary.json` at 2026-07-30T23:11:07.322Z.
