---
name: deckbuilder-web-game-product-loop
description: "Build, evolve, audit, and publish a browser-based deckbuilding roguelike through a playable vertical-slice and feedback-compilation loop. Use this skill whenever a user asks to recreate the feel of Slay the Spire or another deckbuilder without copying assets, turn a rough HTML card-game prototype into a coherent public game, fix mobile/WeChat playability, add maps/cards/relic-like hardware/story/audio/save systems, conduct adversarial game review, or package a long multi-turn game-development conversation into a reproducible workflow—even when they do not explicitly mention this skill."
compatibility: "Requires ordinary filesystem and shell access. Node.js is recommended for JavaScript checks; Git and gh are recommended for public GitHub Pages delivery."
---

# Deckbuilder Web Game Product Loop

Use this skill to turn a vague reference such as “做一个类似杀戮尖塔的网页游戏” into an original, playable, testable, publicly shareable product. The core method is not one giant prompt. It is a compiler for human feedback: each correction becomes a product rule, a regression test, or a reusable case.

## Honesty boundary

Never claim access to hidden system prompts, private chain-of-thought, or another model's proprietary internal rules. Package only observable evidence: user messages, decisions stated to the user, code, files, commits, test results, and distilled working principles.

Borrow interaction structures and genre conventions, not copyrighted text, art, music, characters, or code. Keep names, worldbuilding, assets, card text, and numbers original unless the user owns or licenses the supplied material.

## Route to the right references

Read references progressively, but read every file selected by this routing completely before acting:

- Starting a new game or planning a major expansion: read `references/case-index.md`, `references/architecture.md`, and `references/prompt-library.md`. Read `references/memory.md` only when the task explicitly asks to reproduce the reference project's accumulated preferences or history.
- Diagnosing a screenshot, player report, interaction bug, or inconsistent UI: read `references/case-index.md`, then `references/case-library.md` and `references/quality-gates.md` when a real implementation or audit is requested.
- Adding story, long-term progression, hardware/relics, route branching, rewards, audio, or mobile support: read the matching cases in `references/case-library.md`, then the relevant architecture section.
- Publishing or declaring completion: read `references/quality-gates.md` and run `scripts/audit-project.ps1` when the project is structurally compatible.
- Testing whether this skill generalizes: read `references/eval-protocol.md` and use `evals/evals.json`.

Before implementing a nontrivial feature, cite at least two relevant case IDs internally in the work log. For planning-only work, the short case index is sufficient. For file changes, read the full matching case entries before acting. This forces case-based reasoning without making every cold-start plan reload the complete project history.

## Execution budget for planning-only tasks

After reading the routed references, stop researching and produce the requested answer in the same turn. Aim for 2,500–5,000 Chinese characters unless the user explicitly requests a book-length artifact. Prefer a complete vertical slice, state contract, signature system, development order, and falsifiable acceptance table over exhaustive card lists or decorative lore. If more detail would help, put it in referenced files after delivering the core answer; do not finish a long analysis turn without a final result.

Compression must not remove these five closure checks from a browser-game plan: (1) profile/run separation plus legacy-save migration, (2) select/target/cancel/invalid/multi-target interaction, (3) low-height viewports plus breakpoint ±1px, (4) canonical direct-play URL plus deployed-commit verification, and (5) versioned or content-hashed CSS/JS assets that prevent mixed old/new cache. Include each explicitly in the acceptance table.

## Working principles

