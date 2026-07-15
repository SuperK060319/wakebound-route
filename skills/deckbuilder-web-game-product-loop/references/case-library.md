# Case Library: From Rough Prototype to Public v0.12

The cases below are the main value of this skill. Each case records a real prompt, the initial mistake or risk, the root cause, the implemented pattern, proof, and a transferable lesson. Read the closest cases before changing a new project.

## Case index

| ID | Problem family | Reference outcome |
|---|---|---|
| C01 | Discoverability | End-turn control became permanently visible |
| C02 | Progress and viewport | Single-screen layout plus separate route map |
| C03 | Reference interaction | Drag assumption replaced by click-card/click-target |
| C04 | Stateful art feedback | Ships animate idle/attack/shield/hit/sink |
| C05 | Public delivery | Local file became GitHub Pages plus portable HTML |
| C06 | Interaction symmetry | Defense uses the same targeting grammar as attack |
| C07 | Audio selection and license | Six scene tracks chosen by the user and attributed |
| C08 | Differentiation | Hardware became a second construction axis |
| C09 | Component coherence | Card/gold/hardware rewards use one visual grammar |
| C10 | Error prevention | Upgrade preview and destructive confirmations |
| C11 | Information surfaces | Compendium, keyword help, potions, persistent hardware shelf |
| C12 | Operations | Settings and keyboard controls wired to real state |
| C13 | Responsive failure | Hand clipping and low-height overlays fixed |
| C14 | Replayability | Seeded routes, noncombat nodes, save/resume |
| C15 | Real player compatibility | Invisible enemies and cropped welcome screen |
| C16 | Content depth | 40 cards, archetypes, hardware progression, story |
| C17 | Adversarial responsive review | Exact-width fix failed at adjacent breakpoints |
| C18 | Ten-issue closure | Story, rewards, healing, routes, variety, identity, hardware, XP |

## C01 — “我每个回合结束之后点哪里”

**Prompt evidence:** The first player could not find how to finish a turn.

**Wrong first assumption:** The control existed, so the turn was technically playable.

**Root cause:** A primary action was placed inside a layout that could move below or behind the hand. Existence is not discoverability.

**Implementation pattern:** Fix the end-turn button to a stable operation layer, increase contrast, preserve it in narrow/low-height layouts, and document the `E` shortcut later.

**Proof:** The user continued playing and later feedback moved to map/progression rather than being blocked by turn flow.

**Transferable rule:** If a first-time player asks where the primary action is, do not answer with instructions alone. Change the information hierarchy so the question becomes unnecessary.

## C02 — “所有东西一个屏幕装得下” and “没有地图”

**Prompt evidence:** The initial game was too large, then progress was invisible.

**Tension:** A full map can consume the same screen space the user asked to save.

**Implementation pattern:** First compress battle into a single landscape viewport; then promote the route into its own scene instead of permanently stacking it above battle. Keep only concise run progress in the HUD.

**Proof:** The loop became `map → battle → reward → map`, which remained the architecture through v0.12.

**Transferable rule:** When two important surfaces compete for space, use scene separation and persistent summary state—not endless compression.

## C03 — Video analysis and the interaction correction

**Prompt evidence:** A supplied gameplay video was analyzed. The first implementation used drag-to-target. The user corrected it: “点一下选中牌，箭头指向敌人，再点一下敌人.”

**Wrong first assumption:** Similar-looking reference animation implied drag interaction.

**Root cause:** Visual observation was incomplete and a genre convention was substituted for the user's actual control model.

**Implementation pattern:** Selected-card state; pointer-following arrow; valid-target highlight; explicit enemy click; cancel by blank/card/Escape; multi-enemy state to make target choice real.

**Proof:** The corrected interaction survived all later versions and was mirrored for defense.

**Transferable rule:** Reference analysis must distinguish appearance, sequence, and input semantics. When the user corrects semantics, treat that as the durable contract.

## C04 — “不能只是一个标志，应该有船只和特效”

**Prompt evidence:** The user rejected symbolic actors and asked for ships that move and react.

**Root cause:** Theme had been applied as iconography instead of embodied state feedback.

**Implementation pattern:** Generated original ship/background/card assets under one art thesis; added idle bob, attack lunge, projectile/trail, shield envelope, hit recoil/sparks, and sink transition.

**Failure discovered later:** A defeated ship replayed the sink animation whenever another attack rerendered the enemy list.

**Fix:** Store a one-shot `sinkShown` transition, then render stable `sunk` state.

**Transferable rule:** Animation must represent state transitions, not merely conditions recalculated on every render.

## C05 — Public, WeChat, cache, and portable delivery

**Prompt evidence:** “C盘只有这台电脑能打开”, “要公开”, “微信用户也能玩”, and “点进去是仓库，别人不知道怎么玩”.

