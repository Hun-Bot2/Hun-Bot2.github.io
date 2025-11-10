# Hun-Bot2 Portfolio & Study Archive# Hun-Bot2 Portfolio & Study Archive# Hun-Bot2 Portfolio & Study Archive



Interactive 3D portfolio with Three.js and comprehensive study documentation.



## 🌐 Live SitesInteractive 3D Portfolio + AI/LLM/Robotics Study DocumentationInteractive 3D portfolio with Three.js and comprehensive study documentation.



- **Portfolio**: https://hun-bot2.github.io/ (3D Interactive Portfolio)

- **Study Archive**: https://hun-bot2.github.io/study/ (Learning Documentation)

## 🌐 Live Sites## 🌐 Live Sites

---



## 📁 Repository Structure

- **Portfolio**: https://hun-bot2.github.io/ - **Portfolio**: https://hun-bot2.github.io/ (3D Interactive Portfolio)

```

Hun-Bot2.github.io/- **Study Docs**: https://hun-bot2.github.io/study/- **Study Archive**: https://hun-bot2.github.io/study/ (Learning Documentation)

├── Portfolio/              # Three.js 3D Portfolio

│   ├── src/               # React + Three.js source

│   ├── public/            # Static assets

│   ├── index.html------

│   ├── package.json

│   └── vite.config.js

│

├── study/                 # Docusaurus Study Site## 📁 Repository Structure## 📁 Repository Structure

│   ├── docs/

│   │   ├── Deep Learning/    # Deep Learning studies

│   │   ├── Machine Learning/ # ML algorithms & concepts

│   │   ├── Robotics/         # Robotics projects & guides``````

│   │   └── notes/            # General study notes

│   ├── src/css/          # Custom stylingHun-Bot2.github.io/Hun-Bot2.github.io/

│   ├── docusaurus.config.js

│   └── package.json│├── Portfolio (Root)           → Three.js 3D Portfolio

│

├── .github/workflows/     # CI/CD automation├── Portfolio/              # Three.js 3D Portfolio│   ├── src/

├── package.json          # Root workspace scripts

├── manage.sh             # Management helper script│   ├── src/               # React + Three.js source│   ├── public/

└── README.md             # This file

```│   ├── public/            # Static assets│   └── index.html



---│   ├── index.html│



## 🚀 Quick Start│   ├── package.json└── study/                     → Docusaurus Study Site



### Portfolio Development│   └── vite.config.js    ├── docs/



```bash│    │   ├── llm/

# From root directory

npm install├── study/                 # Docusaurus Study Site    │   ├── robotics/

npm run dev              # http://localhost:5173

npm run build│   ├── docs/    │   └── notes/

npm run deploy

```│   │   ├── llm/          # LLM documentation    └── docusaurus.config.js



### Study Site Development│   │   ├── robotics/     # Robotics guides```



```bash│   │   └── notes/        # Study notes

cd study

npm install│   ├── src/css/          # Custom styling---

npm start                # http://localhost:3000/study/

npm run build│   ├── docusaurus.config.js

npm run deploy

```│   └── package.json## 🚀 Quick Start



### Manage Both Sites│



```bash├── .github/workflows/     # CI/CD automation### Portfolio Development (Root)

# Using root package.json scripts

npm run install:all      # Install all dependencies├── package.json          # Root workspace scripts```bash

npm run dev:both         # Run both sites simultaneously

├── manage.sh             # Management helper scriptnpm install

# Portfolio

npm run portfolio:dev    # Start portfolio dev server└── README.md             # This filenpm run dev              # http://localhost:5173

npm run portfolio:build  # Build portfolio

npm run portfolio:deploy # Deploy portfolio```npm run build



# Study sitenpm run deploy

npm run study:dev        # Start study dev server

npm run study:build      # Build study site---```

npm run study:deploy     # Deploy study site



# Or use the management script

./manage.sh help         # Show all available commands## 🚀 Quick Start### Study Site Development

./manage.sh both         # Start both sites

./manage.sh deploy:both  # Deploy both sites```bash

