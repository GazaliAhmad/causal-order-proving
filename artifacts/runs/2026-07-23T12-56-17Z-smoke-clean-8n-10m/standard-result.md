# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | SMOKE-02 |
| Run | smoke-clean-8n-10m |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 600808 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 10043 |
| Duplicates injected | 5 |
| Sent | 10048 |
| Transport received | 10048 |
| Dedupe accepted | 10043 |
| Dedupe dropped | 5 |
| Ordered | 10043 |
| Received rate | 16.724 events/s |
| Duplicate rate | 0.05% |

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
| edge-a | 1394 | 1396 | 1396 | 2 | 6 |
| edge-b | 1296 | 1296 | 1296 | 0 | 6 |
| edge-c | 1168 | 1170 | 1170 | 2 | 6 |
| edge-d | 1217 | 1217 | 1217 | 0 | 6 |
| edge-e | 1249 | 1249 | 1249 | 0 | 7 |
| edge-f | 1260 | 1261 | 1261 | 1 | 6 |
| edge-g | 1230 | 1230 | 1230 | 0 | 6 |
| edge-h | 1229 | 1229 | 1229 | 0 | 5 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":10048} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 3 |
| Anomalies | 0 |
| Corrections | 0 |
| Peak RSS | 83.3 MB |
| Peak heap used | 20.4 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-23T12-56-17Z-smoke-clean-8n-10m\summary.json` at 2026-07-23T13:19:35.668Z.
