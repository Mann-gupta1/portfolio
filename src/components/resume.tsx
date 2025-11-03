'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar, FileCheck, ExternalLink, Sparkles } from 'lucide-react';
import { resumeDetails } from '@/lib/config-loader';
import { cn } from '@/lib/utils';

export function Resume() {
  const handleDownload = () => {
    if (resumeDetails.downloadUrl) {
      window.open(resumeDetails.downloadUrl, '_blank');
    } else {
      alert('Resume will be available soon!');
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
          className="text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resume
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Download or view my latest resume
          </p>
        </motion.div>

        {/* Resume Info Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-purple-900/20 dark:to-blue-900/20 border-2 border-blue-200 dark:border-blue-800"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(219,39,119,0.2),transparent_50%)]" />
          </div>

          <div className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2">
                    {resumeDetails.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-base">
                    {resumeDetails.description}
                  </p>
                </div>

                {/* Resume Details */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
                    <FileCheck className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {resumeDetails.fileType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Updated {resumeDetails.lastUpdated}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
                    <FileText className="w-4 h-4 text-pink-500" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {resumeDetails.fileSize}
                    </span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2",
                  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                  "hover:from-blue-600 hover:via-purple-600 hover:to-pink-600",
                  "shadow-lg hover:shadow-xl transition-all duration-300",
                  "group"
                )}
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Resume</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* PDF Preview */}
        {resumeDetails.downloadUrl && (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Resume Preview</span>
              </div>
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors border border-white/30"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">Open Full</span>
              </motion.button>
            </div>
            
            <div className="w-full h-[600px] bg-neutral-50 dark:bg-neutral-950">
              <iframe
                src={resumeDetails.downloadUrl}
                width="100%"
                height="100%"
                className="border-0"
                title="Resume Preview"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Resume;