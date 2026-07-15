# Skill Benchmark: deckbuilder-web-game-product-loop

**Model**: Codex configured default (thread API did not expose model id)
**Date**: 2026-07-15T03:06:09Z
**Evals**: 1, 2, 3 (one paired run each; eval 2 adds one with-skill repeat)

## Summary

| Metric | With Skill | Without Skill | Delta |
|--------|------------|---------------|-------|
| Pass Rate | 100% ± 0% | 66% ± 15% | +0.34 |
| Time | 620.5s ± 359.2s | 462.9s ± 417.0s | +157.5s |
| Tokens | 7024 ± 2963 | 7460 ± 4038 | -436 |

“Tokens”一栏实际是输出字符数代理值，因为独立线程接口没有返回 token 用量。

## Analyst notes

- Eval 1 提示本身已经泄露断点和重开风险，基线也达到 80%，区分度较弱。
- Eval 2 区分度最强：两个 Skill 重复样本均为 100%，基线缺少具体迁移、多目标验证、断点相邻值、目标提交和缓存更新检查。
- Eval 2 三个初始回合都未产生最终答复，需要补发“立即输出”；这是执行可靠性失败，不能被内容通过率掩盖。
- Eval 3 公平基线擅长事务安全，但没有审查真假路线/奖励选择，也没有保护 canonical 直接游玩链接。
- 首次 Eval 3 因两边资料权限不一致已作废，不计入基准。
- Skill 平均更慢；且 Eval 2 多一个 Skill 重复样本，因此时间统计只能作方向性参考。
