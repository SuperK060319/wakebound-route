实际使用案例 ID：**C17（相邻断点失效）**、**C10（重开等破坏性操作确认）**、**C13（低高度与二维溢出）**、**C15（手机浏览器可视高度兼容）**。

## 一、可执行诊断

### 1. 固定复现条件

进入“地图”场景，保持相同存档、系统字号和浏览器缩放，横屏依次测试：

- 780×430：当前正常基准
- 781×430：检查断点两侧
- 812×375、812×430：问题尺寸
- 844×390：常见手机横屏
- 850×430、851×430：检查下一个边界
- 开启浏览器地址栏后再测一次实际可视高度

不要只拖动窗口观察，要逐个固定尺寸刷新页面，防止旧布局状态影响判断。

### 2. 确认覆盖根因

分别记录地图和顶部按钮组的实际矩形：

```js
const map = document.querySelector('.map');
const controls = document.querySelector('.top-controls');

console.table({
  map: map?.getBoundingClientRect(),
  controls: controls?.getBoundingClientRect(),
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
    visualWidth: window.visualViewport?.width,
    visualHeight: window.visualViewport?.height
  }
});
```

再用矩形碰撞判断是否真实重叠：

```js
function overlaps(a, b) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

overlaps(
  document.querySelector('.map').getBoundingClientRect(),
  document.querySelector('.top-controls').getBoundingClientRect()
);
```

重点比较780和812时以下计算样式：

- 顶部按钮是否从纯图标恢复成带文字版本；
- 按钮组宽度是否突然增加；
- 地图容器是否仍按完整视口宽度居中；
- 设置按钮是否使用 `position: fixed/absolute`，但地图没有预留右侧操作区；
- 规则是否在781px发生切换；
- 页面判断使用 `innerHeight`，而不是浏览器工具栏压缩后的 `visualViewport.height`。

预期根因不是“812比较特殊”，而是：**781px之后提前恢复了桌面按钮形态，操作层宽度增加，但地图仍占用同一片顶部空间，因此在781—850px风险区间发生碰撞。**

### 3. 检查重开按钮风险

确认下面三件事：

- 点击“重新开始”是否立刻清空本局；
- 它与静音按钮的点击区域是否相邻或重叠；
- 两个按钮的触控区域是否小于约44×44px。

如果点击一次就重置，即使视觉上拉开距离，也仍属于高代价误触。

## 二、最小修复方案

### 1. 建立明确的顶部空间合同

顶部操作区必须拥有独立区域，地图不能伸入该区域。可用统一变量约束，而不是只把按钮浮在地图上：

```css
:root {
  --top-safe: max(8px, env(safe-area-inset-top));
  --side-safe: max(8px, env(safe-area-inset-right));
  --control-size: 44px;
  --control-gap: 8px;
  --toolbar-width: 148px;
}

.game-screen {
  padding-top: calc(var(--top-safe) + var(--control-size) + 8px);
}

.top-controls {
  position: fixed;
  z-index: 20;
  top: var(--top-safe);
  right: var(--side-safe);
  display: flex;
  gap: var(--control-gap);
}

.map {
  max-width: calc(100vw - var(--toolbar-width) - 24px);
}
```

如果地图必须视觉居中，可让外层使用明确网格区，而不是简单给地图缩窄：

```css
.game-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 12px;
}

.map-region {
  min-width: 0;
}

.top-controls {
  grid-column: 2;
}
```

核心验收合同是：**操作层宽度变化时，地图可用空间同步变化。**

### 2. 延长紧凑控制状态

将紧凑状态覆盖实际风险区间，例如 մինչև850px，并同时考虑低高度。该状态需要完成具体行为，而不只是改变字号：

```css
@media (max-width: 850px), (max-height: 430px) {
  :root {
    --toolbar-width: 112px;
  }

  .top-controls .button-label {
    display: none;
  }

  .top-controls button {
    width: 44px;
    height: 44px;
    padding: 0;
  }

  .map {
    max-width: calc(100vw - var(--toolbar-width) - 16px);
  }
}
```

按钮隐藏文字后必须保留可理解的图标、`aria-label`和当前状态，例如：

```html
<button aria-label="静音" aria-pressed="false">🔊</button>
<button aria-label="打开设置">⚙</button>
```

HP、金币和路线进度不能为了腾空间被全部隐藏。

### 3. 将“重新开始”移入设置面板

顶部只保留静音和设置。“重新开始”放入设置面板的独立危险操作区，并与普通设置拉开层级。

点击后只打开确认框，不修改任何状态：

```js
restartButton.addEventListener('click', () => {
  restartConfirmDialog.showModal();
});

cancelRestartButton.addEventListener('click', () => {
  restartConfirmDialog.close();
});

confirmRestartButton.addEventListener('click', () => {
  restartConfirmDialog.close();
  startNewRun();
});
```

确认文案应明确后果：

> 重新开始将丢失当前爬塔进度，且无法恢复。确定继续吗？

要求：

- 默认焦点落在“取消”；
- `Escape`等价于取消；
- 打开和取消确认框不得清存档、扣资源或改变地图；
- 只有点击“确定重新开始”才执行一次重置；
- 确认按钮防止双击重复初始化。

## 三、验收方案

### 布局验收

在780、781、812、844、850、851各宽度以及375、390、430各高度组合中验证：

- 设置、静音按钮与地图的碰撞检测始终返回 `false`；
- 控件点击区域不小于44×44px；
- 地图节点、路线和主要进度信息没有被裁掉；
- 页面没有非预期的横向滚动；
- 浏览器地址栏出现后，按钮仍可见、可点击；
- 780px原本正常的布局没有回归；
- 850/851两侧不存在按钮文字突然出现并覆盖地图的问题。

可加入自动化断言：

```js
expect(await settings.boundingBox()).not.toBeNull();

const mapBox = await map.boundingBox();
const settingsBox = await settings.boundingBox();

expect(overlaps(mapBox, settingsBox)).toBe(false);
expect(settingsBox.width).toBeGreaterThanOrEqual(44);
expect(settingsBox.height).toBeGreaterThanOrEqual(44);
```

### 重开操作验收

依次验证：

1. 顶部工具栏中不存在“重新开始”。
2. 打开设置后才能看到重开入口。
3. 点击重开只出现确认框，当前局状态和存档不变。
4. 点击取消或按 `Escape`，返回原地图且状态不变。
5. 点击确认后才创建新局。
6. 连续点击确认不会初始化两次。
7. 静音按钮连续快速点击不会触发重开流程。
8. 触屏操作下，静音、设置和确认按钮都可准确点击。

完成标准不是“812px看起来正常”，而是：**风险区间内操作层与地图不存在几何碰撞，断点两侧均通过，且重开操作无法由一次相邻误触直接执行。**
