import fs from 'node:fs';
import vm from 'node:vm';

function element() {
  const classes = new Set(['hidden']);
  const node = {
    classList: {
      add: (...names) => names.forEach(name => classes.add(name)),
      remove: (...names) => names.forEach(name => classes.delete(name)),
      toggle: (name, force) => {
        const next = force === undefined ? !classes.has(name) : Boolean(force);
        if (next) classes.add(name); else classes.delete(name);
        return next;
      },
      contains: name => classes.has(name)
    },
    style: { setProperty() {} },
    dataset: {},
    children: [],
    firstChild: { textContent: '' },
    appendChild(child) { this.children.push(child); return child; },
    querySelector() { return element(); },
    querySelectorAll() { return []; },
    setAttribute() {},
    addEventListener() {},
    remove() {},
    focus() {},
    getBoundingClientRect() { return { left: 0, top: 0, width: 100, height: 100 }; },
    get offsetWidth() { return 100; },
    textContent: '',
    innerHTML: '',
    disabled: false
  };
  return node;
}

const storage = new Map();
const nodes = new Map();
const document = {
  body: element(),
  documentElement: element(),
  querySelector(selector) {
    if (!nodes.has(selector)) nodes.set(selector, element());
    return nodes.get(selector);
  },
  querySelectorAll() { return []; },
  createElement() { return element(); },
  addEventListener() {},
  fullscreenElement: null
};

const context = vm.createContext({
  console,
  document,
  localStorage: {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  },
  setTimeout,
  clearTimeout,
  Math,
  Date,
  Audio: class { play() { return Promise.resolve(); } pause() {} },
  confirm: () => true,
  addEventListener() {},
  removeEventListener() {},
  innerWidth: 1280,
  innerHeight: 720
});
context.globalThis = context;
context.window = context;
vm.runInContext(fs.readFileSync(new URL('../game.js', import.meta.url), 'utf8'), context, { filename: 'game.js' });

function evaluate(source) {
  return vm.runInContext(source, context);
}

