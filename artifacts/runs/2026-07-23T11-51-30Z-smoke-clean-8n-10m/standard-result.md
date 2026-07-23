# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | SMOKE-01 |
| Run | smoke-clean-8n-10m |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 601042 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 9926 |
| Duplicates injected | 9 |
| Sent | 9935 |
| Transport received | 9935 |
| Dedupe accepted | 9926 |
| Dedupe dropped | 9 |
| Ordered | 9926 |
| Received rate | 16.53 events/s |
| Duplicate rate | 0.091% |

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
| edge-a | 1431 | 1433 | 1433 | 2 | 6 |
| edge-b | 1286 | 1287 | 1287 | 1 | 6 |
| edge-c | 1182 | 1183 | 1183 | 1 | 7 |
| edge-d | 1213 | 1215 | 1215 | 2 | 7 |
| edge-e | 1219 | 1220 | 1220 | 1 | 6 |
| edge-f | 1232 | 1232 | 1232 | 0 | 6 |
| edge-g | 1209 | 1209 | 1209 | 0 | 6 |
| edge-h | 1154 | 1156 | 1156 | 2 | 6 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":9935} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2 |
| Anomalies | 0 |
| Corrections | 0 |
| Peak RSS | 110.6 MB |
| Peak heap used | 25.7 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-23T11-51-30Z-smoke-clean-8n-10m\summary.json` at 2026-07-23T12:25:12.319Z.
