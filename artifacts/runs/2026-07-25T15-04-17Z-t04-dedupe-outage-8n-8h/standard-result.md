# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T04 |
| Run | T04-dedupe-outage-8n-8h |
| Verdict | **PASS_WITH_EXPECTED_DEGRADATION** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28814644 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 564210 |
| Duplicates injected | 1785 |
| Sent | 565995 |
| Transport received | 565995 |
| Dedupe accepted | 549154 |
| Dedupe dropped | 1730 |
| Ordered | 564265 |
| Received rate | 19.643 events/s |
| Duplicate rate | 0.306% |

## Checks

| ID | Check | Status | Actual | Expected |
| --- | --- | --- | --- | --- |
| ACC-01 | generated + duplicates = sent | PASS | 0 | 0 |
| ACC-02 | sent = transport received | PASS | 0 | 0 |
| ACC-03 | received = accepted + dropped | REVIEW | 15111 | 0 |
| ACC-04 | dedupe accepted = ordered | REVIEW | -15111 | 0 |
| FIN-01 | monitor pending rows | PASS | 0 | 0 |
| FIN-02 | monitor pending operations | PASS | 0 | 0 |
| FIN-03 | transport callback boundary | PASS | closed | closed |
| FIN-04 | resources closed | PASS | true | true |
| OUT-01 | harness verdict | PASS | pass_with_expected_degradation | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 81052 | 81310 | 81310 | 258 | 242 |
| edge-b | 73653 | 73895 | 73895 | 242 | 238 |
| edge-c | 66178 | 66361 | 66361 | 183 | 239 |
| edge-d | 68581 | 68805 | 68805 | 224 | 238 |
| edge-e | 68608 | 68824 | 68824 | 216 | 241 |
| edge-f | 68731 | 68954 | 68954 | 223 | 241 |
| edge-g | 68735 | 68975 | 68975 | 240 | 240 |
| edge-h | 68672 | 68871 | 68871 | 199 | 239 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":550884,"dedupe_bypass_throttled":15111} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 10 |
| Anomalies | 843 |
| Corrections | 0 |
| Peak RSS | 557.7 MB |
| Peak heap used | 67.5 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-25T15-04-17Z-t04-dedupe-outage-8n-8h\summary.json` at 2026-07-26T01:28:37.680Z.
