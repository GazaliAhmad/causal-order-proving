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
| Wall elapsed | 28810586 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 551816 |
| Duplicates injected | 1705 |
| Sent | 553521 |
| Transport received | 553521 |
| Dedupe accepted | 551816 |
| Dedupe dropped | 1705 |
| Ordered | 551816 |
| Received rate | 19.212 events/s |
| Duplicate rate | 0.308% |

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
| edge-a | 80691 | 80925 | 80925 | 234 | 2221 |
| edge-b | 61979 | 62189 | 62189 | 210 | 2221 |
| edge-c | 66326 | 66534 | 66534 | 208 | 2216 |
| edge-d | 68618 | 68819 | 68819 | 201 | 2221 |
| edge-e | 68569 | 68777 | 68777 | 208 | 2218 |
| edge-f | 68465 | 68682 | 68682 | 217 | 2220 |
| edge-g | 68380 | 68579 | 68579 | 199 | 2218 |
| edge-h | 68788 | 69016 | 69016 | 228 | 2221 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":553521} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2153 |
| Anomalies | 3343 |
| Corrections | 0 |
| Peak RSS | 571.2 MB |
| Peak heap used | 67 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-31T22-51-29Z-t06-nodes-transport-8n-8h\summary.json` at 2026-08-01T07:30:19.453Z.
