# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T08 |
| Run | T08-nodes-order-8n-8h |
| Verdict | **INVALID_RUN** |
| Status | failed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28805585 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 546455 |
| Duplicates injected | 1754 |
| Sent | 548182 |
| Transport received | 548209 |
| Dedupe accepted | 546455 |
| Dedupe dropped | 1754 |
| Dedupe bypassed | 0 |
| Ordered | 546455 |
| Received rate | 19.031 events/s |
| Duplicate rate | 0.32% |

## Checks

| ID | Check | Status | Actual | Expected |
| --- | --- | --- | --- | --- |
| ACC-01 | generated + duplicates = sent | REVIEW | -27 | 0 |
| ACC-02 | sent = transport received | REVIEW | 27 | 0 |
| ACC-03 | received = accepted + dropped + bypassed | PASS | 0 | 0 |
| ACC-04 | dedupe accepted + bypassed = ordered | PASS | 0 | 0 |
| FIN-01 | monitor pending rows | PASS | 0 | 0 |
| FIN-02 | monitor pending operations | PASS | 0 | 0 |
| FIN-03 | transport callback boundary | PASS | closed | closed |
| FIN-04 | resources closed | PASS | true | true |
| OUT-01 | harness verdict | REVIEW | invalid_run | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 79774 | 80039 | 80044 | 270 | 271 |
| edge-b | 61072 | 61260 | 61261 | 189 | 271 |
| edge-c | 65354 | 65558 | 65559 | 205 | 268 |
| edge-d | 68246 | 68489 | 68490 | 244 | 272 |
| edge-e | 67690 | 67893 | 67894 | 204 | 267 |
| edge-f | 68258 | 68482 | 68483 | 225 | 272 |
| edge-g | 68119 | 68309 | 68325 | 206 | 273 |
| edge-h | 67942 | 68152 | 68153 | 211 | 270 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":536906,"order_buffer_only":11015,"replay_through_dedupe":288} |
| Buffered | 11303 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 76 |
| Anomalies | 1118 |
| Corrections | 0 |
| Peak RSS | 296.4 MB |
| Peak heap used | 70.8 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | ingress_stopping |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-08-02T06-28-11Z-t08-nodes-order-8n-8h\summary.json` at 2026-08-02T14:36:32.063Z.
