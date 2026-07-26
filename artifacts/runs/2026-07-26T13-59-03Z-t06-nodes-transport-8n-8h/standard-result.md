# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T06 |
| Run | T06-nodes-transport-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28810030 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 563478 |
| Duplicates injected | 1822 |
| Sent | 565300 |
| Transport received | 565300 |
| Dedupe accepted | 563478 |
| Dedupe dropped | 1822 |
| Ordered | 563478 |
| Received rate | 19.622 events/s |
| Duplicate rate | 0.322% |

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
| edge-a | 80967 | 81226 | 81226 | 259 | 244 |
| edge-b | 73544 | 73784 | 73784 | 240 | 243 |
| edge-c | 66241 | 66455 | 66455 | 214 | 245 |
| edge-d | 68556 | 68769 | 68769 | 213 | 244 |
| edge-e | 68407 | 68634 | 68634 | 227 | 246 |
| edge-f | 68641 | 68839 | 68839 | 198 | 243 |
| edge-g | 68501 | 68731 | 68731 | 230 | 245 |
| edge-h | 68621 | 68862 | 68862 | 241 | 242 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":565300} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 11 |
| Anomalies | 745 |
| Corrections | 0 |
| Peak RSS | 854.4 MB |
| Peak heap used | 66.6 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-26T13-59-03Z-t06-nodes-transport-8n-8h\summary.json` at 2026-07-26T22:47:59.755Z.
