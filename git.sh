#!/bin/bash
# 定义颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # 没有颜色

# 获取当前分支
currentBranch=$(git branch --show-current)

# 显示当前的 git status
echo -e "${GREEN}当前 Git 状态:${NC}"
git status

# 提示用户是否继续
echo -e "${YELLOW}是否继续提交和推送？(y/n) [默认: y]: ${NC}"
read confirm
confirm=${confirm:-y}
if [[ "$confirm" != "y" ]]; then
    echo "操作已取消。"
    exit 1
fi

# 提示用户输入提交信息、分支和目录
echo -e "${YELLOW}请输入提交信息 (默认: update): ${NC}"
read message
echo -e "${RED}请输入分支名称 (当前分支为：$currentBranch, 默认: $currentBranch): ${NC}"
read branch
echo -e "${GREEN}请输入目录路径 (默认: ./): ${NC}"
read dir

# 如果用户未输入，使用默认值
message=${message:-update}
branch=${branch:-$currentBranch}
dir=${dir:-.}

# 询问是否创建 Git 标签
echo -e "${YELLOW}是否创建 Git 标签？(y/n) [默认: n]: ${NC}"
read createTag
createTag=${createTag:-n}

# 从 version.go 中读取当前版本号（仅在需要打标签时执行）
if [[ "$createTag" == "y" ]]; then
    versionFile="version/version.go"
    if [ -f "$versionFile" ]; then
        currentVersion=$(grep -oP '(?<=VERSION = ")[^"]+' "$versionFile")
        # 分割版本号，递增修订版本号
        IFS='.' read -r major minor patch <<< "${currentVersion//v/}"
        patch=$((patch + 1))
        newVersion="v$major.$minor.$patch"
        # 更新 version.go 文件
        sed -i "s/$currentVersion/$newVersion/" "$versionFile"
        echo -e "${BLUE}新版本号已更新为: $newVersion${NC}"
    else
        echo -e "${RED}错误: version.go 文件未找到，跳过版本号更新！${NC}"
        createTag="n" # 强制禁用标签
    fi
fi

# 添加更改并提交
git add "$dir"
echo -e "${BLUE}正在执行 git commit${NC}"
git commit -m "$message"

# 创建 Git 标签（如果用户选择）
if [[ "$createTag" == "y" ]]; then
    git tag -a "$newVersion" -m "版本 $newVersion"
    echo -e "${GREEN}成功创建标签: $newVersion${NC}"
fi

# 推送分支到远程仓库
echo -e "${BLUE}正在推送分支到远程仓库${NC}"
git push origin "$branch"

# 推送标签（如果存在）
if [[ "$createTag" == "y" ]]; then
    echo -e "${BLUE}正在推送标签到远程仓库${NC}"
    git push origin "$newVersion"
fi

echo -e "${GREEN}操作成功！${NC}"

# sed -i 's/\r$//' git.sh
