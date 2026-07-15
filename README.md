# 潮痕航路

一个受牌组构筑爬塔玩法启发的原创网页原型。v0.12 包含 40 张卡牌与四种流派、三选一卡牌奖励、随机敌组与海况、三种故事首领、可定向收集和联动的船体硬件、四章分支故事、药剂、经验成长、船坞整备、航海牌典与八层真实分支航线。

## 在线试玩

- GitHub Pages：<https://superk060319.github.io/wakebound-route/>
- 公开试玩站：<https://wakebound-route.superkingskgykz.chatgpt.site>

手机端请横屏游玩。

配乐会随标题、地图、普通战斗、精英战、最终首领和战利品界面分别切换。点击“开始航行”后启用配乐与海盗风格音效，顶部可以随时关闭声音；完整音乐来源也可以在“设置 → 音频设置”中查看。

## 音乐鸣谢

- 标题曲：[The Buccaneer's Haul](https://www.silvermansound.com/free-music/the-buccaneers-haul)，Shane Ivers，CC BY 4.0。
- 航线地图：[Eyes of the Ocean](https://opengameart.org/content/eyes-of-the-ocean)，Tsorthan Grove，CC BY 4.0。
- 普通战斗：[Pirate Indenture](https://opengameart.org/content/pirate-indenture)，Eldritch Grim，CC0。
- 精英战：[The Kraken](https://opengameart.org/content/ocean-music-pack)，Leonardo Paz，CC BY 4.0。
- 最终首领：[Determined Pursuit](https://opengameart.org/content/determined-pursuit-epic-orchestra-loop)，Emma Andersson，CC0。
- 奖励、船坞与牌典：[Inn Music](https://opengameart.org/content/inn-music)，tcarisland，CC BY 4.0；为适配循环播放进行了剪辑与音量标准化。

## 运行

直接双击 `index.html`，或在本目录运行：

```powershell
python -m http.server 4173
```

然后打开 `http://localhost:4173`。

需要通过微信发送单个文件时，可以使用仓库根目录的 `潮痕航路-Demo.html`。该文件已经内嵌全部脚本、样式和图片资源。

## 操作

- 不需要选择目标的技能牌点击后立即打出。
- 攻击牌点击后进入瞄准状态，再点击一艘敌船攻击。
- 防御牌点击后进入瞄准状态，再点击自己的船获得护甲。
- 按 `Esc` 或点击空白处可以取消选牌。
- 手牌会显示 `1–8` 编号；方向键切换手牌或目标，`Enter` 确认，`E` 结束回合。
- `M` 查看航线，`D` 查看牌组，`A`/`S` 查看抽牌堆和弃牌堆，`X` 查看消耗牌堆，空格查看船只状态。
- 顶部“设置”包含游戏、画面、音频和操作四页；设置会自动保存在当前浏览器。
- 卡牌左上角数字是潮力消耗，每回合恢复至 3 点。
- 根据敌人头顶的意图决定进攻或防御。
- 点击“结束回合”让敌人行动。
- 战斗胜利后从卡牌、金币和船体硬件中选择一类；卡牌再从三张不同稀有度候选中选一张，硬件从两件候选中选一件。
- 40 张战术卡分为炮击、锈蚀、装甲和潮汐四种流派，可围绕多段火力、锈蚀爆发、护甲反击或连潮构筑。
- 获得船体硬件后会加入左上角长期硬件栏；每件硬件可升至 3 级，跨舱组合会激活额外联动效果，战利品、宝箱与船坞会优先提供联动缺件。
- 航线地图上的船坞可以用金币强化或拆解卡牌，也能从两件候选中购置一件新硬件。
- 每次新航程会生成八层分支地图；下一站必须与上一站连通，可提前规划普通战斗、精英战、事件、宝藏、维修港或船坞。
- 普通战会随机组合敌舰、起手意图和四种海况；每个精英层有两种敌舰，最终首领会随序章承诺切换为三种形态并经历阶段转换。
- 航程在第 1、3、5、7 站前后推进故事；选择会持续影响后续章节、精英战、抽牌、船坞、首领和结局，“航海故事”会跨航程永久记录见过的章节与不同选择。
- 航程会在地图、玩家回合和结算界面自动保存；下次打开可以继续航行，也可以主动放弃存档重新开始。
- 强化会先展示强化前后效果，拆解也需要再次确认，确认后才会扣费。
- 航海牌典展示全部卡池，并记录已发现状态、当前持有和强化数量。
- 战后可能额外打捞药剂；战斗中可通过底部三个药剂槽使用。
- 战斗会积累可保留的经验；升级会提高生命上限和新航程的初始金币，达到 6 级后经验栏显示 MAX。
- 航线现有八层，鱼叉、鱼雷、冲撞、信号焰、闪电和舷侧齐射拥有不同演出。

所有名称、视觉和卡牌内容均为原创占位资产，适合继续扩展，不包含《杀戮尖塔》的美术、文本或代码。

## 制作教程与可复用 Skill

如果要把整套复刻方法发给朋友，只需要发送下面两个文件，不需要让朋友阅读本仓库的其他资料：

- [先打开这个-潮痕航路复刻说明.html](dist/先打开这个-潮痕航路复刻说明.html)
- [潮痕航路-复刻包.zip](dist/潮痕航路-复刻包.zip)

朋友双击说明页，把 ZIP 上传给能读取文件并编程的 AI，再复制页面中的启动提示词即可。

- [从一句“复刻杀戮尖塔”到《潮痕航路》v0.12](docs/从一句复刻杀戮尖塔到潮痕航路v0.12.md)
- [冷启动复现性评测报告](docs/Deckbuilder-Skill冷启动复现性评测报告.md)
- [Deckbuilder Web Game Product Loop Skill](skills/deckbuilder-web-game-product-loop/SKILL.md)
- [18 个真实案例](skills/deckbuilder-web-game-product-loop/references/case-library.md)

Skill 同时包含压缩记忆、架构、提示词、质量门槛、审计脚本和评测集。它封装的是可观察的项目证据与工作原则，不包含或声称包含任何模型的隐藏系统提示词或私有思维链。
