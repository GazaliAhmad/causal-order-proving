# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T08 |
| Run | T08-nodes-order-8n-8h |
| Verdict | **FAIL_CONTRACT** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28827445 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 551633 |
| Duplicates injected | 1817 |
| Sent | 553450 |
| Transport received | 553450 |
| Dedupe accepted | 551634 |
| Dedupe dropped | 1816 |
| Dedupe bypassed | 0 |
| Ordered | 551634 |
| Received rate | 19.199 events/s |
| Duplicate rate | 0.328% |

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
| OUT-01 | harness verdict | REVIEW | fail_contract | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 81047 | 81343 | 81343 | 296 | 241 |
| edge-b | 61953 | 62157 | 62157 | 204 | 247 |
| edge-c | 66479 | 66720 | 66720 | 241 | 245 |
| edge-d | 68356 | 68578 | 68578 | 222 | 245 |
| edge-e | 68588 | 68804 | 68804 | 216 | 246 |
| edge-f | 68391 | 68598 | 68598 | 207 | 247 |
| edge-g | 68542 | 68757 | 68757 | 215 | 243 |
| edge-h | 68277 | 68493 | 68493 | 216 | 246 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":538078,"order_buffer_only":14748,"replay_through_dedupe":624} |
| Buffered | 15372 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 42 |
| Anomalies | 1084 |
| Corrections | 0 |
| Peak RSS | 852.3 MB |
| Peak heap used | 69.3 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-08-01T16-19-41Z-t08-nodes-order-8n-8h\summary.json` at 2026-08-02T05:02:50.175Z.
