# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T07 |
| Run | T07-nodes-dedupe-8n-8h |
| Verdict | **PASS_WITH_EXPECTED_DEGRADATION** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28813277 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 562673 |
| Duplicates injected | 1825 |
| Sent | 564498 |
| Transport received | 564498 |
| Dedupe accepted | 547640 |
| Dedupe dropped | 1765 |
| Ordered | 562733 |
| Received rate | 19.592 events/s |
| Duplicate rate | 0.313% |

## Checks

| ID | Check | Status | Actual | Expected |
| --- | --- | --- | --- | --- |
| ACC-01 | generated + duplicates = sent | PASS | 0 | 0 |
| ACC-02 | sent = transport received | PASS | 0 | 0 |
| ACC-03 | received = accepted + dropped | REVIEW | 15093 | 0 |
| ACC-04 | dedupe accepted = ordered | REVIEW | -15093 | 0 |
| FIN-01 | monitor pending rows | PASS | 0 | 0 |
| FIN-02 | monitor pending operations | PASS | 0 | 0 |
| FIN-03 | transport callback boundary | PASS | closed | closed |
| FIN-04 | resources closed | PASS | true | true |
| OUT-01 | harness verdict | PASS | pass_with_expected_degradation | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 81217 | 81460 | 81460 | 243 | 224 |
| edge-b | 73218 | 73477 | 73477 | 259 | 221 |
| edge-c | 66096 | 66322 | 66322 | 226 | 222 |
| edge-d | 68275 | 68482 | 68482 | 207 | 223 |
| edge-e | 68173 | 68377 | 68377 | 204 | 222 |
| edge-f | 68500 | 68736 | 68736 | 236 | 223 |
| edge-g | 68721 | 68958 | 68958 | 237 | 223 |
| edge-h | 68473 | 68686 | 68686 | 213 | 222 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":549405,"dedupe_bypass_throttled":15093} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 10 |
| Anomalies | 838 |
| Corrections | 0 |
| Peak RSS | 858.3 MB |
| Peak heap used | 67.2 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-27T01-39-25Z-t07-nodes-dedupe-8n-8h\summary.json` at 2026-07-27T10:38:44.641Z.
