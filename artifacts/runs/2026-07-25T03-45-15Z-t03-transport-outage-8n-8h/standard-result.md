# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T03 |
| Run | T03-transport-outage-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28802391 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 564232 |
| Duplicates injected | 1862 |
| Sent | 566094 |
| Transport received | 566094 |
| Dedupe accepted | 564232 |
| Dedupe dropped | 1862 |
| Ordered | 564232 |
| Received rate | 19.654 events/s |
| Duplicate rate | 0.329% |

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
| edge-a | 80999 | 81243 | 81243 | 244 | 268 |
| edge-b | 73711 | 73951 | 73951 | 240 | 267 |
| edge-c | 66183 | 66411 | 66411 | 228 | 265 |
| edge-d | 68657 | 68872 | 68872 | 215 | 266 |
| edge-e | 68661 | 68913 | 68913 | 252 | 266 |
| edge-f | 68640 | 68866 | 68866 | 226 | 268 |
| edge-g | 68892 | 69118 | 69118 | 226 | 269 |
| edge-h | 68489 | 68720 | 68720 | 231 | 259 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":566094} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 11 |
| Anomalies | 733 |
| Corrections | 0 |
| Peak RSS | 830.5 MB |
| Peak heap used | 68.1 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-25T03-45-15Z-t03-transport-outage-8n-8h\summary.json` at 2026-07-25T14:55:16.450Z.
