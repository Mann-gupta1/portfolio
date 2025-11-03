'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, X, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatBubble, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';

// Import components
import { Presentation } from '@/components/presentation';
import AllProjects from '@/components/projects/AllProjects';
import Skills from '@/components/skills';
import { Contact } from '@/components/contact';
import Resume from '@/components/resume';
import AvailabilityCard from '@/components/AvailabilityCard';

interface PresetReplyProps {
  question: string;
  reply: string;
  tool: string;
  onGetAIResponse: (question: string) => void;
  onClose?: () => void;
}

export function PresetReply({ question, reply, tool, onGetAIResponse, onClose }: PresetReplyProps) {
  // Render components based on tool
  const renderPresetComponent = () => {
    switch (tool) {
      case 'getPresentation':
        return (
          <div className="w-full overflow-hidden rounded-lg mb-4">
            <Presentation />
          </div>
        );
      
      case 'getProjects':
        return (
          <div className="w-full overflow-hidden rounded-lg mb-4">
            <AllProjects />
          </div>
        );
      
      case 'getSkills':
        return (
          <div className="w-full rounded-lg mb-4">
            <Skills />
          </div>
        );
      
      case 'getContact':
        return (
          <div className="w-full rounded-lg mb-4">
            <Contact />
          </div>
        );
      
      case 'getResume':
        return (
          <div className="w-full rounded-lg mb-4">
            <Resume />
          </div>
        );
      
      case 'getInternship':
        return (
          <div className="w-full rounded-lg mb-4">
            <AvailabilityCard />
          </div>
        );
      
      default:
        return null;
    }
  };

  const presetComponent = renderPresetComponent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto mb-4"
    >
      {presetComponent ? (
        <div className="w-full space-y-4">
          {presetComponent}
          
          {onClose && (
            <div className="flex justify-end">
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-200/50 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100/50 dark:border-blue-800/50 w-full">
            <div className="space-y-4 p-6 w-full">
              {onClose && (
                <div className="flex justify-end">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-gray-200/50 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 px-2">
                {reply.split('\n').map((line, index) => {
                  if (line.trim() === '') return <br key={index} />;
                  
                  if (line.includes('Download Resume Here') && line.includes('http')) {
                    const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
                    if (urlMatch) {
                      return (
                        <div key={index} className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <Download className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <span className="font-semibold text-blue-900 block">Resume Available</span>
                                <span className="text-xs text-blue-700">Click to download PDF</span>
                              </div>
                            </div>
                            <Button
                              onClick={() => window.open(urlMatch[1], '_blank')}
                              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                              size="sm"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      );
                    }
                  }
                  
                  if (line.includes('http')) {
                    const parts = line.split(/(https?:\/\/[^\s]+)/);
                    return (
                      <p key={index} className="mb-3 last:mb-0 leading-relaxed">
                        {parts.map((part, partIndex) => {
                          if (part.match(/^https?:\/\//)) {
                            return (
                              <a
                                key={partIndex}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 font-medium"
                              >
                                {part}
                              </a>
                            );
                          }
                          return part;
                        })}
                      </p>
                    );
                  }
                  
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <p key={index} className="mb-3 last:mb-0 leading-relaxed">
                        {parts.map((part, partIndex) => 
                          partIndex % 2 === 1 ? 
                            <strong key={partIndex} className="font-semibold text-gray-800 dark:text-gray-200">{part}</strong> : 
                            part
                        )}
                      </p>
                    );
                  }
                  
                  if (/^[🎯🚀💼🏆📊🔧🌟💡🎓📍🌍⚡🤝]/u.test(line)) {
                    return (
                      <p key={index} className="mb-2 last:mb-0 font-medium text-gray-800 dark:text-gray-200 text-base">
                        {line}
                      </p>
                    );
                  }
                  
                  if (line.startsWith('• ') || line.startsWith('- ')) {
                    return (
                      <p key={index} className="mb-1 last:mb-0 ml-4 text-gray-600 dark:text-gray-400">
                        {line}
                      </p>
                    );
                  }
                  
                  return (
                    <p key={index} className="mb-2 last:mb-0 leading-relaxed">
                      {line}
                    </p>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200/60 pt-4 mt-4">
                <Button 
                  onClick={() => onGetAIResponse(question)}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600 hover:text-white shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <Sparkles className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  Get More Details
                </Button>
              </div>
            </div>
          </ChatBubbleMessage>
        </ChatBubble>
      )}
    </motion.div>
  );
}