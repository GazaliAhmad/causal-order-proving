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
| Wall elapsed | 28800875 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 564250 |
| Duplicates injected | 1848 |
| Sent | 566098 |
| Transport received | 566098 |
| Dedupe accepted | 564250 |
| Dedupe dropped | 1848 |
| Ordered | 564250 |
| Received rate | 19.656 events/s |
| Duplicate rate | 0.326% |

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
| edge-a | 81576 | 81834 | 81834 | 258 | 255 |
| edge-b | 73160 | 73406 | 73406 | 246 | 260 |
| edge-c | 66213 | 66420 | 66420 | 207 | 259 |
| edge-d | 68561 | 68779 | 68779 | 218 | 259 |
| edge-e | 68472 | 68708 | 68708 | 236 | 260 |
| edge-f | 68413 | 68660 | 68660 | 247 | 259 |
| edge-g | 68705 | 68912 | 68912 | 207 | 254 |
| edge-h | 69150 | 69379 | 69379 | 229 | 251 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":550752,"full_outage_buffer":14760,"replay_through_dedupe":586} |
| Buffered | 15346 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 50 |
| Anomalies | 755 |
| Corrections | 0 |
| Peak RSS | 872.5 MB |
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

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-28T14-28-28Z-t10-transport-order-8n-8h\summary.json` at 2026-07-29T01:37:32.023Z.