**Root causes:** Local paths are machine-specific; repository pages are not play surfaces; mobile browsers cache static resources; WeChat attachment behavior varies.

**Implementation pattern:** Publish to the user's GitHub account with GitHub Pages; provide the direct Pages URL; add versioned CSS/JS query strings; maintain a self-contained HTML build with embedded assets; keep a visible start button for browser audio permission.

**Proof:** Public HTML and resources returned HTTP 200, Pages workflow matched the target commit, and users provided real remote-device screenshots.

**Transferable rule:** Delivery has at least four artifacts: source repository, direct play link, cache identity, and optional portable file. Do not collapse them into one.

## C06 — Defense should feel like applying a shield

**Prompt evidence:** Defense activated immediately and felt disconnected from the player's ship.

**Root cause:** Attack and defense used different interaction grammars even though both affected a visible combatant.

**Implementation pattern:** Click defense card → blue arrow → own ship highlight → click hero → shield animation and persistent shield visual. Invalid targets spend nothing.

**Proof:** Released with mobile onboarding that explained attack and defense side by side.

**Transferable rule:** Symmetric concepts should share an interaction grammar unless the difference itself communicates strategy.

## C07 — Scene music chosen by the user

**Prompt evidence:** The user requested five candidates per scene from multiple open/commercial-friendly sources, then selected `T2/M1/B1/X3/X2/H5`.

**Root cause avoided:** “Free download” does not necessarily mean commercial reuse or modification is allowed.

**Implementation pattern:** Define scene slots first; shortlist CC0/CC BY candidates; record attribution and URLs; let the user judge subjective fit; normalize/compress; route title/map/normal/elite/boss/reward separately; expose credits in settings.

**Proof:** Six tracks load from public assets, settings list licenses, and audio begins after a user gesture.

**Transferable rule:** Separate objective screening (license, loop, size, gain) from subjective selection (mood and identity).

## C08 — Hardware as a real innovation

**Prompt evidence:** Shop, chest, and rewards should sometimes yield ship hardware; attacks needed more than cannon fire.

**Implementation pattern:** Mixed card/gold/hardware reward category; hardware shelf; levels; slots/categories; combinations; shipyard upgrade/purchase; synergy-biased offers; distinct weapon effects such as torpedo, harpoon, ram, flare, lightning, and broadside.

**Later audit finding:** One random hardware offer made combos too dependent on luck.

**Fix:** Two offers, prioritize missing combo partners, and add shipyard purchase.

**Transferable rule:** A differentiator is real only when the player can see it, plan around it, acquire it intentionally, and experience changed decisions or feedback.

## C09 — Three rewards looked like three games

**Prompt evidence:** Screenshot showed a narrow card beside larger gold and hardware panels. The user said the interface looked “很垃圾” and like three games.

**Root cause:** Existing `.card` battle styles overrode reward layout; each category used a different information hierarchy.

**Implementation pattern:** One `rewardChoice` component with equal dimensions and four fixed zones: type, visual, title/description, action. Color communicates category but geometry and typography remain shared. Add low-height compact mode.

**Proof:** Desktop choices measured 196×258; low-height landscape choices measured 196×180 without internal scroll or hidden skip action.

**Transferable rule:** Component consistency is geometry + hierarchy + interaction, not merely matching border colors.

## C10 — Preview and confirm before irreversible actions

**Prompt evidence:** Players might accidentally upgrade the wrong card, dismantle a wanted card, or restart a run.

**Implementation pattern:** Upgrade opens a before/after comparison with cost before confirmation. Removal has an irreversible warning and second confirmation. Restart moved into settings and asks again. Preview does not mutate state or charge currency.

**Proof:** Logic tests asserted no mutation before confirmation and correct mutation/cost after confirmation.

**Transferable rule:** The cost of preventing an error should scale with the action's reversibility, frequency, and consequence.

## C11 — Mechanics require visible explanations

**Prompt evidence:** “锈蚀有什么用”, “牌库要公开”, “长期奖励左上角显示并解释”, and potion requests.

**Implementation pattern:** Short card text, status chip, hover/touch tooltip, accessibility label, and compendium derive from the same rule data. Hardware appears on a persistent brass shelf with hover/tap explanation. Compendium shows total pool, discovered state, owned count, and upgrades. Potions occupy three explicit slots.

**Proof:** Rust description matched combat calculation: attack-card damage +50%, rounded up, then one stack decays after the enemy acts.

**Transferable rule:** Adding a mechanic without adding a learning surface creates hidden complexity rather than depth.

## C12 — Settings copied as behavior, not decoration

**Prompt evidence:** Screenshots from a reference game showed game/video/audio/control settings and hotkeys.

