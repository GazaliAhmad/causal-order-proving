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
| Wall elapsed | 600666 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 10073 |
| Duplicates injected | 11 |
| Sent | 10084 |
| Transport received | 10084 |
| Dedupe accepted | 10073 |
| Dedupe dropped | 11 |
| Ordered | 10073 |
| Received rate | 16.788 events/s |
| Duplicate rate | 0.109% |

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
| edge-a | 1486 | 1487 | 1487 | 1 | 7 |
| edge-b | 1331 | 1333 | 1333 | 2 | 9 |
| edge-c | 1194 | 1195 | 1195 | 1 | 6 |
| edge-d | 1241 | 1242 | 1242 | 1 | 9 |
| edge-e | 1244 | 1244 | 1244 | 0 | 7 |
| edge-f | 1205 | 1207 | 1207 | 2 | 7 |
| edge-g | 1177 | 1178 | 1178 | 1 | 7 |
| edge-h | 1195 | 1198 | 1198 | 3 | 8 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":10084} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 3 |
| Anomalies | 0 |
| Corrections | 0 |
| Peak RSS | 115.1 MB |
| Peak heap used | 23.2 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-26T13-21-14Z-smoke-clean-8n-10m\summary.json` at 2026-07-26T13:31:15.493Z.
