# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T08 |
| Run | T08-nodes-order-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28805549 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 550135 |
| Duplicates injected | 1798 |
| Sent | 551933 |
| Transport received | 551933 |
| Dedupe accepted | 550135 |
| Dedupe dropped | 1798 |
| Dedupe bypassed | 0 |
| Ordered | 550135 |
| Received rate | 19.161 events/s |
| Duplicate rate | 0.326% |

## Checks

| ID | Check | Status | Actual | Expected |
| --- | --- | --- | --- | --- |
| ACC-01 | generated + duplicates = sent | PASS | 0 | 0 |
| ACC-02 | sent = transport received | PASS | 0 | 0 |
| ACC-03 | received = accepted + dropped + bypassed | PASS | 0 | 0 |
| ACC-04 | dedupe accepted + bypassed = ordered | PASS | 0 | 0 |
| FIN-01 | monitor pending rows | PASS | 0 | 0 |
| FIN-02 | monitor pending operations | PASS | 0 | 0 |
| FIN-03 | transport callback boundary | PASS | closed | closed |
| FIN-04 | resources closed | PASS | true | true |
| OUT-01 | harness verdict | PASS | pass | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 80526 | 80795 | 80795 | 269 | 271 |
| edge-b | 61845 | 62040 | 62040 | 195 | 268 |
| edge-c | 65890 | 66088 | 66088 | 198 | 269 |
| edge-d | 68166 | 68397 | 68397 | 231 | 270 |
| edge-e | 68037 | 68278 | 68278 | 241 | 272 |
| edge-f | 68799 | 69021 | 69021 | 222 | 273 |
| edge-g | 68426 | 68648 | 68648 | 222 | 274 |
| edge-h | 68446 | 68666 | 68666 | 220 | 263 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":539254,"order_buffer_only":12031,"replay_through_dedupe":648} |
| Buffered | 12679 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2648 |
| Anomalies | 1068 |
| Corrections | 0 |
| Peak RSS | 305 MB |
| Peak heap used | 69.8 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-08-02T15-37-18Z-t08-nodes-order-8n-8h\summary.json` at 2026-08-03T01:05:11.176Z.
