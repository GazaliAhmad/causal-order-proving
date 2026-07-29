# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T11 |
| Run | T11-dedupe-order-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28813320 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 562537 |
| Duplicates injected | 1752 |
| Sent | 564289 |
| Transport received | 564289 |
| Dedupe accepted | 562537 |
| Dedupe dropped | 1752 |
| Ordered | 562537 |
| Received rate | 19.584 events/s |
| Duplicate rate | 0.31% |

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
| edge-a | 80814 | 81070 | 81070 | 256 | 220 |
| edge-b | 73347 | 73580 | 73580 | 233 | 215 |
| edge-c | 66201 | 66394 | 66394 | 193 | 223 |
| edge-d | 68476 | 68689 | 68689 | 213 | 220 |
| edge-e | 68394 | 68631 | 68631 | 237 | 223 |
| edge-f | 68246 | 68467 | 68467 | 221 | 220 |
| edge-g | 68683 | 68901 | 68901 | 218 | 223 |
| edge-h | 68376 | 68557 | 68557 | 181 | 222 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":548847,"full_outage_buffer":14863,"replay_through_dedupe":579} |
| Buffered | 15442 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 63 |
| Anomalies | 779 |
| Corrections | 0 |
| Peak RSS | 875.6 MB |
| Peak heap used | 67 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-29T01-40-57Z-t11-dedupe-order-8n-8h\summary.json` at 2026-07-29T10:58:02.777Z.
