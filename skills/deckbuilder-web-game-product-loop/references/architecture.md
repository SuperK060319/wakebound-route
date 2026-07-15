# Reference Architecture and Transferable Patterns

## 1. Scene state machine

Keep a small explicit scene vocabulary. The reference project uses states equivalent to:

```text
title → map → story/event/treasure/repair/shipyard
map → battle → reward → map
map → boss → victory
battle → defeat
```

Persist a scene name plus the minimum pending data needed to resume it. A save should not infer the current screen only from DOM state.

## 2. Separate durable profile from current run

Durable profile examples:

- XP/level and unlocks;
- discovered cards;
- story archive;
- settings and audio preferences.

Current run examples:

- HP, gold, deck, draw/discard/hand;
- hardware and potions;
- current floor/node and route history;
- enemies and turn state;
- pending rewards/events/story choice;
- run-only story flags.

This separation prevents “new run” from erasing permanent discovery while also preventing old story rewards from triggering again.

## 3. Shared data is the source of truth

Card data should drive:

- combat resolution;
- card face text;
- hover/touch help;
- compendium entry;
- upgrade preview;
- reward rarity and category;
- accessibility label.

Hardware data should drive effect logic, HUD shelf, tooltip, shop, level, synergy, reward targeting, and description. Do not maintain a second manual list for UI copy.

## 4. Target selection contract

Use one selected-card state and one target mode:

```text
idle
  ├─ click attack card → targeting-enemy
  └─ click defense card → targeting-self

targeting
  ├─ pointer move → arrow follows, valid target highlights
  ├─ click valid target → resolve once, clear selection
  ├─ click card again / blank / Escape → clear selection
  └─ invalid target → no resource spent
```

Multi-enemy battles make this contract observable. A single-enemy prototype can hide target-selection mistakes.

## 5. Defeat animation is a state transition

Do not derive “play sink animation” solely from `hp <= 0` during every render. Store `sinkShown` or an equivalent transition marker:

```text
alive → sinking (one render/animation) → sunk (stable)
```

Apply the same pattern to one-shot level-up, reward, tutorial, boss-phase, and unlock effects.

## 6. Real route branching

Route nodes and route edges are separate data. A node is clickable only when:

- it is on the current layer;
- the previous selected node has an edge to it;
- the run is not locked by a pending scene.

Generate `routeLinks` with a seed, guarantee every origin continues, guarantee every future node has an incoming edge, and preserve existing `routeHistory` edges during migration. Rendering must use the same edge data as click eligibility.

## 7. Rewards that support construction

Separate the category decision from the item decision:

```text
battle reward overview
  ├─ cards → open three distinct candidates → take exactly one
  ├─ gold → take currency
  └─ hardware → open two candidates → install/upgrade one
```

Use rarity weights, archetype relevance, duplicate rules, and synergy bias deliberately. A random single card is a reward, not meaningful deck construction.

## 8. Hardware as the differentiator

A second progression axis becomes meaningful when it:

- occupies understandable slots or categories;
- changes rules or sequencing, not only numbers;
- has visible effects and explanations;
- supports combinations;
- can be acquired intentionally enough to build around;
- affects visuals or attack identity where possible.

The reference solution uses two-offer rewards, shipyard purchases, three upgrade levels, and “missing combo partner” weighting.

## 9. Story consequences

Represent story results as flags and durable log entries. Later systems read those flags:

- chapter copy;
- enemy starting state;
- opening draw/energy;
- repair and prices;
- boss form;
- ending composition.

Every major choice should affect at least one later observable state and one narrative callback. Otherwise it is an immediate reward menu wearing story language.

## 10. Encounter variety

Variation is stronger when generated across independent axes:

- enemy group composition;
- elite alternative;
- opening action offset;
- battle condition/sea state;
- boss form and phase;
- route context and story flag.

Use seeded randomness for reproducibility. Tests should sample many seeds and count unique groups, conditions, and opening patterns.

## 11. Responsive single-screen layout

Design for the usable visual viewport, not only CSS width. Account for mobile browser bars and safe areas. Separate:

- wide desktop;
- ordinary landscape laptop/tablet;
- phone landscape;
- very low-height landscape;
- portrait orientation message.

Primary controls must remain visible; secondary controls can move into settings. Touch targets should be about 44×44 CSS pixels. Test media-query boundary values on both sides.

## 12. Audio scene router

Use scene names rather than calling song files from scattered handlers. A scene router chooses title, map, battle, elite, boss, or reward/shipyard/compendium tracks. Short actions use sound effects. Store attribution metadata alongside tracks and expose it in settings.

Do not autoplay before the first user gesture. Load/compress for mobile bandwidth and avoid embedding uncompressed source audio.

## 13. Portable build

For a single-file deliverable:

1. inline CSS and JavaScript;
2. convert local images/audio to data URLs;
3. rewrite dynamic asset references too, not only HTML tags;
4. search the output for remaining `assets/`, `file://`, or drive-letter paths;
5. verify the embedded script parses;
6. open through a local HTTP server as well as direct file mode when possible.

## 14. Save migration

Version the run-save schema. For new fields, provide defaults and convert legacy shapes. Reference migrations included:

- absent `routeLinks` regenerated from route and history;
- old `cardId` reward migrated to `cardIds` then filled to three;
- old `hardwareId` migrated to `hardwareIds` then filled to two;
- absent story/profile arrays normalized;
- old story form converted to structured pending state.

Never use a schema change as an excuse to delete active players' progress unless the user explicitly accepts it.

## 15. Test seams

Favor pure or mostly pure helpers. A DOM/localStorage VM stub can load a dependency-free browser game and exercise state transitions without full browser automation. This does not replace visual testing, but it is excellent for story, reward, healing, route, encounter, visual-identity data, hardware, XP, and compatibility checks.

The final public check should still assert:

- deployment workflow succeeded for the intended commit;
- public HTML/JS/CSS return 200;
- version and cache tags match;
- critical feature signatures exist;
- representative assets load;
- Git working tree is clean.
