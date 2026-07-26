# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T05 |
| Run | T05-order-outage-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28806636 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 563943 |
| Duplicates injected | 1731 |
| Sent | 565674 |
| Transport received | 565674 |
| Dedupe accepted | 563943 |
| Dedupe dropped | 1731 |
| Ordered | 563943 |
| Received rate | 19.637 events/s |
| Duplicate rate | 0.306% |

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
| edge-a | 80998 | 81266 | 81266 | 268 | 247 |
| edge-b | 73208 | 73417 | 73417 | 209 | 237 |
| edge-c | 66168 | 66344 | 66344 | 176 | 242 |
| edge-d | 68530 | 68747 | 68747 | 217 | 246 |
| edge-e | 68618 | 68858 | 68858 | 240 | 239 |
| edge-f | 68975 | 69189 | 69189 | 214 | 245 |
| edge-g | 68713 | 68920 | 68920 | 207 | 240 |
| edge-h | 68733 | 68933 | 68933 | 200 | 247 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":550531,"order_buffer_only":14571,"replay_through_dedupe":572} |
| Buffered | 15143 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 102 |
| Anomalies | 787 |
| Corrections | 0 |
| Peak RSS | 626.7 MB |
| Peak heap used | 68.9 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-26T01-34-49Z-t05-order-outage-8n-8h\summary.json` at 2026-07-26T10:27:36.719Z.
