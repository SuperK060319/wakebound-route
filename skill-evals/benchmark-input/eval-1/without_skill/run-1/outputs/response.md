最可能的根因不是“812px 放不下”，而是宽度跨过某个断点后，顶部控件切换成另一套定位规则；设置按钮仍采用 `absolute/fixed` 覆盖式定位，而地图没有为它预留空间。780px 使用移动布局正常，812px 命中桌面/平板布局后发生重叠。

## 一、可执行诊断

先在浏览器开发者工具中固定相同条件，仅改变宽度：

- `780 × 同一高度`
- `799 × 同一高度`
- `800 × 同一高度`
- `811 × 同一高度`
- `812 × 同一高度`
- `813 × 同一高度`

同时保持设备像素比、缩放比例、浏览器工具栏状态一致。不能只用两台不同手机对比，否则高度、安全区和 DPR 会干扰判断。

在 Elements 面板分别选中“设置按钮、顶部控件容器、地图容器”，对比：

- `position` 是否从普通流变成 `absolute/fixed`
- `top/right` 是否变化
- 父元素是否缺少 `position: relative`
- 地图的 `padding-top/margin-top` 是否归零
- 是否存在类似 `@media (min-width: 800px)`、`768px`、`810px` 的规则
- `z-index` 是否只是把设置按钮压到了地图上方
- 横屏高度不足时，是否仍按“宽屏桌面版”处理布局
- iPhone 类设备是否遗漏 `env(safe-area-inset-top/right)`

可在控制台执行以下碰撞检测，把选择器替换成项目中的真实选择器：

```js
const settings = document.querySelector('[data-action="settings"]');
const map = document.querySelector('[data-view="map"]');

const a = settings.getBoundingClientRect();
const b = map.getBoundingClientRect();

console.table({
  viewport: `${innerWidth}×${innerHeight}`,
  settings: `${a.left},${a.top},${a.right},${a.bottom}`,
  map: `${b.left},${b.top},${b.right},${b.bottom}`,
  overlap:
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
});
```

如果问题恰好从某个宽度开始，检查命中的 CSS 规则。如果宽度相同但不同手机表现不同，再检查横屏高度和安全区。尤其警惕这种判断：

```css
@media (min-width: 800px) {
  /* 被误认为一定是桌面端 */
}
```

812px 的手机横屏可能跨过宽度阈值，但高度仍然非常有限。

## 二、最小修复方案

### 1. 让顶部控件与地图形成明确的空间约束

优先让设置、静音等控件进入统一顶部工具栏，由正常文档流为地图留出空间：

```css
.game-shell {
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.top-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  padding:
    max(8px, env(safe-area-inset-top))
    max(12px, env(safe-area-inset-right))
    8px
    max(12px, env(safe-area-inset-left));
}

.map-panel {
  min-width: 0;
  min-height: 0;
  overflow: auto;
}
```

这样修复的是“控件不能占用地图空间”这一布局约束，而不是针对812px打补丁。

如果现有结构不允许移动节点，必须继续使用悬浮定位，则给地图预留与工具栏一致的顶部空间：

```css
.game-shell {
  --toolbar-height: 52px;
  position: relative;
}

.top-toolbar {
  position: absolute;
  z-index: 20;
  top: max(8px, env(safe-area-inset-top));
  right: max(12px, env(safe-area-inset-right));
  height: var(--toolbar-height);
}

.map-panel {
  padding-top: calc(
    var(--toolbar-height) +
    max(8px, env(safe-area-inset-top))
  );
}
```

不要只降低设置按钮的 `z-index`。那会把按钮藏到地图下面，并没有消除重叠。

如果确认是“宽度够、横屏高度不够”导致布局误判，应让宽屏布局同时满足合理高度，例如：

```css
@media (min-width: 800px) and (min-height: 600px) {
  /* 真正适合桌面式布局的规则 */
}
```

具体高度应以当前工具栏、地图节点和卡牌区的实际最小空间计算，不应机械照抄600px。

### 2. 分离重新开始与静音

把普通设置操作和破坏性操作分组，至少保持：

- 按钮间距不小于 `12px`
- 点击区域至少 `44 × 44px`
- “重新开始”使用文字或明显的危险操作样式
- 不依赖两个相似图标让玩家猜含义

```css
.top-toolbar {
  display: flex;
  gap: 12px;
}

.restart-button {
  margin-left: 8px;
  color: var(--danger-color);
}

.top-toolbar button {
  min-width: 44px;
  min-height: 44px;
}
```

更稳妥的最小改动是把“重新开始”放进设置菜单；如果仍保留在顶部，则和静音按钮之间加入分组间距。

### 3. 给重新开始增加确认

最小实现可以先使用原生确认框，并确保取消时不改变任何状态：

```js
function requestRestart() {
  const confirmed = window.confirm(
    '确定要重新开始吗？当前爬塔进度将会丢失。'
  );

  if (!confirmed) return;

  restartRun();
}
```

绑定时避免同时保留旧的直接重启监听：

```js
restartButton.addEventListener('click', requestRestart);
```

如果游戏已经有弹窗组件，应使用项目自己的确认弹窗，按钮顺序为：

- 取消：默认焦点
- 确定重新开始：危险操作样式

确认弹窗打开后应暂停地图点击，关闭后恢复焦点。不要在玩家误触的第一次点击中直接清空存档。

## 三、验收方案

### 布局验收

在真实横屏高度下检查这些宽度：

- 760、780、799、800、811、812、813、834、896px
- 至少再检查一个窄屏，如667px
- 至少检查一个桌面宽度，如1024px

每个尺寸验证：

- 设置按钮与地图可交互区域无几何重叠
- 设置、静音、重新开始均完整可见
- 刘海或圆角区域不遮挡按钮
- 地图首个节点没有被顶部工具栏覆盖
- 地图滚动、缩放或路线点击仍正常
- 横竖屏切换后布局会重新计算，不需要刷新
- 浏览器缩放至125%时仍不重叠
- 长文本或中文按钮不会挤出屏幕

可将碰撞检查做成临时验收断言：

```js
function rectanglesOverlap(a, b) {
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
}

const settingsRect =
  document.querySelector('[data-action="settings"]')
    .getBoundingClientRect();

const mapRect =
  document.querySelector('[data-view="map"]')
    .getBoundingClientRect();

console.assert(
  !rectanglesOverlap(settingsRect, mapRect),
  '设置按钮与地图发生重叠'
);
```

如果地图容器本身铺满屏幕、但实际节点区域从更低位置开始，则断言应针对“地图节点/地图交互层”，不能只比较两个大容器。

### 重新开始验收

准备一局已有进度的游戏：

1. 点击重新开始，必须先显示确认。
2. 点击取消，楼层、生命、卡组、随机状态和本地存档均保持不变。
3. 再次点击，确认后才重置游戏。
4. 连续快速点击不能弹出多个确认框或执行多次重置。
5. 确认框打开时，不能误点后面的静音或地图节点。
6. 键盘按 `Esc` 等同取消；焦点关闭后回到重新开始按钮。
7. 静音按钮仍只切换声音，不触发重启。
8. 两个按钮的触控热区不能相互覆盖。

完成标准是：问题不只在812px消失，而且在断点前后、低高度横屏和安全区设备上都满足“顶部操作区永远不遮挡地图”；重新开始则必须经过一次明确、可取消的确认。
