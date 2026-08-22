import fs from 'node:fs';

const html=fs.readFileSync(new URL('../family-letter.html',import.meta.url),'utf8');
const health=fs.readFileSync(new URL('../health-content.js',import.meta.url),'utf8');
const inlineScripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(match=>match[1].trim()).filter(Boolean);
inlineScripts.forEach(source=>new Function(source));

// 这组静态守卫专门防止微信分享页最危险的回归；真实长按保存仍需 iOS/Android 微信实机确认。
const checks={
  userInputUsesTextNodes:html.includes('document.createTextNode(text)')&&!html.includes("#letter-body').innerHTML"),
  shareHashRemoved:html.includes("url.hash=''"),
  shareParamsWhitelisted:html.includes("url.searchParams.set('topic'")&&html.includes("url.searchParams.set('festival'"),
  noPromptFallback:!html.includes('prompt(')&&html.includes('copy-fallback'),
  fullscreenImagePreview:html.includes('image-preview')&&html.includes('长按图片'),
  dynamicCanvasHeight:html.includes('bodyHeight')&&!html.includes('canvas.height=1600'),
  safeArea:html.includes('safe-area-inset-left')&&html.includes('safe-area-inset-bottom'),
  openGraph:html.includes('property="og:title"')&&html.includes('property="og:image"'),
  officialSource:health.includes('国家卫生健康委')&&health.includes('2024年版'),
  fullDisclaimer:health.includes('不代表现实中的即时健康效果或结果保证'),
  neutralRewards:health.includes("effect:{kind:'gold',value:35}")&&health.includes("effect:{kind:'hardware',value:1}"),
  noMisleadingRewards:!health.includes("effect:{kind:'potion'")&&!health.includes("effect:{kind:'maxHp'")
};

const failed=Object.entries(checks).filter(([,passed])=>!passed).map(([name])=>name);
console.log(JSON.stringify(checks,null,2));
if(failed.length)throw new Error(`Family letter checks failed: ${failed.join(', ')}`);
