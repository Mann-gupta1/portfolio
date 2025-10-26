'use client';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatMessageContent from '@/components/chat/chat-message-content';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import { PresetReply } from '@/components/chat/preset-reply';
import { presetReplies } from '@/lib/config-loader';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import HelperBoost from './HelperBoost';

// ClientOnly component for client-side rendering
//@ts-ignore
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

// Define Avatar component props interface
interface AvatarProps {
  hasActiveTool: boolean;
}

// Dynamic import of Avatar component
const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(({ hasActiveTool }: AvatarProps) => {
      // Conditional rendering based on detection
      return (
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <img
              src="/favicon.ico"
              alt="Mann's Avatar"
              className="h-full w-full object-cover object-[center_top_-5%] scale-95 rounded-full"
            />
          </div>
        </div>
      );
    }),
  { ssr: false }
);

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

const Chat = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [presetReply, setPresetReply] = useState<{
    question: string;
    reply: string;
    tool: string;
  } | null>(null);

  // Fallback answers for common questions when API fails
  const fallbackAnswers: Record<string, string> = {
    "who are you": "🧑‍💻 **Who are you?**\n\nI'm Mann Gupta, a passionate Software Engineer skilled in Backend Development, AI/ML, and DevOps, focused on building scalable and intelligent systems.",
    "what are your passions": "❤️ **What are your passions?**\n\nI love solving real-world problems using AI-driven automation, optimizing systems for efficiency and performance, and continuously exploring new technologies.",
    "how did you get started in tech": "💡 **How did you get started in tech?**\n\nMy journey began with curiosity about how apps work under the hood — I started coding in C++, solving problems on LeetCode, and later expanded into AI and cloud technologies, which shaped my passion for full-stack and intelligent system design.",
    "where do you see yourself in 5 years": "🚀 **Where do you see yourself in 5 years?**\n\nI see myself leading impactful projects as a Software Engineer or AI Systems Architect, designing scalable backend infrastructures and intelligent automation tools that make technology more adaptive and efficient.",
    "can i see your resume": "📄 **Can I see your resume?**\n\nYes! I'll be happy to share it — you can view or download my updated resume once I upload it.",
    "what makes you a valuable team member": "🤝 **What makes you a valuable team member?**\n\nI bring a strong sense of ownership, collaboration, and adaptability. I'm a fast learner who enjoys working across teams, solving complex problems, and contributing to projects that demand creativity and precision.",
    "where are you working now": "💼 **Where are you working now?**\n\nI recently completed internships at WorkIndia, ITC Infotech, and Gush, where I worked on backend microservices, AI automation, and scalable cloud systems.",
    "why should i hire you": "🌟 **Why should I hire you?**\n\nBecause I combine technical depth with a problem-solving mindset — I design reliable systems, automate processes, and deliver measurable impact. I take initiative, adapt quickly, and always focus on optimizing results.",
    "what's your educational background": "🎓 **What's your educational background?**\n\nI'm pursuing a B.Tech in Information Technology from Rajiv Gandhi Institute of Petroleum Technology (RGIPT), with a current CGPA of 8.25/10.",
    "what projects are you most proud of": "🧠 **What projects are you most proud of?**\n\nI'm most proud of:\n\n• **Multi-Tenant Project Management System** – a Jira-like task manager for multiple organizations.\n• **AI-Powered Course Differentiator** – identifies the best courses using AI chatbots and web scraping.\n• **Player-Ball Interaction Analysis** – applies deep learning for real-time sports analytics.",
    "what are your skills": "⚙️ **What are your skills?**\n\n**Languages:** Python, C++, Java, JavaScript, TypeScript\n**Frameworks:** Node.js, React.js, Django, Next.js\n**AI/ML:** TensorFlow, Keras, Scikit-learn, LangChain, Agentic AI\n**Databases:** MySQL, PostgreSQL, MongoDB\n**Cloud/DevOps:** AWS (EC2, EKS, S3), Docker, Kubernetes, Jenkins, CI/CD",
    "how was your experience working as freelancer": "💻 **How was your experience working as a freelancer?**\n\nFreelancing taught me client communication, project ownership, and adaptability — I learned to deliver end-to-end solutions efficiently while maintaining quality and deadlines.",
    "how can i reach you": "📬 **How can I reach you?**\n\nYou can contact me at **manngupta923@gmail.com** or connect via [LinkedIn](https://linkedin.com/in/gupta-mann).",
    "what kind of project would make you say yes immediately": "💭 **What kind of project would make you say \"yes\" immediately?**\n\nAny project that involves AI integration, backend optimization, or cloud automation — especially where I can solve technical challenges and build something scalable from scratch.",
    "where are you located": "📍 **Where are you located?**\n\nI'm based in Bangalore, India, and open to remote roles or relocation for the right opportunity."
  };

  // Function to find the best matching fallback answer
  const findFallbackAnswer = (question: string): string | null => {
    const normalizedQuestion = question.toLowerCase().trim();
    
    // Direct matches first
    for (const [key, answer] of Object.entries(fallbackAnswers)) {
      if (normalizedQuestion.includes(key)) {
        return answer;
      }
    }
    
    // Partial matches for common question patterns
    if (normalizedQuestion.includes('who') && normalizedQuestion.includes('you')) {
      return fallbackAnswers["who are you"];
    }
    if (normalizedQuestion.includes('passion')) {
      return fallbackAnswers["what are your passions"];
    }
    if (normalizedQuestion.includes('started') || normalizedQuestion.includes('begin')) {
      return fallbackAnswers["how did you get started in tech"];
    }
    if (normalizedQuestion.includes('5 years') || normalizedQuestion.includes('future')) {
      return fallbackAnswers["where do you see yourself in 5 years"];
    }
    if (normalizedQuestion.includes('resume') || normalizedQuestion.includes('cv')) {
      return fallbackAnswers["can i see your resume"];
    }
    if (normalizedQuestion.includes('valuable') || normalizedQuestion.includes('team')) {
      return fallbackAnswers["what makes you a valuable team member"];
    }
    if (normalizedQuestion.includes('working') || normalizedQuestion.includes('job')) {
      return fallbackAnswers["where are you working now"];
    }
    if (normalizedQuestion.includes('hire') || normalizedQuestion.includes('why')) {
      return fallbackAnswers["why should i hire you"];
    }
    if (normalizedQuestion.includes('education') || normalizedQuestion.includes('degree')) {
      return fallbackAnswers["what's your educational background"];
    }
    if (normalizedQuestion.includes('project') && normalizedQuestion.includes('proud')) {
      return fallbackAnswers["what projects are you most proud of"];
    }
    if (normalizedQuestion.includes('skill')) {
      return fallbackAnswers["what are your skills"];
    }
    if (normalizedQuestion.includes('freelancer') || normalizedQuestion.includes('freelance')) {
      return fallbackAnswers["how was your experience working as freelancer"];
    }
    if (normalizedQuestion.includes('contact') || normalizedQuestion.includes('reach')) {
      return fallbackAnswers["how can i reach you"];
    }
    if (normalizedQuestion.includes('project') && normalizedQuestion.includes('yes')) {
      return fallbackAnswers["what kind of project would make you say yes immediately"];
    }
    if (normalizedQuestion.includes('location') || normalizedQuestion.includes('where')) {
      return fallbackAnswers["where are you located"];
    }
    
    return null;
  };

  // Global error handler for unhandled errors
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      setLoadingSubmit(false);
      setErrorMessage('An unexpected error occurred. Please try again.');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setLoadingSubmit(false);
      setErrorMessage('An unexpected error occurred. Please try again.');
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
    setInput,
    reload,
    addToolResult,
    append,
  } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      try {
        if (response) {
          setLoadingSubmit(false);
        }
      } catch (error) {
        console.error('Error in onResponse:', error);
        setLoadingSubmit(false);
      }
    },
    onFinish: () => {
      try {
        setLoadingSubmit(false);
      } catch (error) {
        console.error('Error in onFinish:', error);
        setLoadingSubmit(false);
      }
    },
    onError: (error) => {
      setLoadingSubmit(false);
      console.error('Chat error:', error);
      
      // Safely extract error message
      const errorMessage = error?.message || error?.toString() || 'An error occurred';
      console.error('Error message:', errorMessage);
      
      // Get the last user message to find fallback answer
      const lastUserMessage = messages[messages.length - 1];
      const userQuestion = lastUserMessage?.content || '';
      
      // Try to find a fallback answer for the question
      const fallbackAnswer = findFallbackAnswer(userQuestion);
      
      if (fallbackAnswer) {
        // Show success notification
        toast.success('✅ Using fallback response due to API error', {
          duration: 3000,
          style: {
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            color: '#0c4a6e',
            fontSize: '14px',
            fontWeight: '500',
          },
        });
        
        // Add the fallback answer to the chat
        try {
          append({
            role: 'assistant',
            content: fallbackAnswer,
          });
          setErrorMessage(null);
        } catch (appendError) {
          console.error('Failed to append fallback answer:', appendError);
          setErrorMessage('An error occurred. Please try again.');
        }
      } else {
        // Handle specific error types when no fallback is available
        if (errorMessage.includes('quota') || errorMessage.includes('exceeded') || errorMessage.includes('429')) {
          // Show a friendly notification for quota issues
          toast.error('⚠️ API Quota Exhausted! Free Gemini API limit reached. Please contact Mann directly or use preset questions. Thank you for understanding! 🙏', {
            duration: 6000, // Show for 6 seconds
            style: {
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              color: '#92400e',
              fontSize: '14px',
              fontWeight: '500',
            },
          });
          
          // Set error message state for frontend display
          setErrorMessage('quota_exhausted');
          
          // Try to add a chat bubble with the error message
          try {
            append({
              role: 'assistant',
              content: '⚠️ **API Quota Exhausted**\n\nFree Gemini API limit reached. Please contact Mann directly or use preset questions below.',
            });
          } catch (appendError) {
            console.error('Failed to append error message:', appendError);
          }
        } else if (errorMessage.includes('network')) {
          toast.error('Network error. Please check your connection and try again.');
          setErrorMessage('Network error. Please check your connection and try again.');
        } else {
          toast.error(`Error: ${errorMessage}`);
          setErrorMessage(`Error: ${errorMessage}`);
        }
      }
    },
    onToolCall: (tool) => {
      const toolName = tool.toolCall.toolName;
      console.log('Tool call:', toolName);
    },
  });

  // Debug logging to check useChat hook functions
  useEffect(() => {
    console.log('useChat functions:', {
      handleInputChange: typeof handleInputChange,
      setInput: typeof setInput,
      input: input,
      handleSubmit: typeof handleSubmit
    });
  }, [handleInputChange, setInput, input, handleSubmit]);

  const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
    const latestAIMessageIndex = messages.findLastIndex(
      (m) => m.role === 'assistant'
    );
    const latestUserMessageIndex = messages.findLastIndex(
      (m) => m.role === 'user'
    );

    const result = {
      currentAIMessage:
        latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
      latestUserMessage:
        latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
      hasActiveTool: false,
    };

    if (result.currentAIMessage) {
      result.hasActiveTool =
        result.currentAIMessage.parts?.some(
          (part) =>
            part.type === 'tool-invocation' &&
            part.toolInvocation?.state === 'result'
        ) || false;
    }

    if (latestAIMessageIndex < latestUserMessageIndex) {
      result.currentAIMessage = null;
    }

    return result;
  }, [messages]);

  const isToolInProgress = messages.some(
    (m) =>
      m.role === 'assistant' &&
      m.parts?.some(
        (part) =>
          part.type === 'tool-invocation' &&
          part.toolInvocation?.state !== 'result'
      )
  );

  //@ts-ignore
  const submitQuery = (query) => {
    if (!query.trim() || isToolInProgress) return;
    
    // Clear any previous error message
    setErrorMessage(null);
    
    // Check if this is a preset question first
    if (presetReplies[query]) {
      const preset = presetReplies[query];
      setPresetReply({ question: query, reply: preset.reply, tool: preset.tool });
      setLoadingSubmit(false);
      return;
    }
    
    // Check if we have a fallback answer for this query
    const fallbackAnswer = findFallbackAnswer(query);
    if (fallbackAnswer) {
      setLoadingSubmit(true);
      setPresetReply(null);
      
      // Add user message
      append({
        role: 'user',
        content: query,
      });
      
      // Add fallback answer immediately
      setTimeout(() => {
        append({
          role: 'assistant',
          content: fallbackAnswer,
        });
        setLoadingSubmit(false);
      }, 500);
      
      return;
    }
    
    setLoadingSubmit(true);
    setPresetReply(null); // Clear any preset reply when submitting new query
    append({
      role: 'user',
      content: query,
    });
  };

  //@ts-ignore
  const submitQueryToAI = (query) => {
    if (!query.trim() || isToolInProgress) return;
    
    // Clear any previous error message
    setErrorMessage(null);
    
    // Force AI response, bypass preset checking
    setLoadingSubmit(true);
    setPresetReply(null);
    append({
      role: 'user',
      content: query,
    });
  };

  //@ts-ignore
  const handlePresetReply = (question, reply, tool) => {
    setPresetReply({ question, reply, tool });
    setLoadingSubmit(false);
  };

  //@ts-ignore
  const handleGetAIResponse = (question, tool) => {
    setPresetReply(null);
    submitQueryToAI(question); // Use the new function that bypasses presets
  };

  useEffect(() => {
    if (initialQuery && !autoSubmitted) {
      setAutoSubmitted(true);
      if (typeof setInput === 'function') {
        setInput('');
      }
      submitQuery(initialQuery);
    }
  }, [initialQuery, autoSubmitted, setInput]);

  //@ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isToolInProgress) return;
    submitQueryToAI(input); // User input should go directly to AI
    setInput('');
  };

  const handleStop = () => {
    stop();
    setLoadingSubmit(false);
  };

  // Check if this is the initial empty state (no messages)
  const isEmptyState =
    !currentAIMessage && !latestUserMessage && !loadingSubmit && !presetReply && !errorMessage;

  // Calculate header height based on hasActiveTool
  const headerHeight = hasActiveTool ? 100 : 180;

  return (
    <div className="relative h-screen overflow-hidden">
      
      {/* Fixed Avatar Header with Gradient */}
      <div
        className="fixed top-0 right-0 left-0 z-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}
        >
          <div className="flex justify-center">
            <ClientOnly>
              <Avatar
                hasActiveTool={hasActiveTool}
              />
            </ClientOnly>
          </div>

          <AnimatePresence>
            {latestUserMessage && !currentAIMessage && (
              <motion.div
                {...MOTION_CONFIG}
                className="mx-auto flex max-w-3xl px-4"
              >
                <ChatBubble variant="sent">
                  <ChatBubbleMessage>
                    <ChatMessageContent
                      message={latestUserMessage}
                      isLast={true}
                      isLoading={false}
                      reload={() => Promise.resolve(null)}
                    />
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto flex h-full max-w-3xl flex-col">
        {/* Scrollable Chat Content */}
        <div
          className="flex-1 overflow-y-auto px-2 pb-4"
          style={{ paddingTop: `${headerHeight}px` }}
        >
          <AnimatePresence mode="wait">
            {isEmptyState ? (
              <motion.div
                key="landing"
                className="flex min-h-full items-center justify-center"
                {...MOTION_CONFIG}
              >
                <ChatLanding 
                  submitQuery={submitQuery} 
                  handlePresetReply={handlePresetReply}
                />
              </motion.div>
            ) : presetReply ? (
              <div className="pb-4">
                <PresetReply
                  question={presetReply.question}
                  reply={presetReply.reply}
                  tool={presetReply.tool}
                  onGetAIResponse={handleGetAIResponse}
                  onClose={() => setPresetReply(null)}
                />
              </div>
            ) : errorMessage ? (
              <motion.div
                key="error"
                {...MOTION_CONFIG}
                className="px-4 pt-4"
              >
                <ChatBubble variant="received">
                  <ChatBubbleMessage className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <div className="space-y-4 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center">
                          <span className="text-white text-lg">⚠️</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                            API Quota Exhausted
                          </h3>
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            Free Gemini API limit reached
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                        <p>
                          Hi! I'm currently using the <strong>free version</strong> of Google's Gemini API, 
                          and today's quota has been reached.
                        </p>
                        
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mt-3">
                          <p className="font-medium mb-2">What you can do:</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Contact me directly for a live demo</li>
                            <li>Use the preset questions below for instant responses</li>
                            <li>Come back tomorrow when the quota resets</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => {
                            setErrorMessage(null);
                            const preset = presetReplies["How can I reach you?"];
                            if (preset) {
                              setPresetReply({ 
                                question: "How can I reach you?", 
                                reply: preset.reply, 
                                tool: preset.tool 
                              });
                            }
                          }}
                          className="px-4 py-2 bg-amber-500 text-white text-sm rounded-md hover:bg-amber-600 transition-colors font-medium"
                        >
                          Contact me
                        </button>
                        <button
                          onClick={() => {
                            setErrorMessage(null);
                            window.location.href = '/';
                          }}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          Use Presets
                        </button>
                      </div>
                      
                      <p className="text-xs text-amber-600 dark:text-amber-400 text-center mt-3">
                        Thank you for your patience! 🙏
                      </p>
                    </div>
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            ) : currentAIMessage ? (
              <div className="pb-4">
                <SimplifiedChatView
                  message={currentAIMessage}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                />
              </div>
            ) : (
              loadingSubmit && (
                <motion.div
                  key="loading"
                  {...MOTION_CONFIG}
                  className="px-4 pt-18"
                >
                  <ChatBubble variant="received">
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="sticky bottom-0 bg-white px-2 pt-3 md:px-0 md:pb-4">
          <div className="relative flex flex-col items-center gap-3">
            <HelperBoost 
              submitQuery={submitQuery} 
              setInput={setInput} 
              handlePresetReply={handlePresetReply}
            />
            <ChatBottombar
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={handleStop}
              isToolInProgress={isToolInProgress}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
