# Hunbot Study Documentation

Deep Learning · Machine Learning · Robotics Learning Archive

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start                # Opens http://localhost:3000/study/

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📚 Documentation Structure

The documentation is organized into four main categories:

### Deep Learning
Deep learning concepts, neural network architectures, and advanced DL techniques
- Neural Networks
- CNN, RNN, Transformers
- Training Techniques
- Model Optimization

### Machine Learning
Machine learning algorithms, models, and fundamentals
- Supervised Learning
- Unsupervised Learning
- Reinforcement Learning
- ML Algorithms

### Robotics
Robot control, perception, autonomous systems, and robotics projects
- Robot Control Systems
- Computer Vision & Perception
- Path Planning
- Manipulation & Grasping

### Notes
General study notes, research summaries, and learning resources
- Research Paper Summaries
- Best Practices
- Cheat Sheets
- Quick References

## 🌐 Deployment

This site is deployed at: **https://hun-bot2.github.io/study/**

### Auto Deployment
Push to `main` branch - GitHub Actions will automatically deploy

### Manual Deployment
```bash
npm run deploy
```

## 📝 Adding New Content

1. Navigate to the appropriate folder in `docs/`:
   ```bash
   cd docs/Deep\ Learning/    # or Machine Learning, Robotics, notes
   ```

2. Create a new markdown file:
   ```bash
   touch my-new-topic.md
   ```

3. Add frontmatter and content:
   ```markdown
   ---
   id: my-new-topic
   title: My New Topic
   sidebar_position: 2
   ---

   # My New Topic

   Your content here...
   ```

4. The sidebar will auto-update based on your file structure

## 🎨 Features

- ✅ **Dark Mode** - Default dark theme
- ✅ **Auto-generated Sidebar** - Based on folder structure
- ✅ **Search** - Built-in documentation search
- ✅ **Mermaid Diagrams** - Create flowcharts and diagrams
- ✅ **Code Highlighting** - Syntax highlighting for multiple languages
- ✅ **Responsive** - Mobile-friendly design

## 🛠️ Technology Stack

- **Docusaurus 3.0** - Documentation framework
- **React 18** - UI library
- **Prism** - Code syntax highlighting
- **Mermaid** - Diagram support

## 📖 Documentation Guidelines

### File Structure
- Use descriptive filenames (kebab-case)
- Group related topics in appropriate folders
- Use frontmatter for metadata

### Writing Style
- Clear, concise explanations
- Include code examples
- Use diagrams where helpful
- Add cross-references to related topics

### Frontmatter Example
```markdown
---
id: unique-id
title: Display Title
sidebar_label: Sidebar Text (optional)
sidebar_position: 1
tags: [tag1, tag2]
---
```

## 🔗 Links

- **Live Site**: https://hun-bot2.github.io/study/
- **Portfolio**: https://hun-bot2.github.io/
- **GitHub**: https://github.com/Hun-Bot2/Hun-Bot2.github.io

## 📄 License

MIT License - Feel free to fork and use this structure for your own study documentation.
