# Invalidated runs

The first eval-3 comparison is preserved in `eval3-adversarial-with-*` but excluded from the benchmark.

Reason: the with-skill thread inspected the current project source and two live endpoints, while the baseline was explicitly prohibited from doing so. The inputs were therefore not equivalent. The with-skill output may contain useful real audit findings, but it cannot measure skill lift.

The replacement pair is `eval3-fair-with-skill` and `eval3-fair-without-skill`. Both were prohibited from reading current source, repository history, network links, or the original conversation.

The long analog-design task also exposed an execution reliability issue: all three first turns (two with skill, one baseline) completed without a final answer. A short follow-up requesting immediate final output recovered all three. Durations in `timing.json` include both turns. This is reported as a workflow failure even though the final artifacts passed content assertions.
