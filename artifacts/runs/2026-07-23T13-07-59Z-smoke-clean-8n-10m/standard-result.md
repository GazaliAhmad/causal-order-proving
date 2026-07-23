# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | SMOKE-03 |
| Run | smoke-clean-8n-10m |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 600806 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 9992 |
| Duplicates injected | 7 |
| Sent | 9999 |
| Transport received | 9999 |
| Dedupe accepted | 9992 |
| Dedupe dropped | 7 |
| Ordered | 9992 |
| Received rate | 16.643 events/s |
| Duplicate rate | 0.07% |

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
| edge-a | 1413 | 1415 | 1415 | 2 | 7 |
| edge-b | 1288 | 1288 | 1288 | 0 | 6 |
| edge-c | 1158 | 1158 | 1158 | 0 | 6 |
| edge-d | 1251 | 1252 | 1252 | 1 | 7 |
| edge-e | 1195 | 1195 | 1195 | 0 | 6 |
| edge-f | 1224 | 1225 | 1225 | 1 | 7 |
| edge-g | 1209 | 1210 | 1210 | 1 | 6 |
| edge-h | 1254 | 1256 | 1256 | 2 | 7 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":9999} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 3 |
| Anomalies | 0 |
| Corrections | 0 |
| Peak RSS | 113.8 MB |
| Peak heap used | 28.6 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-23T13-07-59Z-smoke-clean-8n-10m\summary.json` at 2026-07-23T13:18:34.796Z.
