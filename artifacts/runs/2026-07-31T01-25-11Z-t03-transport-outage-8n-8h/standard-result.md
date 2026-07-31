# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T03 |
| Run | T03-transport-outage-8n-8h |
| Verdict | **INVALID_RUN** |
| Status | failed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28801055 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 564335 |
| Duplicates injected | 1760 |
| Sent | 565903 |
| Transport received | 565903 |
| Dedupe accepted | 564143 |
| Dedupe dropped | 1760 |
| Ordered | 564143 |
| Received rate | 19.649 events/s |
| Duplicate rate | 0.311% |

## Checks

| ID | Check | Status | Actual | Expected |
| --- | --- | --- | --- | --- |
| ACC-01 | generated + duplicates = sent | REVIEW | -192 | 0 |
| ACC-02 | sent = transport received | PASS | 0 | 0 |
| ACC-03 | received = accepted + dropped | PASS | 0 | 0 |
| ACC-04 | dedupe accepted = ordered | PASS | 0 | 0 |
| FIN-01 | monitor pending rows | PASS | 0 | 0 |
| FIN-02 | monitor pending operations | PASS | 0 | 0 |
| FIN-03 | transport callback boundary | PASS | closed | closed |
| FIN-04 | resources closed | PASS | true | true |
| OUT-01 | harness verdict | REVIEW | invalid_run | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 81004 | 81041 | 81041 | 229 | 2220 |
| edge-b | 73743 | 73974 | 73974 | 231 | 2220 |
| edge-c | 66039 | 66261 | 66261 | 222 | 2222 |
| edge-d | 68644 | 68855 | 68855 | 211 | 2224 |
| edge-e | 68734 | 68970 | 68970 | 236 | 2218 |
| edge-f | 69018 | 69239 | 69239 | 221 | 2218 |
| edge-g | 68680 | 68887 | 68887 | 207 | 2223 |
| edge-h | 68473 | 68676 | 68676 | 203 | 2221 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":565903} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2005 |
| Anomalies | 2756 |
| Corrections | 0 |
| Peak RSS | 879 MB |
| Peak heap used | 92.7 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | ingress_stopping |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-31T01-25-11Z-t03-transport-outage-8n-8h\summary.json` at 2026-07-31T10:31:41.132Z.
