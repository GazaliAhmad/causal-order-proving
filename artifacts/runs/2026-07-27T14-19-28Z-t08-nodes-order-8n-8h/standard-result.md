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
| Wall elapsed | 28800644 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 562609 |
| Duplicates injected | 1814 |
| Sent | 564423 |
| Transport received | 564423 |
| Dedupe accepted | 562609 |
| Dedupe dropped | 1814 |
| Ordered | 562609 |
| Received rate | 19.598 events/s |
| Duplicate rate | 0.321% |

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
| edge-a | 80434 | 80676 | 80676 | 242 | 220 |
| edge-b | 73887 | 74130 | 74130 | 243 | 222 |
| edge-c | 65827 | 66055 | 66055 | 228 | 222 |
| edge-d | 68494 | 68717 | 68717 | 223 | 223 |
| edge-e | 68355 | 68539 | 68539 | 184 | 220 |
| edge-f | 68407 | 68641 | 68641 | 234 | 219 |
| edge-g | 68678 | 68906 | 68906 | 228 | 216 |
| edge-h | 68527 | 68759 | 68759 | 232 | 223 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":549358,"order_buffer_only":14534,"replay_through_dedupe":531} |
| Buffered | 15065 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 70 |
| Anomalies | 751 |
| Corrections | 0 |
| Peak RSS | 861.6 MB |
| Peak heap used | 67.3 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-27T14-19-28Z-t08-nodes-order-8n-8h\summary.json` at 2026-07-27T22:21:58.699Z.
