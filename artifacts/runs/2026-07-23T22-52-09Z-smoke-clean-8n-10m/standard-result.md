# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | SMOKE-04 |
| Run | smoke-clean-8n-10m |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 600987 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 9985 |
| Duplicates injected | 3 |
| Sent | 9988 |
| Transport received | 9988 |
| Dedupe accepted | 9985 |
| Dedupe dropped | 3 |
| Ordered | 9985 |
| Received rate | 16.619 events/s |
| Duplicate rate | 0.03% |

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
| edge-a | 1441 | 1441 | 1441 | 0 | 7 |
| edge-b | 1298 | 1299 | 1299 | 1 | 7 |
| edge-c | 1164 | 1164 | 1164 | 0 | 6 |
| edge-d | 1229 | 1230 | 1230 | 1 | 6 |
| edge-e | 1228 | 1228 | 1228 | 0 | 6 |
| edge-f | 1224 | 1225 | 1225 | 1 | 7 |
| edge-g | 1188 | 1188 | 1188 | 0 | 6 |
| edge-h | 1213 | 1213 | 1213 | 0 | 7 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":9988} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2 |
| Anomalies | 0 |
| Corrections | 0 |
| Peak RSS | 112.6 MB |
| Peak heap used | 24.7 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-23T22-52-09Z-smoke-clean-8n-10m\summary.json` at 2026-07-23T23:02:10.698Z.
