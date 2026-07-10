const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const csv = require('csv-parser');

// --- 配置 ---
const CSV_FILE = './fc_template.csv';
const OUTPUT_DIR = './previews';
const BASE_DOMAIN = 'https://liming.me';
const LATEST_FILE = './latest.txt'; // 记录上次最大ID的文件

// 使用属性选择器精准匹配你的手机壳容器
const PREVIEW_SELECTOR = '[class*="phone-shell"]';

async function startCapture() {
    console.log('🚀 正在启动浏览器...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // 增加视口高度，确保手机壳能完全显示不被裁切
    await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 2 }); // 2倍采样率，截图更清晰
    await fs.ensureDir(OUTPUT_DIR);

    // ============== 读取上次最大ID ==============
    let lastMaxId = 0;
    try {
        if (await fs.pathExists(LATEST_FILE)) {
            const content = await fs.readFile(LATEST_FILE, 'utf8');
            lastMaxId = parseInt(content.trim()) || 0;
            console.log(`📌 读取到上次最大ID：${lastMaxId}`);
        } else {
            console.log(`📌 首次运行，上次最大ID默认为：0`);
        }
    } catch (err) {
        console.warn(`⚠️ 读取 latest.txt 失败，使用默认ID 0`);
        lastMaxId = 0;
    }

    const templates = [];

    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (data) => templates.push(data))
        .on('end', async () => {
            // ============== 过滤：只处理 ID > lastMaxId 的数据 ==============
            const filteredTemplates = templates.filter(item => {
                const currentId = parseInt(item.id) || 0;
                return currentId > lastMaxId;
            });

            console.log(`总模板数：${templates.length}，需要新增处理：${filteredTemplates.length} 个\n`);

            let currentMaxId = lastMaxId;
            let successCount = 0;

            for (const item of filteredTemplates) {
                const { id, lang, slug, title } = item;
                const currentId = parseInt(id) || 0;

                // 更新本次最大ID
                if (currentId > currentMaxId) {
                    currentMaxId = currentId;
                }

                const safeTitle = title.replace(/[\\/:*?"<>|]/g, '_');
                const targetUrl = `${BASE_DOMAIN}/${lang}/case/${slug}`;
                const outputPath = path.join(OUTPUT_DIR, `${id}_${lang}_${safeTitle}.png`);

                console.log(`[${id}] 处理中: ${title}`);

                try {
                    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
                    await page.waitForSelector(PREVIEW_SELECTOR, { timeout: 50000 });
                    await new Promise(r => setTimeout(r, 2000));

                    const element = await page.$(PREVIEW_SELECTOR);
                    if (element) {
                        await element.screenshot({
                            path: outputPath,
                            omitBackground: true
                        });
                        console.log(`  ✅ 截图成功！`);
                        successCount++;
                    }
                } catch (err) {
                    console.error(`  ❌ 失败: ${targetUrl} - ${err.message}`);
                }
            }

            // ============== 写入最新最大ID到 latest.txt ==============
            try {
                await fs.writeFile(LATEST_FILE, currentMaxId.toString(), 'utf8');
                console.log(`\n💾 已更新最新最大ID：${currentMaxId} -> ${LATEST_FILE}`);
            } catch (err) {
                console.error(`❌ 写入 latest.txt 失败：`, err.message);
            }

            console.log(`\n✨ 任务完成！本次成功生成 ${successCount} 张预览图`);
            await browser.close();
        });
}

startCapture();