**Implementation pattern:** Adapt only relevant single-player browser options; wire number keys, arrows, Enter, Escape, E, M, D, A/S/X, and Space to live game state. Preserve mouse and touch. Persist preferences.

**Proof:** A test selected card 2, moved the keyboard target to enemy 2, confirmed, and observed the intended HP reduction. Pile viewers displayed actual run data.

**Transferable rule:** Reference settings are useful only when they control real behavior. Do not import irrelevant Steam/controller/multiplayer options for visual similarity.

## C13 — Responsive hand clipping and overlay height

**Prompt evidence:** Cards were cut off and scrollbars obscured them in narrow landscape.

**Root cause:** Horizontal scrolling also created a vertical scrollbar, reducing the hand's usable height. Selected cards then clipped at the top.

**Implementation pattern:** Reserve hand height, hide scrollbars while retaining touch scrolling, scale five-card starting hand to fit, shrink adjacent controls, and add top padding for selected lift. Compact confirmation/reward overlays by height, not only width.

**Proof:** Five starting cards remained fully visible; larger hands could swipe; no visible scrollbar covered the card face.

**Transferable rule:** Overflow is two-dimensional. Always test the combined effect of scrollbars, transform lift, browser chrome, and fixed controls.

## C14 — From decorative route to replayable route

**Prompt evidence:** Market comparison led to random branches, events, treasure, repair, shipyard, and resume.

**First implementation gap:** Later audit found the apparent branches were all-to-all, so previous choice did not constrain the next one.

**Final pattern:** Seeded node generation plus explicit constrained `routeLinks`; render and click eligibility read the same links; every origin continues; every future node has incoming access; old route history is preserved during migration.

**Proof:** Tests verified 15 nodes, at least one real single-edge constraint, enabled nodes exactly matching expected edges, and legacy path preservation.

**Transferable rule:** A map is strategic only if visible edges constrain future options and the player can plan across them.

## C15 — Real players exposed compatibility failures

**Enemy screenshot:** Some WeChat devices showed trails, names, and HP but no ship sprite.

**Root cause:** Dynamic CSS filtering was unreliable in that browser.

**Fix:** Remove the fragile filter, preload enemy images, retain animation without the unsupported effect.

**Welcome screenshot:** Browser toolbars reduced usable landscape height and hid the start action.

**Fix:** Compact low-height welcome mode, use actual visible height, allow safe scrolling, and keep the action reachable.

**Transferable rule:** Remote screenshots are environment evidence. Do not blame player operation when some layers render and one asset layer disappears.

## C16 — Content depth without uncontrolled breadth

**Prompt evidence:** Market comparison identified shallow cards, elites, boss, hardware, route length, and story.

**Implementation pattern:** Expand to 40 cards and four archetypes; independent elite rules; multi-phase/story-selected boss; three-level hardware and combos; four story chapters with flags and archive. Keep the live URL stable and migrate saves.

**Proof:** v0.11 shipped as one coherent milestone instead of hundreds of unrelated cards.

**Transferable rule:** Expand around playable archetypes and encounter questions, not raw content count.

## C17 — A fix that passed one width failed next door

**Prompt evidence:** After the mobile HUD fix, the user requested adversarial review.

**Finding:** 780px passed, but 781–850px restored desktop text controls and overlapped the map. Controls were 34×34, restart was adjacent and immediate, important currency/progress vanished, and mute icon was ambiguous.

**Final pattern:** Extend compact behavior through the actual risk range, test 568–1101 boundary widths, use 44×44 controls, keep HP/gold/progress, move restart into settings with confirmation, and use an understandable mute state.

**Proof:** The second review passed across the range.

**Transferable rule:** A breakpoint is a discontinuity. Test both sides and representative values between it and the next breakpoint.

## C18 — Closing the ten adversarial findings

**Accepted issues:** mobile HUD; story archive; consequence-free story; weak card choice; free healing; fake branching; repeated battles; indistinct cards/enemies; luck-only hardware; incorrect max-level XP.

**Implementation pattern:** Address each as an independent behavior and regression group. Add story callbacks/effects/boss forms; three-card rarity draft; explicit repair sources; constrained route graph; encounter/condition/opening variation; 40 unique card identities and 23 enemy variants; targeted hardware offers/purchase; `MAX` level handling.

**Proof:** Nine automated groups covered story, rewards, healing, route, combat, visual data, hardware, XP, and compatibility. Public Pages succeeded for commit `ef1ed96`; public HTML, JS, and CSS exposed the v0.12 signatures.

**Transferable rule:** A long issue list becomes manageable when every item has its own state contract, test name, and evidence. “All fixed” should be the aggregate of ten proofs, not one confident sentence.
