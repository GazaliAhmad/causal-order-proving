# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T02 |
| Run | T02-jitter-dark-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28808673 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 562664 |
| Duplicates injected | 1762 |
| Sent | 564426 |
| Transport received | 564426 |
| Dedupe accepted | 562664 |
| Dedupe dropped | 1762 |
| Ordered | 562664 |
| Received rate | 19.592 events/s |
| Duplicate rate | 0.312% |

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
| edge-a | 80568 | 80813 | 80813 | 245 | 252 |
| edge-b | 73432 | 73682 | 73682 | 250 | 253 |
| edge-c | 66147 | 66365 | 66365 | 218 | 251 |
| edge-d | 68145 | 68340 | 68340 | 195 | 248 |
| edge-e | 68578 | 68800 | 68800 | 222 | 249 |
| edge-f | 68520 | 68743 | 68743 | 223 | 252 |
| edge-g | 68798 | 68992 | 68992 | 194 | 247 |
| edge-h | 68476 | 68691 | 68691 | 215 | 250 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":564426} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 12 |
| Anomalies | 790 |
| Corrections | 0 |
| Peak RSS | 533.8 MB |
| Peak heap used | 66 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-07-24T17-07-12Z-t02-jitter-dark-8n-8h\summary.json` at 2026-07-25T01:45:09.530Z.
