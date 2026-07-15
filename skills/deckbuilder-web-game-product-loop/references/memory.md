# Compressed Project Memory

This file packages the observable long-term memory behind the reference result. It is not a hidden model prompt. It is a reconstruction from 48 user turns, 20 Git commits, project files, and tests.

## Reference product

- Name: 《潮痕航路》 / The Wakebound Route.
- Public format: static HTML/CSS/JavaScript, GitHub Pages, plus a single-file portable HTML for forwarding.
- Core fantasy: an original dark nautical deckbuilding roguelike.
- Visual thesis: storm-dark sea, oxidized copper, bone-paper cards, etched charts, hand-painted ships, brass instruments.
- Main input contract: click a card, then click a valid target. Attacks target one enemy; defense targets the player's ship. Clicking blank space, clicking the selected card again, or pressing Escape cancels.
- Signature product idea: dual construction. The player builds both a deck and a ship through hardware slots, levels, and synergies.
- Current content at v0.12: 40 cards, four archetypes, eight route layers, real constrained route edges, normal/elite/boss variations, four sea conditions, three story-selected boss forms, hardware acquisition and shipyard purchase, potions, story archive, save/resume, level cap display, settings, keyboard controls, scene music, and responsive mobile landscape support.

## Durable user preferences learned through correction

1. Show progress explicitly; the player should know where they are in the run.
2. Fit the whole game into one landscape screen; avoid hidden primary controls.
3. Match the reference interaction precisely when the user corrects it. “Click card → arrow → click target” replaced the assistant's first drag interaction.
4. Visual identity needs actors and state feedback, not symbols alone. Ships must move, attack, shield, get hit, and sink.
5. A public link must open the game directly. A repository URL or `C:\` path is not acceptable.
6. Chinese mobile and WeChat users matter. Low-height landscape layouts, cache behavior, and portable single-file delivery are product requirements.
7. Reward components must look like the same game. Equal size, equal hierarchy, and equal interaction beat three unrelated decorative widgets.
8. Destructive or expensive actions need preview and confirmation. Show upgrade results before payment; confirm removal and restart.
9. Unknown mechanics need in-context explanations. Card text, status chips, tooltip, and compendium should agree.
10. Long-term rewards need a persistent visible shelf and hover/touch explanation.
11. The user prefers to choose from candidates for subjective assets such as music. Provide licensed options, then implement the chosen mapping.
12. Story should create motivation and consequences, not only reward text.
13. The user accepts incremental implementation but expects persistence: continue until all accepted issues are actually closed.
14. Positive QA is insufficient. The user explicitly asked for adversarial review and for the assistant to find problems even after saying the game worked.

## Product decisions that survived iteration

- Original expression, not a literal clone: nautical world, original card names, ships, hardware, story, values, and generated/authorized assets.
- A vertical slice came before breadth.
- The route is a separate scene rather than a tiny top progress bar.
- Enemy intent remains visible.
- Card reward is a three-card draft with rarity; the top reward category remains card/gold/hardware.
- Automatic post-battle healing was removed. Healing comes from explicit build/story sources.
- Hardware rewards and shipyard offers bias toward missing synergy partners to reduce pure luck.
- Story selections influence later copy, elite states, opening hand, discounts, repair, boss form, and ending.
- Persistent story archive is profile data; run-specific effects remain run data.
- Level 6 is a real cap and displays `MAX`; overflow does not silently add phantom levels.
- Old saves are migrated rather than discarded when data shapes change.

## Technical memory

- Main files: `index.html`, `styles.css`, `game.js`.
- Portable builder: `tools/build_portable_demo.py`.
- Game logic smoke harness: `tools/game_logic_smoke.mjs`.
- Permanent profile and current run use separate localStorage keys.
- Route generation is seeded. `routeLinks` defines legal edges; `routeHistory` preserves selected path.
- Shared helpers provide test seams: `storyChapterCopy`, `bossForStory`, `rollCardRewards`, `postBattleRepair`, `makeRouteLinks`, `routeNodeAvailable`, `normalEncounter`, `battleCondition`, `cardVisual`, `enemyVisual`, `rollHardwareRewards`, `xpProgress`, and save migration.
- Deployment checks fetch public HTML, JS, CSS, and assert version/feature signatures after GitHub Pages reports success.

## Observable working principles

These principles explain the result better than any single prompt:

- Translate feedback into contracts, not patches.
- Prefer a coherent system over a pile of features.
- Let information design accompany mechanics.
- Make the differentiator change player choices.
- Preserve active users through compatibility and stable links.
- Separate objective verification from subjective judgment.
- Use failure boundaries honestly: syntax and HTTP checks do not equal visual proof.
- Test transition boundaries, repeated actions, and legacy data, because most regressions live between states.

## Anti-patterns seen in the project

- Adding a symbol where an animated actor was required.
- Assuming a drag interaction without confirming the reference behavior.
- Calling a local file link shareable.
- Calling a repository link a play link.
- Fixing one exact mobile width while breaking adjacent widths.
- Treating HTTP 200 as proof that the game has no issues.
- Making story choices that only change immediate rewards.
- Drawing route lines that do not constrain route decisions.
- Showing one random card and calling it deckbuilding choice.
- Replaying a sink animation whenever the DOM rerenders a defeated enemy.
- Giving every reward type a separate component grammar.
- Adding a system without explaining it where the player encounters it.

## What must remain project-specific

Do not overfit future games to ships, rust, copper, or eight layers. The transferable elements are the product loop, state architecture, case-based diagnosis, adversarial QA, and public-delivery discipline. New projects need their own fantasy, signature mechanic, content scale, art thesis, and session target.
