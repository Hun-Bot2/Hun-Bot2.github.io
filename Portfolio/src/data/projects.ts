import { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'hunbot-blog',
    title: 'HunBot 개인 블로그',
    description: 'Astro를 사용하여 제작한 개인 블로그입니다. 빠른 성능과 SEO 최적화를 위해 정적 사이트 생성 방식을 채택했습니다.',
    tech: ['Astro', 'TypeScript', 'Markdown'],
    githubUrl: 'https://github.com/Hun-Bot2/blog',
    liveUrl: 'https://hunbot.blog',
    position: [10, 1.5, 10] // 우측 앞쪽
  },
  {
    id: 'procrastination-app',
    title: 'Procrastination App',
    description: 'Go 언어로 백엔드를 개발한 생산성 향상 애플리케이션입니다. 효율적인 동시성 처리와 빠른 응답 속도가 특징입니다.',
    tech: ['Go', 'REST API', 'PostgreSQL'],
    githubUrl: 'https://github.com/Hun-Bot2/procrastination-app',
    liveUrl: 'https://procrastination-app.com',
    position: [-10, 1.5, 10] // 좌측 앞쪽
  },
  {
    id: 'exam-generator',
    title: '정보 시험 생성 프로젝트',
    description: 'Streamlit과 Python을 활용하여 만든 시험 문제 자동 생성 도구입니다. 교육자들이 쉽게 시험을 만들 수 있도록 도와줍니다.',
    tech: ['Python', 'Streamlit', 'NLP'],
    githubUrl: 'https://github.com/Hun-Bot2/exam-generator',
    liveUrl: 'https://exam-generator.streamlit.app',
    position: [0, 1.5, -10] // 뒤쪽 중앙
  }
]
