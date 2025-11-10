import { motion } from 'framer-motion'
import './About.css'

function About() {
  const skills = {
    'Frontend': ['React', 'Three.js', 'TypeScript', 'Next.js', 'Vite', 'WebGL'],
    'Backend': ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Firebase'],
    'Tools & Others': ['Git', 'Docker', 'WebRTC', 'TensorFlow.js', 'D3.js', 'Framer Motion']
  }

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University Name',
      period: '2021 - 2025',
      description: 'Focus on Computer Graphics, Machine Learning, and Web Technologies'
    }
  ]

  const experience = [
    {
      role: 'Research Assistant',
      organization: 'University Research Lab',
      period: '2023 - Present',
      description: 'Working on interactive 3D visualization and quantum mechanics simulations'
    },
    {
      role: 'Hackathon Organizer',
      organization: 'Tech Community',
      period: '2022 - Present',
      description: 'Organizing and mentoring at technical hackathons and coding competitions'
    }
  ]

  return (
    <div className="about">
      <div className="container">
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-intro">
            <h1 className="about-title">
              Hi, I'm <span className="highlight">Hun-Bot2</span>
            </h1>
            <p className="about-description">
              A creative developer and researcher passionate about building immersive digital experiences 
              at the intersection of art, technology, and innovation. I specialize in interactive 3D graphics, 
              web technologies, and creative coding.
            </p>
            <p className="about-description">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or experimenting with generative art and creative visualizations.
            </p>
          </div>

          <div className="about-avatar">
            <div className="avatar-placeholder">
              <div className="avatar-icon">
                <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="skills-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                className="skill-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="category-title">{category}</h3>
                <div className="skill-items">
                  {items.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="skill-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="timeline-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <div className="timeline">
            {education.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.degree}</h3>
                  <p className="timeline-subtitle">{item.school}</p>
                  <span className="timeline-period">{item.period}</span>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="timeline-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.role}</h3>
                  <p className="timeline-subtitle">{item.organization}</p>
                  <span className="timeline-period">{item.period}</span>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About
