const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const csv = require('csv-parser');

// 主函数
async function slimSafeInject() {
  const csvPath = 'fc_template.csv';

  // 检查 CSV 文件是否存在
  if (!fsSync.existsSync(csvPath)) {
    console.log(`❌ 错误：找不到 ${csvPath}`);
    return;
  }

  // 1. 读取 CSV
  const df = [];
  await new Promise((resolve, reject) => {
    fsSync.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        df.push(row);
      })
      .on('end', resolve)
      .on('error', reject);
  });

  const FC_BASE_URL = 'https://liming.me';

  // 2. 生成多语言内容缓存
  const contentCache = {};
  const langs = ['zh-TW', 'ja', 'en'];

  for (const lang of langs) {
    const lines = [];
    let langTitle;

    if (lang === 'zh-TW') langTitle = '📂 範本清單';
    else if (lang === 'ja') langTitle = '📂 テンプレートリスト';
    else langTitle = '📂 Full Template List';

    lines.push(`## ${langTitle}\n`);

    if (lang === 'en') {
      // 英文：展示繁体 + 日语
      for (const l of ['zh-TW', 'ja']) {
        lines.push(`#### ${l.toUpperCase()}\n`);
        const tmpDf = df.filter(row => row.lang === l);
        let num = 1;
        for (const row of tmpDf) {
          lines.push(`- **${num}**: [${row.title}](${FC_BASE_URL}/${row.lang}/tpl/${row.code})`);
          num++;
        }
        lines.push('');
      }
    } else {
      // 繁体/日语：只显示自己语言
      const tmpDf = df.filter(row => row.lang === lang);
      let num = 1;
      for (const row of tmpDf) {
        lines.push(`- **${num}**: [${row.title}](${FC_BASE_URL}/${row.lang}/tpl/${row.code})`);
        num++;
      }
    }

    contentCache[lang] = lines.join('\n');
  }

  // 3. 更新 README 文件
  const filesToUpdate = {
    'README.md': 'en',
    'README.zh-TW.md': 'zh-TW',
    'README.ja.md': 'ja'
  };

  const START_TAG = '<catelist>';
  const END_TAG = '</catelist>';

  for (const [filename, mode] of Object.entries(filesToUpdate)) {
    if (!fsSync.existsSync(filename)) continue;

    const tempFilename = filename + '.tmp';
    let foundTags = false;
    let skipMode = false;

    const content = await fs.readFile(filename, 'utf8');
    const lines = content.split(/\r?\n/);
    const output = [];

    for (const line of lines) {
      if (line.includes(START_TAG)) {
        output.push(line);
        output.push('');
        output.push(contentCache[mode]);
        output.push('');
        skipMode = true;
        foundTags = true;
        continue;
      }

      if (line.includes(END_TAG)) {
        skipMode = false;
        output.push(line);
        continue;
      }

      if (!skipMode) {
        output.push(line);
      }
    }

    await fs.writeFile(tempFilename, output.join('\n'), 'utf8');

    if (foundTags) {
      fsSync.renameSync(tempFilename, filename);
      console.log(`✅ 流式更新成功: ${filename}`);
    } else {
      fsSync.unlinkSync(tempFilename);
      console.log(`ℹ️ ${filename} 未发现标记或文件损坏。`);
    }
  }
}

// 运行
(async () => {
  try {
    await slimSafeInject();
  } catch (err) {
    console.error('❌ 执行失败:', err);
  }
})();