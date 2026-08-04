# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T10 |
| Run | T10-transport-order-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28815499 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 563279 |
| Duplicates injected | 1844 |
| Sent | 565123 |
| Transport received | 565123 |
| Dedupe accepted | 563279 |
| Dedupe dropped | 1844 |
| Dedupe bypassed | 0 |
| Ordered | 563279 |
| Received rate | 19.612 events/s |
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
| edge-a | 80963 | 81213 | 81213 | 250 | 2240 |
| edge-b | 73699 | 73944 | 73944 | 245 | 2240 |
| edge-c | 66127 | 66341 | 66341 | 214 | 2240 |
| edge-d | 68524 | 68741 | 68741 | 217 | 2242 |
| edge-e | 68295 | 68547 | 68547 | 252 | 2240 |
| edge-f | 68794 | 69009 | 69009 | 215 | 2238 |
| edge-g | 68393 | 68606 | 68606 | 213 | 2242 |
| edge-h | 68484 | 68722 | 68722 | 238 | 2239 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":550117,"order_buffer_only":12737,"replay_through_dedupe":2269} |
| Buffered | 15006 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2365 |
| Anomalies | 2815 |
| Corrections | 0 |
| Peak RSS | 287.3 MB |
| Peak heap used | 70.1 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-08-03T11-40-28Z-t10-transport-order-8n-8h\summary.json` at 2026-08-04T00:54:08.274Z.
