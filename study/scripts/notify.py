import os
import datetime
import subprocess
import requests

# [설정] 복습 주기 (에빙하우스 망각 곡선 이론 기반)
REVIEW_CYCLES = [1, 3, 7, 14, 30] 
SLACK_URL = os.environ.get("SLACK_WEBHOOK_URL")

# Docusaurus 배포 URL (사용자 리포지토리 기준)
BASE_DOCS_URL = "https://hun-bot2.github.io/docs"

# 감시할 최상위 알고리즘 경로
TARGET_DIR = "study/docs/Algorithm"
# 제외 파일 목록
EXCLUDE_FILES = ["intro.md", "intro.mdx", "_category_.json"]

def get_first_commit_date(filepath):
    """Git 로그에서 파일의 최초 생성 날짜를 추출합니다."""
    try:
        # --diff-filter=A 옵션으로 최초 추가 시점의 날짜만 가져옴
        cmd = ["git", "log", "--diff-filter=A", "--follow", "--format=%as", "--reverse", filepath]
        output = subprocess.check_output(cmd).decode("utf-8").strip()
        return output.split('\n')[0] if output else None
    except:
        return None

if __name__ == "__main__":
    today = datetime.date.today()
    review_list = []

    if not os.path.exists(TARGET_DIR):
        print(f"Path not found: {TARGET_DIR}")
        exit(0)

    for root, dirs, files in os.walk(TARGET_DIR):
        for f in files:
            # 제외 대상 파일 필터링
            if f in EXCLUDE_FILES or not (f.endswith(".md") or f.endswith(".mdx")):
                continue
            
            path = os.path.join(root, f)
            first_date_str = get_first_commit_date(path)
            
            if first_date_str:
                first_date = datetime.datetime.strptime(first_date_str, "%Y-%m-%d").date()
                diff = (today - first_date).days
                
                # 복습 주기에 해당하는 경우에만 슬랙 메시지에 추가
                if diff in REVIEW_CYCLES:
                    # Docusaurus URL 경로 생성
                    # 예: study/docs/Algorithm/Baekjoon/DP/11660.md 
                    # -> Algorithm/Baekjoon/DP/11660
                    rel_path = os.path.relpath(path, "study/docs").replace(".mdx", "").replace(".md", "")
                    link = f"{BASE_DOCS_URL}/{rel_path}"
                    
                    # 플랫폼 이름 추출 (Algorithm 폴더 바로 아래의 폴더명)
                    # 구조: Algorithm/플랫폼/유형/문제.md
                    path_parts = os.path.relpath(path, TARGET_DIR).split(os.sep)
                    platform = path_parts[0] if len(path_parts) > 1 else "General"
                    
                    review_list.append(f"• [{platform}] <{link}|{f}> (D+{diff} 복습)")

    if review_list:
        msg = f"오늘의 알고리즘 복습 (기준일: {today})\n" + "\n".join(review_list)
        if SLACK_URL:
            requests.post(SLACK_URL, json={"text": msg})
        else:
            print("Slack URL 미설정. 결과만 출력합니다:\n", msg)
    else:
        print("오늘은 복습할 문제가 없습니다.")