```

### Portfolio Developmentcd study

---

```bashnpm install

## 📚 Study Site Structure

npm run portfolio:install    # Install dependenciesnpm start                # http://localhost:3000/study/

The study documentation covers:

npm run portfolio:dev        # Start dev server (http://localhost:5173)npm run build

- **Deep Learning**: Neural networks, architectures, and advanced DL concepts

- **Machine Learning**: Algorithms, models, and ML fundamentalsnpm run portfolio:build      # Build for productionnpm run deploy

- **Robotics**: Robot control, perception, and autonomous systems

- **Notes**: General study notes and research findingsnpm run portfolio:deploy     # Deploy to GitHub Pages```



All documentation is built with [Docusaurus](https://docusaurus.io/) and supports:```

- ✅ Dark mode (default)

- ✅ Search functionality### Manage Both Sites

- ✅ Auto-generated sidebar navigation

- ✅ Mermaid diagrams### Study Site Development```bash

- ✅ Code syntax highlighting

```bash# Install all dependencies

---

npm run study:install        # Install dependenciesnpm run install:all

## 🛠️ Technologies

npm run study:dev            # Start dev server (http://localhost:3000/study/)

### Portfolio

- **React** - UI frameworknpm run study:build          # Build for production# Run study site from root

- **Three.js** - 3D graphics

- **@react-three/fiber** - React renderer for Three.jsnpm run study:deploy         # Deploy to GitHub Pagesnpm run study:dev

- **@react-three/drei** - Useful helpers for R3F

- **Vite** - Build tool```



### Study Site# Build study site from root

- **Docusaurus 3.0** - Documentation framework

- **React 18** - UI framework### Utilitiesnpm run study:build

- **Prism** - Syntax highlighting

- **Mermaid** - Diagram support```bash



---npm run install:all          # Install all dependencies# Deploy study site from root



## 📝 Adding Study Contentnpm run clean:all            # Clean all build filesnpm run study:deploy



1. Navigate to the appropriate folder in `study/docs/`:```

   - `Deep Learning/` for DL topics

   - `Machine Learning/` for ML topics# Clean all

   - `Robotics/` for robotics content

   - `notes/` for general notes---npm run clean:all



2. Create a new `.md` file or edit existing ones```



3. The sidebar will automatically update based on your folder structure## 🎨 Portfolio (Three.js)



4. Preview changes:---

   ```bash

   cd studyInteractive 3D portfolio - ride a bike and explore projects

   npm start

   ```## 🎮 Portfolio (Root Directory)



---### Tech Stack



## 🚀 Deployment- React + TypeScript3D 인터랙티브 포트폴리오 - 자전거를 조종하며 프로젝트를 탐험



### Automatic (Recommended)- Three.js & React Three Fiber

Push to `main` branch - GitHub Actions will automatically build and deploy both sites.

- React Three Rapier (Physics)### Tech Stack

### Manual

- Vite- React 18.3

```bash

# Deploy portfolio- Three.js 0.160

npm run portfolio:deploy

### Controls- React Three Fiber

# Deploy study site

npm run study:deploy- **W**: Forward- React Three Rapier (물리 엔진)



# Deploy both- **S**: Backward  - React Three Drei

./manage.sh deploy:both

```- **A**: Turn left- TypeScript



---- **D**: Turn right- Vite



## 📂 Folder Guidelines



### Portfolio Files---### Controls

- All portfolio source code is in `Portfolio/`

- Keep Three.js components organized in `Portfolio/src/components/`- W: 앞으로 이동

- Static assets go in `Portfolio/public/`

## 📚 Study Archive (Docusaurus)- S: 뒤로 이동

### Study Documentation

- Create markdown files in `study/docs/`- A: 왼쪽 회전

- Use frontmatter for metadata:

  ```markdownAI, LLM, and Robotics learning documentation- D: 오른쪽 회전

  ---

  id: my-doc

  title: My Document

  sidebar_position: 1### Content---

  ---

  ```

- Organize by topic in the appropriate subfolder

**LLM Section**## 📚 Study Archive (study/ directory)

---

- Introduction to LLMs

## 🔧 Development Tips

- Transformer ModelsAI, LLM, and Robotics learning documentation built with Docusaurus.

### Portfolio

- Run `npm run dev` for hot reload during development- RAG & Vector Databases  

- Check browser console for Three.js warnings

- Test on different devices (3D performance varies)- Fine-Tuning (LoRA, QLoRA)### Content Structure



### Study Site

- Docusaurus provides live reload

- Check `http://localhost:3000/study/` during development**Robotics Section****LLM Section:**

- Sidebar is auto-generated from file structure

- IsaacLab Setup- Introduction to LLMs

---

- Teleoperation Data Collection- Transformer Models

## 📄 License

- Policy Training- RAG & Vector Databases

MIT License - Feel free to use this structure for your own portfolio and study archive.

- Fine-Tuning Techniques

---

**Notes Section**

## 👤 Author

- ML Fundamentals**Robotics Section:**

**Hun-Bot2**

- GitHub: [@Hun-Bot2](https://github.com/Hun-Bot2)- Deep Learning Tricks- IsaacLab Setup

- Portfolio: https://hun-bot2.github.io/

- Study Archive: https://hun-bot2.github.io/study/- Paper Summaries- Teleoperation Data Collection


- Policy Training

### Features

- ✅ Math equations (KaTeX)**Notes Section:**

- ✅ Diagrams (Mermaid)- ML Fundamentals

- ✅ Syntax highlighting- Deep Learning Tricks

- ✅ Dark mode default- Paper Summaries

- ✅ Responsive design

### Features

---- ✅ Math equations (KaTeX)

- ✅ Diagrams (Mermaid)

## 🛠️ Management Script- ✅ Syntax highlighting

- ✅ Dark mode default

Use `./manage.sh` for easier management:- ✅ Responsive design



```bash---

./manage.sh portfolio:dev     # Portfolio dev server

./manage.sh study:dev          # Study site dev server## 📖 Documentation

./manage.sh install:all        # Install everything

./manage.sh clean:all          # Clean all builds- [Managing Both Sites](./MANAGING_BOTH_SITES.md) - How to work with both projects

./manage.sh help               # Show all commands- [Study Site README](./study/README.md) - Study site details

```- [Organization Guide](./study/ORGANIZATION_GUIDE.md) - How to organize docs

- [Deployment Guide](./study/DEPLOYMENT.md) - Deployment instructions

---

---

## 📖 Documentation

## 🛠️ Development

- [Managing Both Sites](./MANAGING_BOTH_SITES.md) - Workflow guide

- [Portfolio README](./Portfolio/BIKE_PORTFOLIO_README.md) - Portfolio details```bash

- [Study README](./study/README.md) - Study site details# Portfolio only

- [Organization Guide](./study/ORGANIZATION_GUIDE.md) - How to organize docsnpm run dev



---# Study site only (from root)

npm run study:dev

## 🚀 Deployment

# Install dependencies for both

### Automatic (GitHub Actions)npm run install:all

Push to `main` branch → automatic deployment```



### Manual---



**Portfolio:**## 🚀 Deployment

```bash

cd Portfolio### Portfolio

npm run deploy```bash

```npm run deploy

# Deploys to https://hun-bot2.github.io/

**Study Site:**```

```bash

cd study### Study Site

npm run deploy```bash

```npm run study:deploy

# Deploys to https://hun-bot2.github.io/study/

---```



## 🔗 Links### Or deploy from study directory:

```bash

- Portfolio: https://hun-bot2.github.io/cd study

- Study: https://hun-bot2.github.io/study/npm run deploy

- GitHub: https://github.com/Hun-Bot2/Hun-Bot2.github.io```



------



Built with ❤️ using React, Three.js, and Docusaurus## 🔗 Links


- **Portfolio**: https://hun-bot2.github.io/
- **Study Docs**: https://hun-bot2.github.io/study/
- **GitHub**: https://github.com/Hun-Bot2/Hun-Bot2.github.io

---

Built with ❤️ using React, Three.js, and Docusaurus