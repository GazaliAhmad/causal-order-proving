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
| Wall elapsed | 600896 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 9927 |
| Duplicates injected | 4 |
| Sent | 9931 |
| Transport received | 9931 |
| Dedupe accepted | 9927 |
| Dedupe dropped | 4 |
| Dedupe bypassed | 0 |
| Ordered | 9927 |
| Received rate | 16.527 events/s |
| Duplicate rate | 0.04% |

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
| edge-a | 1354 | 1355 | 1355 | 1 | 7 |
| edge-b | 1281 | 1281 | 1281 | 0 | 7 |
| edge-c | 1188 | 1189 | 1189 | 1 | 7 |
| edge-d | 1190 | 1191 | 1191 | 1 | 6 |
| edge-e | 1222 | 1222 | 1222 | 0 | 7 |
| edge-f | 1214 | 1214 | 1214 | 0 | 8 |
| edge-g | 1244 | 1245 | 1245 | 1 | 7 |
| edge-h | 1234 | 1234 | 1234 | 0 | 7 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":9931} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 8 |
| Anomalies | 0 |
| Corrections | 0 |
| Peak RSS | 90.3 MB |
| Peak heap used | 24.4 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-08-03T11-19-11Z-smoke-clean-8n-10m\summary.json` at 2026-08-03T11:29:12.206Z.
