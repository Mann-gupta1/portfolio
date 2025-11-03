'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { profileInfo, getConfig } from '@/lib/config-loader';
import { Code2, Brain, Rocket, Sparkles, Award, MapPin, Calendar } from 'lucide-react';

export function Presentation() {
  const profile = profileInfo;
  const config = getConfig();
  const title = config.personal.title;
  const achievements = config.education.achievements || [];

  // Remove "Freelancer" from tags
  const tags = ['Backend Engineer', 'AI/ML Developer', 'DevOps Engineer', 'Cloud Architect', 'Full-Stack Developer'];

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
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <div className="mx-auto w-full max-w-6xl py-8 md:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-purple-900/20 dark:to-blue-900/20 border border-neutral-200 dark:border-neutral-800">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(219,39,119,0.2),transparent_50%)]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12">
            {/* Image Section */}
            <motion.div
              variants={itemVariants}
              className="relative mx-auto lg:mx-0"
            >
              <div className="relative aspect-square w-full max-w-md mx-auto">
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50 dark:ring-neutral-800/50"
                >
                  <Image
                    src={profile.src}
                    alt={profile.name}
                    fill
                    className="object-cover object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = profile.fallbackSrc;
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center space-y-6"
            >
              {/* Name & Title */}
              <div className="space-y-3">
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  {profile.name}
                </motion.h1>
                
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 text-lg md:text-xl text-neutral-600 dark:text-neutral-400"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>{profile.location}</span>
                  </div>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                >
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  {title}
                </motion.p>
              </div>

              {/* Bio */}
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-line"
              >
                {profile.description}
              </motion.p>

              {/* Key Highlights */}
              {achievements.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-3"
                >
                  {achievements.slice(0, 2).map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 shadow-sm"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {achievement.split('–')[0] || achievement.split('-')[0] || achievement}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Tags Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-3 justify-center md:justify-start"
        >
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                "bg-gradient-to-r from-blue-500/10 to-purple-500/10",
                "dark:from-blue-500/20 dark:to-purple-500/20",
                "border border-blue-200 dark:border-blue-800",
                "text-blue-700 dark:text-blue-300",
                "hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700",
                index === 0 && "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600"
              )}
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export default Presentation;