const tests = {
  story() {
    return evaluate(`(() => {
      state.story.flags=['saved-signal'];
      const rescueCopy=storyChapterCopy(storyChapters.drownedChart);
      state.story.flags=['took-blackbox'];
      const blackboxCopy=storyChapterCopy(storyChapters.drownedChart);
      state.story.flags=['restored-notes'];
      const notesCopy=storyChapterCopy(storyChapters.lastBeacon);
      state.story.flags=['salvaged-core'];
      const coreCopy=storyChapterCopy(storyChapters.lastBeacon),discount=hardwareUpgradeCost();
      state.story.flags=['vow-home']; const homeBoss=bossForStory().name;
      state.story.flags=['vow-reclaim']; const reclaimBoss=bossForStory().name;
      state.story.flags=['took-blackbox','restored-notes'];
      state.floor=2;
      const elite=state.route[2].find(node=>node.type==='elite');
      state.currentNode=elite.id;
      startBattle(elite);
      const eliteRust=state.enemies.every(enemy=>enemy.vulnerable>=2),openingHand=state.hand.length;
      state.story.flags=['saved-signal'];
      const rescueRepair=postBattleRepair();
      return {
        rescueBranch:rescueCopy.includes('弥娅'),
        blackboxBranch:blackboxCopy.includes('黑匣子'),
        notesBranch:notesCopy.includes('批注'),
        coreBranch:coreCopy.includes('导航核心'),
        discount,
        homeBoss,
        reclaimBoss,
        eliteRust,
        openingHand,
        rescueRepair
      };
    })()`);
  },
  reward() {
    return evaluate(`(() => {
      const samples=Array.from({length:120},()=>rollCardRewards(3));
      const rarities=new Set(samples.flat().map(cardRarity));
      state.floor=0;
      state.currentNode=state.route[0][0].id;
      state.pendingReward=null;
      const rewards=$('#rewards'); rewards.children=[];
      showRewards({amount:25,leveled:false,level:1});
      const offered=[...state.pendingReward.cardIds];
      rewards.children=[];
      openCardRewardPicker();
      const rendered=rewards.children.length;
      const rarityClasses=rewards.children.map(card=>card.className).every(name=>name.includes('rarity-'));
      const deckBefore=state.deck.length;
      rewards.children[0].onclick();
      return {
        offered:offered.length,
        unique:new Set(offered).size,
        rendered,
        rarityClasses,
        rarityPool:[...rarities].sort(),
        selectedOne:state.deck.length===deckBefore+1
      };
    })()`);
  },
  healing() {
    return evaluate(`(() => {
      state.story.flags=[];
      state.hardware=[];
      state.hardwareLevels={};
      state.floor=0;
      state.currentNode=state.route[0][0].id;
      const base=postBattleRepair();
      state.hardware=['repairDrone']; state.hardwareLevels={repairDrone:1};
      const drone=postBattleRepair();
      state.hardware.push('reinforcedHull'); state.hardwareLevels.reinforcedHull=1;
      const combo=postBattleRepair();
      state.hardware=[]; state.hardwareLevels={}; state.hero.hp=40; state.hero.max=72;
      const hpBefore=state.hero.hp;
      returnToMap();
      return {base,drone,combo,noFreeHeal:state.hero.hp===hpBefore};
    })()`);
  },
  route() {
    return evaluate(`(() => {
      const allNodes=routeNodes();
      const everyOriginContinues=Object.entries(state.routeLinks).every(([id,next])=>id==='start'||next.length>=1);
      const everyFutureNodeHasEntry=state.route.slice(1).flat().every(node=>Object.values(state.routeLinks).some(next=>next.includes(node.id)));
      state.routeHistory=[state.route[0][0].id];
      state.floor=1;
      const expected=state.routeLinks[state.route[0][0].id];
      const available=state.route[1].filter(routeNodeAvailable).map(node=>node.id);
      const chart=$('#chart-nodes'); chart.children=[];
      renderMap();
      const enabled=chart.children.filter(button=>!button.disabled).map(button=>button.dataset.node);
      const migrated=makeRouteLinks(state.route,state.routeSeed,[state.route[0][0].id,state.route[1][1].id]);
      return {
        everyOriginContinues,
        everyFutureNodeHasEntry,
        expected:expected.sort(),
        available:available.sort(),
        enabled:enabled.sort(),
        hasRealConstraint:Object.values(state.routeLinks).some(next=>next.length===1),
        oldPathPreserved:migrated[state.route[0][0].id].includes(state.route[1][1].id),
        totalNodes:allNodes.length
      };
    })()`);
  },
  combat() {
    return evaluate(`(() => {
      const battleNode=state.route[3].find(node=>node.type==='battle')||{...state.route[3][0],type:'battle'};
      const eliteNode=state.route[4].find(node=>node.type==='elite')||{...state.route[4][0],type:'elite'};
      const groups=new Set(),eliteNames=new Set(),conditions=new Set(),openingMoves=new Set();
      for(let seed=1;seed<=80;seed++){
        state.routeSeed=seed;
        groups.add(normalEncounter(battleNode).map(enemy=>enemy.name).join('|'));
        eliteNames.add(battleEncounter(eliteNode).map(enemy=>enemy.name).join('|'));
        conditions.add(battleCondition(battleNode).id);
        state.floor=battleNode.layer; state.currentNode=battleNode.id; state.story.flags=[];
        startBattle(battleNode);
        openingMoves.add(state.enemies.map(enemy=>enemy.move).join('|'));
      }
      state.story.flags=[]; const truth=bossForStory().name;
      state.story.flags=['vow-home']; const home=bossForStory().name;
      state.story.flags=['vow-reclaim']; const reclaim=bossForStory().name;
      return {
        normalGroups:groups.size,
        eliteVariants:[...eliteNames].sort(),
        conditions:[...conditions].sort(),
        openingMovePatterns:openingMoves.size,
        bossForms:[truth,home,reclaim]
      };
    })()`);
  },
  visual() {
    return evaluate(`(() => {
      const cardLooks=Object.keys(cards).map(id=>cardVisual(id));
      const uniqueCardLooks=new Set(cardLooks.map(v=>[v.code,v.mark,v.hue,v.x,v.y,v.scale].join('|')));
      const enemyLooks=Array.from({length:23},(_,variant)=>enemyVisual({variant}));
      const uniqueEnemyLooks=new Set(enemyLooks.map(v=>[v.code,v.mark,v.family,v.hue,v.size].join('|')));
      const card=cardElement('oxideBloom',null,true,()=>{});
      const base={...encounters[0][0],hp:27,max:27,block:0,move:0,vulnerable:0,strength:0,phase:0,enraged:false,sinkShown:false};
      const enemy=enemyElement(base,0);
      return {
        cards:Object.keys(cards).length,
        uniqueCardLooks:uniqueCardLooks.size,
        cardHasSeal:card.innerHTML.includes('card-art-sigil')&&card.innerHTML.includes('card-art-code'),
        enemyVariants:enemyLooks.length,
        uniqueEnemyLooks:uniqueEnemyLooks.size,
        hullFamilies:new Set(enemyLooks.map(v=>v.family)).size,
        enemyHasEmblem:enemy.innerHTML.includes('enemy-emblem')
      };
    })()`);
  },
  hardware() {
    return evaluate(`(() => {
      state.story.flags=[];
      state.hardware=['powderMagazine'];
      state.hardwareLevels={powderMagazine:1};
      const synergyOffers=rollHardwareRewards(2);
      state.floor=1;
      state.pendingNode=null;
      openTreasureNode(false);
      const treasureOffers=[...state.pendingNode.hardwareIds];
      state.pendingNode={kind:'shipyard',hardwareOffers:rollHardwareRewards(2,true)};
      const shopOffers=shipyardHardwareOffers();
      const purchaseId=shopOffers[0],goldBefore=220,cost=hardwarePurchaseCost();
      state.gold=goldBefore;
      confirmHardwarePurchase(purchaseId);
      return {
        rewardOffers:synergyOffers.length,
        prioritizesCombo:synergyOffers.includes('tideCapacitor'),
        treasureOffers:treasureOffers.length,
        treasureUnique:new Set(treasureOffers).size,
        shipyardOffers:shopOffers.length,
        purchased:hasHardware(purchaseId),
        chargedCorrectly:state.gold===goldBefore-cost
      };
    })()`);
  },
  xp() {
    return evaluate(`(() => {
      state.profile.xp=0; const start=xpProgress(),startLevel=levelForXp(state.profile.xp);
      state.profile.xp=410; const exactMax=xpProgress(),maxLevel=levelForXp(state.profile.xp);
      state.profile.xp=700; const overflow=xpProgress(),overflowLevel=levelForXp(state.profile.xp),hpBefore=state.hero.max;
      const award=awardXp(120);
      renderHud();
      return {
        start,startLevel,exactMax,maxLevel,overflow,overflowLevel,
        noPhantomLevel:!award.leveled&&state.hero.max===hpBefore,
        hud:$('#hud-xp').textContent
      };
    })()`);
  },
  compatibility() {
    return evaluate(`(() => {
      const legacy=JSON.parse(JSON.stringify(state));
      delete legacy.routeLinks;
      legacy.floor=2;
      legacy.routeHistory=[legacy.route[0][0].id,legacy.route[1][1].id];
      legacy.currentNode=legacy.route[2][0].id;
      legacy.scene='reward';
      legacy.pendingReward={xp:{amount:40,leveled:false,level:1},cardId:'undertow',gold:85,hardwareId:'repairDrone'};
      localStorage.setItem(RUN_SAVE_KEY,JSON.stringify({version:RUN_SAVE_VERSION,state:legacy}));
      state=loadSavedRun();
      const pathKept=state.routeLinks[legacy.route[0][0].id].includes(legacy.route[1][1].id);
      showRewards(state.pendingReward.xp,true);
      const rewardMigrated=state.pendingReward.cardIds.length===3&&state.pendingReward.hardwareIds.length===2;
      state.pendingNode={kind:'treasure',cardId:'storm',hardwareId:'deckWinch',gold:80};
      openTreasureNode(true);
      return {
        routeLinksRestored:Boolean(state.routeLinks),
        pathKept,
        rewardMigrated,
        treasureMigrated:state.pendingNode.hardwareIds.length===2,
        storyArchive:Array.isArray(state.profile.storyArchive)
      };
    })()`);
  },
  all() {
    return evaluate(`(() => ({
      xpMax:(state.profile.xp=999,xpProgress()),
      routeHasRestrictions:Object.values(state.routeLinks).some(next=>next.length===1),
      rewardCards:rollCardRewards(3).length,
      hardwareChoices:rollHardwareRewards(2).length
    }))()`);
  }
};

const requested = process.argv[2] || 'all';
if (!tests[requested]) throw new Error(`Unknown smoke group: ${requested}`);
console.log(JSON.stringify(tests[requested](), null, 2));
