const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const csv = require('csv-parser');

// --- 配置 ---
const CSV_FILE = './new.csv';
const OUTPUT_DIR = './previews';
const BASE_DOMAIN = 'http://192.168.0.101:3000'; 

// 使用属性选择器精准匹配你的手机壳容器
const PREVIEW_SELECTOR = '[class*="phone-shell"]'; 

async function startCapture() {
    console.log('🚀 正在启动浏览器...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // 增加视口高度，确保手机壳能完全显示不被裁切
    await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 2 }); // 2倍采样率，截图更清晰
    await fs.ensureDir(OUTPUT_DIR);

    const templates = [];

    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (data) => templates.push(data))
        .on('end', async () => {
            console.log(`找到 ${templates.length} 个模板，开始生成带手机壳的预览图...\n`);

            for (const item of templates) {
                const { id, lang, code, title } = item;
                const safeTitle = title.replace(/[\\/:*?"<>|]/g, '_');
                const targetUrl = `${BASE_DOMAIN}/${lang}/tpl/${code}`;
                const outputPath = path.join(OUTPUT_DIR, `${id}_${lang}_${safeTitle}.png`);

                console.log(`[${id}] 处理中: ${title}`);
                
                try {
                    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

                    // 等待手机壳容器加载出来
                    await page.waitForSelector(PREVIEW_SELECTOR, { timeout: 50000 });
                    
                    // 额外等待，确保内部的 LINE Flex 图片渲染完毕
                    await new Promise(r => setTimeout(r, 2000));

                    const element = await page.$(PREVIEW_SELECTOR);
                    if (element) {
                        // 截图
                        await element.screenshot({
                            path: outputPath,
                            omitBackground: true // 背景透明，方便你后期在 GitHub 换背景
                        });
                        console.log(`  ✅ 截图成功！`);
                    }
                } catch (err) {
                    console.error(`  ❌ 失败: ${targetUrl} - ${err.message}`);
                }
            }

            console.log('\n✨ 全部完成！去 previews 文件夹看看你的 50 张大片吧！');
            await browser.close();
        });
}

startCapture();