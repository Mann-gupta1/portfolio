import { Image as Img, Calendar, Award, Code, Link2, CheckCircle2, Zap, TrendingUp } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { projectData, getConfig } from '@/lib/config-loader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Get project content from configuration
const config = getConfig();
const PROJECT_CONTENT = config.projects;

// ProjectContent component - now uses config data with beautiful styling
const ProjectContent = ({ project }: { project: { title: string } }) => {
  const projectData = PROJECT_CONTENT.find(p => p.title === project.title);
  
  if (!projectData) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'from-emerald-500 to-green-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300';
      case 'Ongoing':
        return 'from-blue-500 to-cyan-600 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300';
      default:
        return 'from-gray-500 to-slate-600 bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-4xl space-y-6 p-0">
      {/* Header Section */}
      <div className="relative space-y-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <Img className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-1">
              {projectData.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{projectData.date}</span>
              </div>
              {projectData.status && (
                <>
                  <span>•</span>
                  <div className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full border font-medium text-xs",
                    getStatusColor(projectData.status).split(' ').slice(1).join(' ')
                  )}>
                    <div className={cn(
                      "w-2 h-2 rounded-full bg-gradient-to-r",
                      getStatusColor(projectData.status).split(' ')[0]
                    )} />
                    {projectData.status}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
          {projectData.description}
        </p>
      </div>

      {/* Status & Achievements */}
      {(projectData.achievements || projectData.metrics) && (
        <div className="space-y-4">
          {projectData.achievements && projectData.achievements.length > 0 && (
            <div className="relative p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h4 className="font-semibold text-purple-800 dark:text-purple-300">Key Achievements</h4>
              </div>
              <ul className="space-y-2">
                {projectData.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {projectData.metrics && projectData.metrics.length > 0 && (
            <div className="relative p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Key Metrics</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectData.metrics.map((metric, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-700 text-sm font-medium text-blue-700 dark:text-blue-300"
                  >
                    <Zap className="w-3 h-3" />
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tech Stack */}
      {projectData.techStack && projectData.techStack.length > 0 && (
        <div className="relative p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">Tech Stack</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {projectData.techStack.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-emerald-200 dark:border-emerald-700 text-sm font-medium text-emerald-700 dark:text-emerald-300 hover:shadow-md transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="relative p-5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h4 className="font-semibold text-orange-800 dark:text-orange-300">Project Links</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {projectData.links.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 4 }}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-orange-200 dark:border-orange-700 text-sm font-medium text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:shadow-md transition-all duration-200"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main data export - now dynamically generated from config
export const data = projectData.map(project => {
  // project.content is the full project object from config
  const fullProject = project.content as any;
  return {
    category: project.category,
    title: project.title,
    content: <ProjectContent project={{ title: project.title }} />,
    links: fullProject?.links || [],
    description: fullProject?.description || '',
  };
});