1. **Playable truth beats design-document confidence.** Establish the smallest end-to-end loop first: map → battle → reward → next node → boss → result.
2. **Treat user corrections as higher-value data than the first specification.** “结束回合在哪里” is evidence of discoverability failure; “不要拖拽，是点牌再点目标” is an interaction contract.
3. **Fix behavior before decoration.** A beautiful ship does not compensate for a missing end-turn button, fake route choice, or reward that cannot support deckbuilding.
4. **Use one source of truth.** Card rules, tooltip text, compendium entries, upgrades, reward rarity, and combat resolution should derive from shared card data. Hardware descriptions and actual effects must do the same.
5. **Grow one layer at a time.** Finish and verify one coherent change before adding the next. Do not implement ten audit findings in one untested blob when the user asks for sequential progress.
6. **Make the original differentiator change decisions.** In the reference case, ship hardware became a second build axis, not a renamed relic counter.
7. **Responsive design is a state matrix, not one media query.** Test widths, heights, browser chrome, touch targets, overflow, overlays, and boundary widths such as 780/781/850/900.
8. **Public delivery is part of the feature.** A local `C:\` path is not a share link. Validate the deployed commit, HTTP resources, cache-busting version, mobile entry screen, and portable single-file build if required.
9. **Persistent systems require migration.** New fields must safely load old saves. Test old reward shapes, route history, story archive, and max-level state.
10. **“Done” requires an adversary.** After a positive check, try to break the result with boundary sizes, repeated actions, stale saves, missing assets, defeated targets, browser autoplay restrictions, and low-height mobile layouts.

## End-to-end workflow

### 1. Reconstruct the real brief

Inspect the conversation, files, screenshots, videos, repository, commit history, and current public link. Separate:

- explicit requirements;
- later corrections that override earlier assumptions;
- durable product preferences;
- current code truth;
- unverified claims.

Write a one-paragraph product contract containing theme, platform, input model, session length, originality boundary, public-delivery target, and the next verifiable milestone.

### 2. Freeze a vertical slice

Choose the smallest complete run. A useful first slice normally has one ship/character, 10–12 cards, 2 ordinary encounters, one boss, energy, draw/discard, block/status, enemy intent, rewards, and a map/progress indicator.

Define acceptance before coding. Example: “The browser opens without installation; a first-time player can finish one run; all primary controls fit inside one landscape screen; no copied assets are used.”

### 3. Model state before multiplying screens

Define shared data for cards, enemies, route nodes, rewards, hardware, story flags, profile progression, preferences, and save version. Keep scene transitions explicit. See `references/architecture.md`.

Do not scatter game rules through DOM handlers. Prefer small pure helpers for damage, reward rolls, route availability, story consequences, XP progress, and save migration; those helpers become regression-test seams.

### 4. Implement the complete loop

Make the full run playable with placeholder visuals. Verify attack, defense, target selection, end turn, enemy intent, defeat, reward, route progression, and boss completion before expanding content.

### 5. Compile feedback into contracts

For each user or player report:

1. Restate the observable symptom.
2. Identify whether it is discoverability, interaction, state, layout, asset, content, performance, deployment, or cache.
3. Reproduce at a concrete state and viewport.
4. Fix the smallest root cause.
5. Add a test or quality-gate entry.
6. Recheck adjacent paths and old saves.

Use `references/case-library.md` to find analogous failures. Do not merely imitate the surface fix.

### 6. Establish an original art and sound system

Choose one visual thesis, palette, material language, typography hierarchy, and signature motif. Make ships animate according to state: idle, attack, shield, hit, sink. Give cards and enemies readable identity in addition to shared style.

For sound, assign scenes before songs: title, map, normal battle, elite, boss, reward/shipyard/compendium, plus short cues. Track license, attribution, source URL, loop suitability, gain, and file size. Browser audio starts only after user interaction.

### 7. Add systems only when they create decisions

Expand in this order unless evidence suggests otherwise:

1. real route choices and noncombat nodes;
2. save/resume and migration;
3. card archetypes and reward drafting;
4. differentiating progression such as hardware slots and synergies;
5. story choices with downstream effects and a persistent archive;
6. encounter, elite, boss, and battle-condition variation;
7. metaprogression that unlocks options rather than only raw power.

Every new system needs an information surface: tooltips, compendium, preview, confirmation, HUD, or log.

### 8. Run adversarial review

Use `references/quality-gates.md`. Search for ten concrete problems even when the game “looks finished.” Rank by player harm, not ease of implementation. Turn each accepted issue into a named regression check.

### 9. Validate at three layers

- **Logic:** deterministic functions and state transitions.
- **Artifact:** syntax, selectors, asset references, portable build, save migration, no external local paths.
- **Public:** deployed commit, HTTP 200, cache tag, current version, mobile entry, and critical script/style signatures.

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/audit-project.ps1 -ProjectRoot .
```

Supplement it with project-specific smoke tests; a generic static audit cannot prove game balance or visual quality.

### 10. Publish without breaking active players

Preserve the existing public URL where possible. Use cache-busting query strings for HTML-linked CSS/JS. Keep save migration and old entry points unless removal is explicitly approved. Push intentionally, wait for Pages/hosting success, then fetch the public HTML, JS, CSS, and representative assets.

### 11. Hand off with evidence

Lead with the playable outcome and direct link. State the version, what changed, what was tested, compatibility status, and any honest remaining limitations. Never call a repository page the play link.

## Output contract

For a build or change request, the final response should contain:

1. the direct outcome;
2. the public or local playable entry;
3. a compact change list tied to user-visible behavior;
4. validation evidence;
5. explicit limitations or follow-up only when real.

For an audit, return exactly ten non-duplicate issues unless the user asks otherwise. Each issue includes symptom, player impact, root cause/evidence, concrete fix, and pass condition.

For a tutorial or skill-packaging request, distinguish facts from inference and include cases, prompts, artifacts, and reproducibility tests—not just rules.

## Stop conditions

Do not stop because code was written. Stop when the requested outcome is implemented, relevant tests pass, public delivery is verified when requested, and no known in-scope required work remains. If a visual or browser test is unavailable, state the boundary and compensate with the strongest available logic/artifact checks; do not silently promote them to visual proof.
