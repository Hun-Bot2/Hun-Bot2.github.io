import './Home.css'

const heroHighlights = [
  { label: 'Role', value: 'AI · Media Engineer' },
  { label: 'Base', value: 'Seoul, KR' },
  { label: 'Focus', value: 'LLM · CV · 3D Web · Infra' },
  { label: 'Languages', value: '한국어 · 日本語 · English' }
]

const galleryEntries = [
  {
    title: '3D World',
    description: '인터랙티브 월드는 준비 중입니다. 실제 경험으로 공개될 예정입니다.',
    link: '/3d',
    cta: 'View status'
  },
  {
    title: 'Bareun Korean Grammar Assistant',
    description: 'Bareun AI · BaikalAI와 협업해 만든 VS Code 확장. 한국어 글쓰기 워크플로를 자동화합니다.',
    link: 'https://marketplace.visualstudio.com/items?itemName=Hun-Bot.bareun-korean-grammar-assistant',
    cta: 'Marketplace'
  },
  {
    title: 'Hun-Bot.dev',
    description: 'LLM, 백엔드, 3D 실험을 기록하는 다국어 블로그. 컨셉과 리포트를 같은 톤으로 정리했습니다.',
    link: 'https://hun-bot.dev/ko/',
    cta: 'Visit blog'
  },
  {
    title: '정보교과 플랫폼',
    description: 'Streamlit 기반의 정보 교과 학습 플랫폼. AI 문제 생성과 데이터 시각화를 묶어 교사와 학습자를 지원합니다.',
    link: 'https://streamlit.io',
    cta: 'Streamlit demo'
  }
]

const processSteps = [
  { title: 'Discover & Define', detail: '사용자 요구와 제약을 수집하고, 성공 지표를 문장으로 먼저 정의합니다.' },
  { title: 'Prototype & Align', detail: 'BKGA처럼 파트너와 빠르게 프로토타입을 만들고, 데이터 흐름을 한 화면으로 정리합니다.' },
  { title: 'Ship & Grow', detail: '실 서비스 환경에 배포하고, 자동화된 텔레메트리 기반으로 반복합니다.' }
]

const capabilityCards = [
  {
    title: 'LLM & Vision Systems',
    description: 'Prompt routing, multi-modal pipelines, pose/feature extraction.'
  },
  {
    title: 'Backend & Infra',
    description: 'Go · Python · PostgreSQL · Supabase · Docker 기반 운영 자동화.'
  },
  {
    title: 'Immersive Web',
    description: 'Three.js · WebGL로 데이터 흐름을 공간적 경험으로 전환.'
  }
]

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Hun-Bot · Media Engineer</p>
          <h1>데이터, 공간, 서사를 연결하는 인터랙티브 포트폴리오.</h1>
          <p className="lead">
            복잡한 LLM 서비스와 백엔드 시스템, 그리고 3D 인터랙션을 한 화면에서 풀어내기 위해 애플 감성의 미니멀한
            인터페이스로 정리했습니다.
          </p>

          <div className="highlight-grid">
            {heroHighlights.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <a href="/3d" className="btn primary">3D World</a>
            <a href="https://hun-bot.dev/ko/" className="btn ghost" target="_blank" rel="noreferrer">Blog</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-intro">
          <p className="eyebrow">Selected Work</p>
          <h2>우선순위에 따라 접근할 수 있는 작업들을 모았습니다.</h2>
        </div>
        <div className="entry-grid">
          {galleryEntries.map((entry) => (
            <article key={entry.title} className="entry-card">
              <div className="entry-badge">{entry.title}</div>
              <p>{entry.description}</p>
              <a href={entry.link}>{entry.cta}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-intro">
          <p className="eyebrow">Process</p>
          <h2>감성과 안정성을 함께 챙기는 작업 방식.</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <article key={step.title} className="process-card">
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-intro">
          <p className="eyebrow">Capabilities</p>
          <h2>AI · Backend · 3D를 하나의 흐름으로.</h2>
        </div>
        <div className="focus-grid">
          {capabilityCards.map((card) => (
            <article key={card.title} className="focus-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
        <div className="contact-links">
          <a href="/3d">3D World</a>
          <a href="mailto:surtrcode@gmail.com">Email</a>
          <a href="https://hun-bot.dev/ko/" target="_blank" rel="noreferrer">hun-bot.dev</a>
          <a href="https://github.com/Hun-Bot2" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/hunbot-dev/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>
    </div>
  )
}

export default Home
