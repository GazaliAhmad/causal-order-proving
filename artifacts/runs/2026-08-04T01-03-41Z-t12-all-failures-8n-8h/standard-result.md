# Standard test result

| Field | Value |
| --- | --- |
| Schema | `causal-order-proving/result@1` |
| Test | T12 |
| Run | T12-all-failures-8n-8h |
| Verdict | **PASS** |
| Status | completed |
| Profile | typical-real-world-mesh |
| Nodes | 8 |
| Wall elapsed | 28808828 ms |
| Time scale | 1x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | 550686 |
| Duplicates injected | 1713 |
| Sent | 552399 |
| Transport received | 552399 |
| Dedupe accepted | 550686 |
| Dedupe dropped | 1713 |
| Dedupe bypassed | 0 |
| Ordered | 550686 |
| Received rate | 19.175 events/s |
| Duplicate rate | 0.31% |

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
| OUT-01 | harness verdict | PASS | pass | pass or pass_with_expected_degradation |

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
| edge-a | 80722 | 80986 | 80986 | 264 | 2221 |
| edge-b | 61505 | 61700 | 61700 | 195 | 2221 |
| edge-c | 66239 | 66455 | 66455 | 216 | 2220 |
| edge-d | 68356 | 68579 | 68579 | 223 | 2223 |
| edge-e | 68202 | 68399 | 68399 | 197 | 2222 |
| edge-f | 68523 | 68733 | 68733 | 210 | 2220 |
| edge-g | 68262 | 68462 | 68462 | 200 | 2218 |
| edge-h | 68877 | 69085 | 69085 | 208 | 2217 |

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | {"normal":537427,"full_outage_buffer":12787,"replay_through_dedupe":2185} |
| Buffered | 14972 |
| Pending rows | 0 |
| Replay state | idle |
| Peak operations | 2666 |
| Anomalies | 3082 |
| Corrections | 0 |
| Peak RSS | 295.4 MB |
| Peak heap used | 71.8 MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | resources_closed |
| Callback boundary | closed |
| Ordering settled | true |
| Resources closed | true |
| Pending scheduled sends | 0 |
| Pending monitor operations | 0 |

Generated from `C:\dev\causal-order-proving\artifacts\runs\2026-08-04T01-03-41Z-t12-all-failures-8n-8h\summary.json` at 2026-08-04T10:22:11.281Z.
