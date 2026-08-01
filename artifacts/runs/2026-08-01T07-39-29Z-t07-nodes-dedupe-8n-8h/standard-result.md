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
| Wall elapsed | 28808348 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 551008 |
| Duplicates injected | 1748 |
| Sent | 552756 |
| Transport received | 552756 |
| Dedupe accepted | 536254 |
| Dedupe dropped | 1705 |
| Dedupe bypassed | 14797 |
| Ordered | 551051 |
| Received rate | 19.187 events/s |
| Duplicate rate | 0.308% |

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
| edge-a | 80636 | 80906 | 80906 | 270 | 257 |
| edge-b | 61660 | 61862 | 61862 | 202 | 240 |
| edge-c | 66449 | 66673 | 66673 | 224 | 254 |
| edge-d | 68668 | 68871 | 68871 | 203 | 257 |
| edge-e | 68647 | 68820 | 68820 | 173 | 258 |
| edge-f | 68251 | 68461 | 68461 | 210 | 258 |
| edge-g | 68278 | 68494 | 68494 | 216 | 257 |
| edge-h | 68419 | 68669 | 68669 | 250 | 256 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":537959,"dedupe_bypass_throttled":14797} |
| Buffered | 0 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 51 |
| Anomalies | 1202 |
| Corrections | 0 |
| Peak RSS | 852.6 MB |
| Peak heap used | 67.4 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-08-01T07-39-29Z-t07-nodes-dedupe-8n-8h\summary.json` at 2026-08-01T15:43:20.637Z.
