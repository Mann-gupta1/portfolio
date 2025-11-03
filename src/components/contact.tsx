'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, MessageCircle, Send } from 'lucide-react';
import { contactInfo, getConfig } from '@/lib/config-loader';

export function Contact() {
  const config = getConfig();
  const phone = config.personal.phone || '+91 6266725150';
  const email = contactInfo.email;
  const location = config.personal.location;

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
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

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      action: handleEmailClick,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: phone,
      action: handlePhoneClick,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: location,
      action: null,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
    },
  ];

  const socialLinks = contactInfo.socials.map((social) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'linkedin': Linkedin,
      'github': Github,
    };
    
    return {
      ...social,
      icon: iconMap[social.name.toLowerCase()] || ExternalLink,
    };
  });

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-2"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Let's connect and build something amazing together
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={item.action || undefined}
                className={cn(
                  "relative group rounded-2xl p-6 border-2 transition-all duration-300",
                  item.bgColor,
                  item.borderColor,
                  item.action && "cursor-pointer hover:shadow-xl"
                )}
              >
                {/* Gradient background on hover */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                  `bg-gradient-to-br ${item.color}`
                )} />
                
                <div className="relative z-10 space-y-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    `bg-gradient-to-br ${item.color}`
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200 break-all">
                      {item.value}
                    </p>
                  </div>
                  {item.action && (
                    <div className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Send className="w-3 h-3" />
                      <span>Click to {item.label === 'Email' ? 'send email' : 'call'}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 text-center">
            Connect on Social Media
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.button
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openLink(social.url)}
                  className="group relative p-4 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <Icon className="w-6 h-6 text-neutral-700 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {social.name}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Action CTA */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-center space-y-4"
        >
          <MessageCircle className="w-12 h-12 text-white mx-auto" />
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Let's Start a Conversation
            </h3>
            <p className="text-white/90 text-sm">
              Have a project in mind? I'd love to hear about it!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmailClick}
              className="px-6 py-3 rounded-full bg-white text-blue-600 font-semibold hover:shadow-xl transition-shadow"
            >
              Send Email
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePhoneClick}
              className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold border-2 border-white/30 hover:bg-white/30 transition-all"
            >
              Call Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export default Contact;