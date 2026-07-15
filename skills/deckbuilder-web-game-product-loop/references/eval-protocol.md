# Cold-Start Reproducibility Protocol

The goal is to distinguish reusable method from conversation memory and model luck.

## 1. Isolate context

Use a genuinely fresh thread/process that receives only:

- the eval prompt;
- named input files;
- the skill path for the with-skill condition;
- an output location or required response format.

Do not include the original 48-turn conversation. The baseline receives the same prompt and files without the skill.

## 2. Test three abilities

1. **Diagnostic transfer:** identify structural issues in an existing deckbuilder and give falsifiable fixes.
2. **Analogical construction:** apply the method to a different fantasy without copying ships, rust, or the reference story.
3. **Release discipline:** define tests, migration, cache, and public-link verification rather than ending at local code.

## 3. Measure variability

For the hardest analogical prompt, run the with-skill condition at least twice in fresh sessions. Compare:

- expectation pass rate;
- major architecture choices;
- missing quality gates;
- output length/time where available;
- whether both results meet the same minimum bar.

Do not claim determinism from one good sample. Report mean, min/max, and standard deviation where multiple samples exist.

## 4. Grade substance, not keyword presence

An output does not pass merely because it says “mobile,” “test,” or “GitHub Pages.” It must provide concrete states, viewports, transition checks, or public verification steps. A case library mention matters only if it changes the diagnosis or implementation.

## 5. Guard against overfitting

The analog test should use a different world and different signature system. A good skill transfers the product loop while inventing a new differentiator. Failure signs:

- nautical terms leak into the new theme;
- every game has exactly eight levels or 40 cards without justification;
- the output copies the reference card mechanics;
- cases are quoted but not applied.

## 6. Interpret results

- **Reusable:** with-skill runs consistently meet the minimum bar and outperform baseline on discriminating expectations.
- **Promising but unstable:** average improves, but one repeat falls below the minimum bar or variance is high.
- **Overfit:** exact reference audit improves, analogical task does not.
- **Non-discriminating eval:** baseline and with-skill both pass because assertions are too easy.

## 7. Iterate

When a run fails, trace it to a missing instruction, missing case, missing script, or bad eval. Fix the smallest general cause, then rerun both with-skill and baseline. Do not add a brittle rule that only names the failed prompt.

## 8. Human review

Quantitative checks cannot fully judge fun, art direction, or prose. Generate the skill-creator review page and let a human compare outputs without relying only on pass rate. Record empty feedback as acceptance; specific feedback should drive the next skill revision.
