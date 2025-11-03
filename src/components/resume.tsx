'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar, FileCheck, ExternalLink, Sparkles, Award, Briefcase } from 'lucide-react';
import { resumeDetails } from '@/lib/config-loader';
import { cn } from '@/lib/utils';

export function Resume() {
  // Convert Google Drive view link to download link if needed
  const getDownloadUrl = () => {
    if (!resumeDetails.downloadUrl) return null;
    
    // Extract file ID from Google Drive URL
    const fileIdMatch = resumeDetails.downloadUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      // Use direct download link
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    
    return resumeDetails.downloadUrl;
  };

  const handleDownload = () => {
    const downloadUrl = getDownloadUrl();
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      alert('Resume will be available soon!');
    }
  };

  const handleViewExternal = () => {
    if (resumeDetails.downloadUrl) {
      window.open(resumeDetails.downloadUrl, '_blank');
    }
  };

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
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <div className="mx-auto w-full max-w-5xl py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <FileText className="w-10 h-10 text-blue-500" />
              </motion.div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resume
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Download my latest resume to learn more about my experience, skills, and achievements
          </p>
        </motion.div>

        {/* Resume Info Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01, y: -3 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-purple-900/20 dark:to-blue-900/20 border-2 border-blue-200/50 dark:border-blue-800/50 shadow-xl"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.4),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.2),transparent_50%)]" />
          </div>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'linear',
            }}
          />

          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-3">
                    {resumeDetails.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">
                    {resumeDetails.description}
                  </p>
                </div>

                {/* Resume Details */}
                <div className="flex flex-wrap gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 shadow-sm"
                  >
                    <FileCheck className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      {resumeDetails.fileType}
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 shadow-sm"
                  >
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Updated {resumeDetails.lastUpdated}
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-pink-200/50 dark:border-pink-700/50 shadow-sm"
                  >
                    <FileText className="w-5 h-5 text-pink-500" />
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      {resumeDetails.fileSize}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 min-w-[200px]">
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "px-6 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3",
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                    "hover:from-blue-600 hover:via-purple-600 hover:to-pink-600",
                    "shadow-lg hover:shadow-2xl transition-all duration-300",
                    "group relative overflow-hidden"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Download className="w-5 h-5 group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10">Download Resume</span>
                </motion.button>
                
                {resumeDetails.downloadUrl && (
                  <motion.button
                    onClick={handleViewExternal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "px-6 py-3 rounded-xl font-medium text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-2",
                      "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm",
                      "border-2 border-neutral-200 dark:border-neutral-700",
                      "hover:bg-white dark:hover:bg-neutral-700",
                      "shadow-md hover:shadow-lg transition-all duration-300"
                    )}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View on Drive</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200/50 dark:border-blue-800/50 p-6"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-blue-500/20 dark:bg-blue-500/30">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">Professional Summary</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Comprehensive overview</p>
              </div>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              This resume includes my complete professional journey, technical expertise, projects, and achievements in software development and AI/ML.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-200/50 dark:border-purple-800/50 p-6"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-purple-500/20 dark:bg-purple-500/30">
                <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">What's Included</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Full professional details</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Experience & Education
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Technical Skills & Technologies
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Projects & Achievements
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Certifications & Awards
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Resume;
