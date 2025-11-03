'use client';

import { motion } from 'framer-motion';
import { Code, Database, Cloud, Brain, Cpu, Users, Zap, Sparkles } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import { cn } from '@/lib/utils';

const Skills = () => {
  const config = getConfig();
  
  const skillsData = [
    {
      category: 'Programming Languages',
      icon: Code,
      skills: config.skills.programming,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      category: 'ML/AI Technologies',
      icon: Brain,
      skills: config.skills.ml_ai,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
    {
      category: 'Web Development',
      icon: Cpu,
      skills: config.skills.web_development,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
    },
    {
      category: 'Databases',
      icon: Database,
      skills: config.skills.databases,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
    {
      category: 'DevOps & Cloud',
      icon: Cloud,
      skills: config.skills.devops_cloud,
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
    },
    {
      category: 'Soft Skills',
      icon: Users,
      skills: config.skills.soft_skills,
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
      borderColor: 'border-rose-200 dark:border-rose-800',
    },
  ].filter(category => category.skills && category.skills.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <div className="mx-auto w-full max-w-6xl py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-3"
      >
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-500" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Technologies and tools I work with to build innovative solutions
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillsData.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className={cn(
                "relative group rounded-2xl p-6 border-2 transition-all duration-300 overflow-hidden",
                `bg-gradient-to-br ${section.bgGradient}`,
                section.borderColor
              )}
            >
              {/* Gradient overlay on hover */}
              <div className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                `bg-gradient-to-br ${section.gradient}`
              )} />

              <div className="relative z-10 space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-3 rounded-xl",
                    `bg-gradient-to-br ${section.gradient}`
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    {section.category}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {section.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + idx * 0.03 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                        "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm",
                        "border border-neutral-200 dark:border-neutral-700",
                        "hover:shadow-md hover:border-opacity-50",
                        "text-neutral-700 dark:text-neutral-300"
                      )}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className={cn(
                "absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20",
                `bg-gradient-to-br ${section.gradient}`
              )} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Skills;