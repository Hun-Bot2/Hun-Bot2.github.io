# 🎨 Portfolio Website - Hun-Bot2.github.io

A modern, interactive portfolio website featuring 3D graphics, smooth animations, and a clean professional design. Built with React, Three.js, and Vite.

![Portfolio Preview](https://img.shields.io/badge/Status-Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.169-orange)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)

## ✨ Features

- **🎯 3D Interactive Gallery** - Explore projects in an immersive 3D environment using Three.js
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **🎨 Modern Design** - Clean, professional interface with smooth animations
- **🌓 Dark/Light Mode** - Toggle between themes
- **📱 Fully Responsive** - Works seamlessly on all devices
- **♿ Accessible** - Built with accessibility in mind
- **🚀 Auto Deploy** - GitHub Actions workflow for automatic deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hun-Bot2/Hun-Bot2.github.io.git
   cd Hun-Bot2.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build & Deploy

### Local Build

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

The site automatically deploys when you push to the `main` branch via GitHub Actions.

**Manual deployment:**
```bash
npm run deploy
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
Hun-Bot2.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   └── vite.svg                # Favicon and public assets
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Navigation bar component
│   │   ├── Navigation.css
│   │   ├── Loader.jsx          # 3D loading screen
│   │   ├── Loader.css
│   │   ├── ProjectGallery3D.jsx # 3D project gallery
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with 3D gallery
│   │   ├── Home.css
│   │   ├── ProjectDetail.jsx   # Individual project pages
│   │   ├── ProjectDetail.css
│   │   ├── About.jsx           # About page
│   │   ├── About.css
│   │   ├── Contact.jsx         # Contact page
│   │   └── Contact.css
│   ├── data/
│   │   └── projects.json       # Project data
│   ├── App.jsx                 # Main app component
│   ├── App.css
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization Guide

### 1. Update Your Information

**Edit Personal Details** (`src/pages/About.jsx`):
```jsx
// Update your bio, skills, education, and experience
const skills = {
  'Frontend': ['React', 'Three.js', ...],
  // Add your skills
}
```

**Edit Social Links** (`src/pages/Contact.jsx`):
```jsx
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/YOUR_USERNAME',
    // Update URLs
  }
]
```

### 2. Add Your Projects

Edit `src/data/projects.json`:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "subtitle": "Short description",
  "description": "Brief overview",
  "longDescription": "Detailed description",
  "technologies": ["React", "Node.js"],
  "category": "University Project", // or "Hackathon", "Research"
  "date": "2024-11",
  "image": "/images/project.jpg",
  "github": "https://github.com/...",
  "demo": "https://demo-link.com",
  "featured": true,
  "highlights": [
    "Key feature 1",
    "Key feature 2"
  ],
  "awards": ["Optional award info"]
}
```

### 3. Customize Colors & Theme

Edit `src/index.css`:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --accent: #00d4ff;          /* Main accent color */
  --accent-hover: #00a8cc;    /* Hover state */
  --border: #333333;
  --shadow: rgba(0, 212, 255, 0.1);
}
```

### 4. Add Project Images

1. Create an `images` folder in `public/`:
   ```bash
   mkdir public/images
   ```

2. Add your project screenshots/images

3. Reference them in `projects.json`:
   ```json
   "image": "/images/your-project.jpg"
   ```

### 5. Customize 3D Gallery

Edit `src/components/ProjectGallery3D.jsx`:

- Adjust camera position: `camera={{ position: [0, 2, 8], fov: 50 }}`
- Change gallery layout in the `radius` variable
- Modify colors, materials, and animations
- Add/remove decorative 3D elements

## 🔧 Advanced Configuration

### Enable Three.js Text3D (Optional)

The 3D gallery uses Text3D for project titles. To enable:

1. Download a Three.js font (e.g., `helvetiker_regular.typeface.json`)
2. Place it in `public/fonts/`
3. The component will automatically use it

Or remove Text3D and use HTML overlays instead.

### Add Analytics

Add Google Analytics or other analytics to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
```

### Custom Domain

1. Add a `CNAME` file to `public/`:
   ```
   yourdomain.com
   ```

2. Configure your domain's DNS settings

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Deploy to GitHub Pages |

## 🎯 Performance Optimization

- **Code Splitting**: React Router automatically splits routes
- **Lazy Loading**: 3D components load on demand
- **Asset Optimization**: Vite optimizes all assets
- **Tree Shaking**: Unused code is automatically removed

## 🐛 Troubleshooting

### Three.js Font Missing

If you see errors about missing fonts:
1. Comment out the `<Text3D>` component in `ProjectGallery3D.jsx`
2. Or download a Three.js font and add to `public/fonts/`

### Deployment Issues

If GitHub Pages deployment fails:
1. Check repository settings → Pages → Source is set to "GitHub Actions"
2. Verify the workflow has proper permissions
3. Check the Actions tab for error logs

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🌟 Acknowledgments

- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **Vite** - Build tool

## 📬 Contact

For questions or suggestions about this template:
- GitHub: [@Hun-Bot2](https://github.com/Hun-Bot2)
- Email: your.email@example.com

---

**Made with ❤️ using React, Three.js, and Vite**

*Last updated: November 2025*
