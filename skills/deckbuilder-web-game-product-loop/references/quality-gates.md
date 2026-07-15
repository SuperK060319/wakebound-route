# Quality Gates and Adversarial Review

Passing one gate does not imply the others. Record evidence separately.

## Gate 1 — Complete playable loop

- A new run reaches map, battle, reward, later node, boss, and result.
- End turn is always discoverable and has a keyboard/touch path when supported.
- Attack and defense consume resources only after valid resolution.
- Multi-target selection affects the chosen target, not the first target.
- Defeated targets cannot be selected and one-shot defeat effects do not replay.
- Win and defeat lock input and cannot award twice.

## Gate 2 — Information and error prevention

- Enemy intent is visible before the player commits.
- Every keyword encountered has concise in-context help and full reference help.
- Card cost, type, rarity/archetype, upgrade state, and effect are readable.
- Long-term rewards remain visible and explain themselves on hover, focus, or tap.
- Upgrade previews show exact before/after behavior before payment.
- Remove, restart, overwrite, and other destructive actions require proportionate confirmation.
- Reward categories share a coherent component grammar.

## Gate 3 — Real construction choices

- Card rewards present multiple distinct candidates and allow exactly one pick.
- Rarity/archetype rules are observable and not misleading.
- Route edges constrain later choices; rendering and click eligibility agree.
- Healing, economy, shop, potions, and noncombat nodes create tradeoffs.
- A signature system such as hardware can be acquired intentionally enough to build around.
- Story choices have later callbacks and gameplay consequences.

## Gate 4 — Replayability

- Sample many seeds; count unique routes, enemy groups, conditions, and opening patterns.
- Every generated route remains completable.
- Every future route node has at least one incoming connection.
- Elite and boss encounters ask different questions, not only larger numbers.
- Repeated runs can produce meaningfully different deck/hardware/story outcomes.

## Gate 5 — Responsive and mobile matrix

Test at least:

| Class | Representative viewport | Main risk |
|---|---:|---|
| Wide desktop | 1920×1080 | Excessive empty space / unreadably small center |
| Laptop | 1366×768 | Full HUD and overlays |
| Tablet landscape | 1024×600 | breakpoint transition |
| Common phone landscape | 844×390 | browser bars, low height |
| Reference phone | 780×430 | hand/HUD overlap |
| Small phone landscape | 568×320 | start action and controls |
| Portrait | 390×844 | clear rotate guidance / safe fallback |

Also test one pixel below and above every layout breakpoint. Check:

- no primary control overlaps game content;
- HP, currency, and run progress remain available;
- touch targets are about 44×44 or larger;
- selected/hovered cards are not clipped;
- horizontal scrolling, if intentional, does not introduce a vertical scrollbar;
- modal content and its confirm/cancel actions fit or scroll safely;
- safe-area and actual visual viewport are respected;
- tooltips stay on-screen.

## Gate 6 — Save and migration

- Save at map, active battle, reward, event, treasure, repair, shipyard, and story when supported.
- Reload returns to the same logical scene with pending data intact.
- Old saves without every new field load with safe defaults.
- Legacy reward shapes migrate to current multi-offer shapes.
- Existing route history remains legal after route-link migration.
- Permanent profile data survives new run; run-only effects reset.
- Corrupt/incompatible saves fail safely without an infinite loop.

## Gate 7 — Art, animation, and accessibility

- Actors are recognizable at gameplay size, not only in source art.
- Different cards/enemies have identity beyond their names.
- Idle, attack, shield, hit, defeat, and phase states are distinguishable.
- Animation reflects a transition and settles into a stable state.
- Reduced-effect/reduced-motion mode remains understandable.
- Buttons and cards have meaningful accessible names; keyboard focus is visible.
- Color is not the only signal for category or state.

## Gate 8 — Audio and licensing

- Audio starts only after a user gesture.
- Title/map/normal/elite/boss/reward scene routing is correct.
- Volume and mute preferences persist.
- SFX and music do not clip at the intended mix.
- Every external track has source, license, attribution requirement, and local filename recorded.
- Commercial use and modification are explicitly allowed.
- Mobile file size and loop points are reasonable.

## Gate 9 — Artifact integrity

- JavaScript syntax passes.
- CSS braces/selectors and required DOM hooks are sane.
- Every referenced local asset exists.
- No accidental `C:\`, `file://`, localhost, secrets, or temp paths ship in runtime files.
- Portable HTML contains no unresolved local asset references.
- HTML/CSS/JS and representative assets return HTTP 200 from a local server.
- Project-specific smoke groups all pass.

## Gate 10 — Public release

- The intended files are staged and committed; unrelated user changes are not included.
- The pushed branch and commit are recorded.
- Hosting workflow completed successfully for that commit.
- Public HTML returns 200 and displays the intended version.
- Public JS/CSS return 200 and contain critical new signatures.
- Cache-busting tags match the release.
- The direct play link, not the repository page, is handed to players.
- Old link/save compatibility is explicitly checked when active players exist.

## Ten-problem adversarial search protocol

When asked to find ten issues, force diversity. Search at least one issue in each of these domains before duplicating a domain:

1. first-time discoverability;
2. input/targeting state;
3. responsive boundary;
4. save/migration;
5. route/reward strategic truth;
6. combat/content repetition;
7. information and accessibility;
8. performance/asset/browser compatibility;
9. economy/progression/balance;
10. public deployment/cache.

For every issue, record:

```text
ID / severity
Reproduction state and viewport
Observable symptom
Player consequence
Evidence and root cause
Smallest adequate fix
Regression test / pass condition
```

Reject vague issues such as “可以更好看” or “内容可以更多.” A valid issue is reproducible and falsifiable.

## Completion rule

Declare completion only when the requested gates pass. If full browser visual control is unavailable, explicitly mark Gate 5/7 as partially unverified and provide the strongest substitute. Never transform “could not inspect visually” into “visual check passed.”
