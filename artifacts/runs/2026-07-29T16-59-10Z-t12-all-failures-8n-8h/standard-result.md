# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T12 |
| Run | T12-all-failures-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28801699 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 562871 |
| Duplicates injected | 1782 |
| Sent | 564653 |
| Transport received | 564653 |
| Dedupe accepted | 562871 |
| Dedupe dropped | 1782 |
| Ordered | 562871 |
| Received rate | 19.605 events/s |
| Duplicate rate | 0.316% |

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
| edge-a | 80634 | 80885 | 80885 | 251 | 250 |
| edge-b | 73257 | 73488 | 73488 | 231 | 250 |
| edge-c | 66045 | 66268 | 66268 | 223 | 245 |
| edge-d | 68891 | 69100 | 69100 | 209 | 246 |
| edge-e | 68438 | 68660 | 68660 | 222 | 252 |
| edge-f | 68403 | 68622 | 68622 | 219 | 252 |
| edge-g | 68549 | 68758 | 68758 | 209 | 251 |
| edge-h | 68654 | 68872 | 68872 | 218 | 251 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":549143,"full_outage_buffer":14881,"replay_through_dedupe":629} |
| Buffered | 15510 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 56 |
| Anomalies | 770 |
| Corrections | 0 |
| Peak RSS | 864 MB |
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

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-29T16-59-10Z-t12-all-failures-8n-8h\summary.json` at 2026-07-30T01:05:42.740Z.
