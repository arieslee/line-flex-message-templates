import pandas as pd
import urllib.parse
import os

def slim_safe_inject():
    csv_path = 'fc_template.csv'
    if not os.path.exists(csv_path):
        print(f"❌ 错误：找不到 {csv_path}")
        return
    
    # 1. 预先生成要插入的列表内容（存入内存，这部分很小）
    df = pd.read_csv(csv_path)
    df['id'] = df['id'].astype(str)
    FC_BASE_URL = "https://liming.me"
    
    # 2. 准备不同语言的内容
    content_cache = {}
    for lang in ['zh-TW', 'ja', 'en']:
        lines = []
        lang_title = "📂 範本清單" if lang == 'zh-TW' else "📂 テンプレートリスト"
        if lang == 'en': lang_title = "📂 Full Template List"
        lines.append(f"## {lang_title}\n")
        
        if lang == 'en':
            for l in ['zh-TW', 'ja']:
                lines.append(f"#### {l.upper()}\n")
                tmp_df = df[df['lang'] == l]
                for _, row in tmp_df.iterrows():
                    lines.append(f"- [{row['title']}]({FC_BASE_URL}/{row['lang']}/tpl/{row['code']})")
                lines.append("")
        else:
            tmp_df = df[df['lang'] == lang]
            for _, row in tmp_df.iterrows():
                lines.append(f"- **{row['id']}**: [{row['title']}]({FC_BASE_URL}/{row['lang']}/tpl/{row['code']})")
        
        content_cache[lang] = "\n".join(lines)

    # 3. 流式处理文件：逐行读取，避免 MemoryError
    files_to_update = {
        'README.md': 'en',
        'README.zh-TW.md': 'zh-TW',
        'README.ja.md': 'ja'
    }

    START_TAG = "<catelist>"
    END_TAG = "</catelist>"

    for filename, mode in files_to_update.items():
        if not os.path.exists(filename): continue
        
        temp_filename = filename + ".tmp"
        found_tags = False
        
        with open(filename, 'r', encoding='utf-8') as f_in, \
             open(temp_filename, 'w', encoding='utf-8') as f_out:
            
            skip_mode = False
            for line in f_in:
                if START_TAG in line:
                    f_out.write(line) # 写入开始标记
                    f_out.write("\n" + content_cache[mode] + "\n") # 写入新内容
                    skip_mode = True # 进入跳过模式，直到找到结束标记
                    found_tags = True
                    continue
                
                if END_TAG in line:
                    skip_mode = False # 结束标记找到了，恢复正常写入
                    f_out.write(line)
                    continue
                
                if not skip_mode:
                    f_out.write(line)

        if found_tags:
            os.replace(temp_filename, filename) # 用新文件替换旧文件
            print(f"✅ 流式更新成功: {filename}")
        else:
            os.remove(temp_filename)
            print(f"ℹ️ {filename} 未发现标记或文件损坏。")

if __name__ == "__main__":
    slim_safe_inject()