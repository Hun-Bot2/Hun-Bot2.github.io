import { useEffect } from 'react'
import { ProjectModalProps } from '../types'

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  if (!project) return null
  
  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm text-white backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl leading-none p-2"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">프로젝트 소개</h3>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>
          
          {/* Links */}
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center border border-slate-600"
              >
                <span className="mr-2">🔗</span>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                <span className="mr-2">🚀</span>
                Live Demo
              </a>
            )}
          </div>
          
          {/* Additional info section - you can expand this later */}
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-400 text-sm text-center">
              Press <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-600">ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
