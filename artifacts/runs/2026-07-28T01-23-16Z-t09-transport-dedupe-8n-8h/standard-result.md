# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T09 |
| Run | T09-transport-dedupe-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28801418 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 563332 |
| Duplicates injected | 1735 |
| Sent | 565067 |
| Transport received | 565067 |
| Dedupe accepted | 563332 |
| Dedupe dropped | 1735 |
| Ordered | 563332 |
| Received rate | 19.619 events/s |
| Duplicate rate | 0.307% |

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
| edge-a | 80971 | 81214 | 81214 | 243 | 256 |
| edge-b | 73234 | 73480 | 73480 | 246 | 256 |
| edge-c | 66308 | 66518 | 66518 | 210 | 255 |
| edge-d | 68564 | 68780 | 68780 | 216 | 251 |
| edge-e | 68840 | 69047 | 69047 | 207 | 249 |
| edge-f | 68441 | 68648 | 68648 | 207 | 249 |
| edge-g | 68604 | 68815 | 68815 | 211 | 254 |
| edge-h | 68370 | 68565 | 68565 | 195 | 252 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":549591,"full_outage_buffer":14888,"replay_through_dedupe":588} |
| Buffered | 15476 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 57 |
| Anomalies | 784 |
| Corrections | 0 |
| Peak RSS | 883.8 MB |
| Peak heap used | 66.8 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-28T01-23-16Z-t09-transport-dedupe-8n-8h\summary.json` at 2026-07-28T10:43:02.212Z.
