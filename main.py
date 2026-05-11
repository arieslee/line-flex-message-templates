import pandas as pd
import json
import os
import re

def slugify(text):
    """将标题转换为合法的文件名字符"""
    # 移除特殊字符，保留中文、英文和数字
    text = re.sub(r'[^\w\s\u4e00-\u9fa5-]', '', text)
    # 将空格和连字符替换为下划线
    text = re.sub(r'[\s-]+', '_', text)
    return text.strip('_')

def export_templates(csv_file, output_dir='jsons'):
    # 加载 CSV 数据
    if not os.path.exists(csv_file):
        print(f"找不到文件: {csv_file}")
        return

    df = pd.read_csv(csv_file)

    # 创建输出目录
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    count = 0
    for _, row in df.iterrows():
        lang = row['lang']
        title_slug = slugify(row['title'])
        
        # 👉 修复：把 id 转成 int 再格式化
        filename = f"{int(row['id']):02d}_{lang}_{title_slug}.json"
        filepath = os.path.join(output_dir, filename)
        
        try:
            # 解析 json_data 字符串并格式化写入文件
            data = json.loads(row['json_data'])
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            count += 1
        except Exception as e:
            print(f"处理第 {row['id']} 行时出错: {e}")

    print(f"✅ 处理完成！已在 '{output_dir}/' 目录下生成 {count} 个 JSON 文件。")

if __name__ == "__main__":
    export_templates('fc_template.csv')