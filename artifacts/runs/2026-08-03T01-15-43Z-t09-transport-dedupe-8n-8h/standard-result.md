# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T09 |
| Run | T09-transport-dedupe-8n-8h |
| Verdict | **PASS_WITH_EXPECTED_DEGRADATION** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28801032 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 562987 |
| Duplicates injected | 1880 |
| Sent | 564867 |
| Transport received | 564867 |
| Dedupe accepted | 550258 |
| Dedupe dropped | 1833 |
| Dedupe bypassed | 12776 |
| Ordered | 563034 |
| Received rate | 19.613 events/s |
| Duplicate rate | 0.325% |

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
| OUT-01 | harness verdict | PASS | pass_with_expected_degradation | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 80820 | 81109 | 81109 | 289 | 2230 |
| edge-b | 73339 | 73592 | 73592 | 253 | 2234 |
| edge-c | 66112 | 66336 | 66336 | 224 | 2235 |
| edge-d | 68807 | 69041 | 69041 | 234 | 2233 |
| edge-e | 68376 | 68596 | 68596 | 220 | 2233 |
| edge-f | 68528 | 68757 | 68757 | 229 | 2232 |
| edge-g | 68459 | 68679 | 68679 | 220 | 2232 |
| edge-h | 68546 | 68757 | 68757 | 211 | 2234 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":552091,"dedupe_bypass_throttled":12776} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2235 |
| Anomalies | 2855 |
| Corrections | 0 |
| Peak RSS | 319.8 MB |
| Peak heap used | 82.1 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-08-03T01-15-43Z-t09-transport-dedupe-8n-8h\summary.json` at 2026-08-03T11:01:53.073Z.
