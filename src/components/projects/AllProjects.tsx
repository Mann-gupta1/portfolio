"use client";
import { motion } from "framer-motion";
import { data } from "@/components/projects/ConfigData";
import { ProjectCard } from "./ProjectCard";
import { Sparkles, Code2, Rocket } from "lucide-react";

export default function AllProjects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <div className="w-full h-full pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 md:mb-16"
        >
          {/* Decorative Background Elements */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-x-20" />
              <div className="absolute w-80 h-80 bg-pink-500/10 rounded-full blur-3xl translate-x-20" />
            </div>

            <motion.div
              variants={itemVariants}
              className="relative flex flex-col items-center text-center space-y-4"
            >
              {/* Icon with animation */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="relative mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
                <div className="relative p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg">
                  <Code2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                My Projects
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
              >
                Exploring innovative solutions across{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  AI & Machine Learning
                </span>
                ,{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  Backend Development
                </span>
                , and{" "}
                <span className="font-semibold text-pink-600 dark:text-pink-400">
                  Cloud Infrastructure
                </span>
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center gap-6 mt-6"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {data.length} Projects
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                  <Rocket className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                    Multiple Technologies
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {data.map((card, index) => (
            <ProjectCard 
              key={card.title} 
              card={card} 
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}