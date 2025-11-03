'use client';

import { motion } from 'framer-motion';
import { 
  Award, Code, Mail, MessageSquare, 
  Sparkles, Rocket, Brain, FileText, Zap 
} from 'lucide-react';
import React from 'react';
import { presetReplies, getConfig } from '@/lib/config-loader';
import { cn } from '@/lib/utils';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  handlePresetReply?: (question: string, reply: string, tool: string) => void;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery, handlePresetReply }) => {
  const config = getConfig();
  const name = config?.personal?.name?.split(' ')[0] || 'Mann'; // Get first name with fallback

  // Enhanced suggested questions with categories
  const suggestedQuestions = [
    {
      icon: MessageSquare,
      text: 'Who are you?',
      category: 'About Me',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    },
    {
      icon: Code,
      text: 'What projects are you most proud of?',
      category: 'Projects',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
    },
    {
      icon: Brain,
      text: 'What are your skills?',
      category: 'Skills',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    },
    {
      icon: FileText,
      text: 'Can I see your resume?',
      category: 'Resume',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
    },
    {
      icon: Mail,
      text: 'How can I reach you?',
      category: 'Contact',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    },
    {
      icon: Award,
      text: 'What are your major achievements?',
      category: 'Achievements',
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30',
    },
  ];

  const handleQuestionClick = (questionText: string) => {
    const preset = presetReplies[questionText as keyof typeof presetReplies];
    
    if (preset && handlePresetReply) {
      handlePresetReply(questionText, preset.reply, preset.tool);
    } else {
      submitQuery(questionText);
    }
  };

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
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <div className="w-full min-h-[400px] py-4">
      <motion.div
        className="flex w-full max-w-5xl mx-auto flex-col items-center px-4 py-4 md:py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
      {/* Hero Section */}
      <motion.div 
        className="mb-12 text-center space-y-4" 
        variants={itemVariants}
      >
        <div className="relative inline-block mb-4">
          {/* Animated background glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl"
          />
          <div className="relative">
            <Sparkles className="w-16 h-16 text-blue-500 mx-auto" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Hey, I'm {name}'s Digital Twin
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
          Ready to explore? Ask me anything about my projects, skills, experience, or just say hello! 👋
        </p>
      </motion.div>

      {/* Available for Opportunities Banner */}
      <motion.div 
        className="mb-6 md:mb-8 w-full max-w-md mx-auto" 
        variants={itemVariants}
      >
        <motion.button
          onClick={() => handleQuestionClick('Am I available for opportunities?')}
          className={cn(
            "relative w-full overflow-hidden rounded-2xl p-6",
            "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
            "shadow-lg hover:shadow-xl transition-all duration-300",
            "group"
          )}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background */}
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
            </span>
            <span className="text-white font-semibold text-lg">
              Available for Opportunities
            </span>
            <Rocket className="w-5 h-5 text-white" />
          </div>
        </motion.button>
      </motion.div>

      {/* Question Categories Grid */}
      <motion.div
        className="w-full max-w-4xl space-y-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Quick Start Questions
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Click on any question to get started
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedQuestions.map((question, index) => {
            const Icon = question.icon;
            return (
              <motion.button
                key={index}
                onClick={() => handleQuestionClick(question.text)}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative group overflow-hidden rounded-xl p-5 text-left",
                  "border-2 border-neutral-200 dark:border-neutral-800",
                  "transition-all duration-300 hover:shadow-lg",
                  `bg-gradient-to-br ${question.bgGradient}`
                )}
              >
                {/* Gradient overlay on hover */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                  `bg-gradient-to-br ${question.gradient}`
                )} />

                <div className="relative z-10 flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-xl flex-shrink-0",
                    `bg-gradient-to-br ${question.gradient}`
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1 uppercase tracking-wide">
                      {question.category}
                    </div>
                    <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 leading-snug">
                      {question.text}
                    </div>
                  </div>
                </div>

                {/* Arrow indicator */}
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  <Zap className="w-4 h-4 text-neutral-400" />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
};

export default ChatLanding;