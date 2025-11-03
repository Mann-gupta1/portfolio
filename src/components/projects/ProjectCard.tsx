'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Zap, Brain, Code, Database, Sparkles, Rocket, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

type Card = {
  title: string;
  category: string;
  content: React.ReactNode;
  links?: Array<{ name: string; url: string }>;
  description?: string;
};

interface ProjectCardProps {
  card: Card;
  index: number;
}

// Category-based gradient themes
const getCategoryTheme = (category: string) => {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes('machine learning') || lowerCategory.includes('ai') || lowerCategory.includes('ml') || lowerCategory.includes('healthcare')) {
    return {
      gradient: 'from-purple-600 via-blue-600 to-indigo-700',
      gradientLight: 'from-purple-100 via-blue-100 to-indigo-100',
      gradientDark: 'from-purple-900/50 via-blue-900/50 to-indigo-900/50',
      icon: Brain,
      accent: 'purple',
    };
  }
  if (lowerCategory.includes('full-stack') || lowerCategory.includes('web')) {
    return {
      gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      gradientLight: 'from-emerald-100 via-teal-100 to-cyan-100',
      gradientDark: 'from-emerald-900/50 via-teal-900/50 to-cyan-900/50',
      icon: Code,
      accent: 'emerald',
    };
  }
  if (lowerCategory.includes('computer vision') || lowerCategory.includes('deep learning')) {
    return {
      gradient: 'from-orange-600 via-red-600 to-pink-700',
      gradientLight: 'from-orange-100 via-red-100 to-pink-100',
      gradientDark: 'from-orange-900/50 via-red-900/50 to-pink-900/50',
      icon: Sparkles,
      accent: 'orange',
    };
  }
  if (lowerCategory.includes('data') || lowerCategory.includes('algorithm')) {
    return {
      gradient: 'from-amber-600 via-yellow-600 to-orange-700',
      gradientLight: 'from-amber-100 via-yellow-100 to-orange-100',
      gradientDark: 'from-amber-900/50 via-yellow-900/50 to-orange-900/50',
      icon: Layers,
      accent: 'amber',
    };
  }
  if (lowerCategory.includes('devops') || lowerCategory.includes('cloud')) {
    return {
      gradient: 'from-slate-600 via-gray-600 to-zinc-700',
      gradientLight: 'from-slate-100 via-gray-100 to-zinc-100',
      gradientDark: 'from-slate-900/50 via-gray-900/50 to-zinc-900/50',
      icon: Rocket,
      accent: 'slate',
    };
  }
  // Default
  return {
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
    gradientLight: 'from-blue-100 via-indigo-100 to-purple-100',
    gradientDark: 'from-blue-900/50 via-indigo-900/50 to-purple-900/50',
    icon: Zap,
    accent: 'blue',
  };
};

export function ProjectCard({ card, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  
  const theme = getCategoryTheme(card.category);
  const IconComponent = theme.icon;

  // Measure content height when expanded
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    } else {
      setContentHeight(0);
    }
  }, [isExpanded]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsExpanded(false);
  };

  const githubLink = card.links?.find(link => link.name.toLowerCase().includes('github'));
  const liveLink = card.links?.find(link => link.name.toLowerCase().includes('live') || link.name.toLowerCase().includes('demo'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        zIndex: isExpanded ? 20 : 'auto',
        position: 'relative',
      }}
    >
      <motion.div
        className={cn(
          "relative overflow-visible rounded-2xl",
          "border border-neutral-200 dark:border-neutral-700",
          "w-full bg-white dark:bg-neutral-900"
        )}
        animate={{
          scale: isExpanded ? 1.05 : 1,
          y: isExpanded ? -30 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          boxShadow: isExpanded 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Beautiful Gradient Header */}
        <div className={cn(
          "relative overflow-hidden rounded-t-2xl",
          `bg-gradient-to-br ${theme.gradient}`,
          "dark:bg-gradient-to-br dark:" + theme.gradientDark
        )}>
          <motion.div 
            className="relative w-full"
            animate={{
              height: isExpanded ? 200 : 140,
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
              <motion.div
                animate={{
                  x: isHovered ? [0, 100, 0] : 0,
                  y: isHovered ? [0, 50, 0] : 0,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_40%)]"
              />
            </div>

            {/* Floating geometric shapes */}
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                rotate: isHovered ? -360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-lg blur-lg"
            />

            {/* Icon and Category */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-start justify-between"
              >
                <motion.div
                  animate={{
                    y: isHovered ? -5 : 0,
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <motion.span
                    animate={{
                      opacity: isHovered ? 1 : 0.9,
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/30"
                  >
                    <Zap className="w-3 h-3" />
                    {card.category}
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Title in header */}
              <motion.h3
                animate={{
                  fontSize: isExpanded ? "1.75rem" : "1.5rem",
                  y: isHovered ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="text-white font-bold mt-auto leading-tight drop-shadow-lg"
              >
                {card.title}
              </motion.h3>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative bg-white dark:bg-neutral-900 rounded-b-2xl overflow-hidden">
          <motion.div 
            className="relative"
            animate={{
              paddingTop: isExpanded ? 32 : 24,
              paddingBottom: isExpanded ? 32 : 24,
              paddingLeft: 24,
              paddingRight: 24,
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Expandable Content */}
            <motion.div
              animate={{
                height: isExpanded ? contentHeight : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ overflow: 'hidden' }}
            >
              <div
                ref={contentRef}
                className="space-y-4"
              >
                {card.description && (
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {card.description}
                  </p>
                )}
                <div className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                  {card.content}
                </div>
              </div>
            </motion.div>

            {/* Hover indicator */}
            <motion.div
              animate={{ 
                width: isHovered ? "100%" : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "h-1 rounded-full mt-4 bg-gradient-to-r",
                theme.gradient
              )}
            />
          </motion.div>

          {/* Floating action buttons on hover */}
          <AnimatePresence>
            {isHovered && (githubLink || liveLink) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ delay: 0.15 }}
                className="absolute bottom-4 right-4 flex gap-2 z-10"
              >
                {githubLink && (
                  <motion.a
                    href={githubLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-full bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-colors"
                    aria-label="View on GitHub"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 text-neutral-700 dark:text-neutral-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                )}
                {liveLink && (
                  <motion.a
                    href={liveLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-full bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-colors"
                    aria-label="View live demo"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 text-neutral-700 dark:text-neutral-200" />
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shimmer effect on hover */}
        {isHovered && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none rounded-2xl"
          />
        )}
      </motion.div>

      {/* Mobile modal overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md md:hidden"
            onClick={handleMouseLeave}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[90vh] overflow-auto rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl"
            >
              <div className={cn(
                "sticky top-0 z-10 flex justify-between items-center p-4 rounded-t-2xl",
                `bg-gradient-to-r ${theme.gradient}`
              )}>
                <div className="flex items-center gap-2">
                  <IconComponent className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">{card.category}</span>
                </div>
                <button
                  onClick={handleMouseLeave}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
                  {card.title}
                </h3>
                <div className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                  {card.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}