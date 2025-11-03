'use client';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import { PresetReply } from '@/components/chat/preset-reply';
import { presetReplies } from '@/lib/config-loader';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import HelperBoost from './HelperBoost';
import { useSimpleChat } from '@/hooks/useSimpleChat';

// ClientOnly component for client-side rendering
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

// Avatar component
interface AvatarProps {
  hasActiveTool: boolean;
}

const Avatar = ({ hasActiveTool }: AvatarProps) => {
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
};

const Chat = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [presetReply, setPresetReply] = useState<{
    question: string;
    reply: string;
    tool: string;
  } | null>(null);
  
  // Store suggestions per message
  const [messageSuggestions, setMessageSuggestions] = useState<Map<string, Array<{ question: string; answer: string }>>>(new Map());
  const [isMounted, setIsMounted] = useState(false);

  const {
    messages,
    input,
    isLoading,
    error,
    setInput,
    sendMessage,
    stop,
    handleInputChange,
  } = useSimpleChat();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const submitQuery = useCallback(async (query: string) => {
    if (!query.trim() || isLoading) return;
    
    // Check if this is a preset question first
    if (presetReplies[query as keyof typeof presetReplies]) {
      const preset = presetReplies[query as keyof typeof presetReplies];
      setPresetReply({ question: query, reply: preset.reply, tool: preset.tool });
      return;
    }
    
    setPresetReply(null);
    try {
      const result = await sendMessage(query);
      if (result?.suggestions) {
        setMessageSuggestions(prev => {
          const newMap = new Map(prev);
          newMap.set(result.message.id, result.suggestions);
          return newMap;
        });
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }, [isLoading, sendMessage]);

  const handlePresetReply = (question: string, reply: string, tool: string) => {
    setPresetReply({ question, reply, tool });
  };

  const handleGetAIResponse = (question: string) => {
    setPresetReply(null);
    submitQuery(question);
  };

  // Handle auto-submit initial query
  useEffect(() => {
    if (initialQuery && !autoSubmitted && isMounted) {
      setAutoSubmitted(true);
      setInput('');
      submitQuery(initialQuery);
    }
  }, [initialQuery, autoSubmitted, setInput, submitQuery, isMounted]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    submitQuery(input);
    setInput('');
  };

  const handleStop = () => {
    stop();
  };

  // Get current assistant message
  const currentAssistantMessage = useMemo(() => {
    const latestAssistantIndex = messages.findLastIndex(
      (m) => m.role === 'assistant'
    );
    return latestAssistantIndex !== -1 ? messages[latestAssistantIndex] : null;
  }, [messages]);

  // Show landing page when: mounted, no messages, no preset reply, (no initial query OR already submitted), not loading
  const showLanding = isMounted && messages.length === 0 && !presetReply && (!initialQuery || autoSubmitted) && !isLoading;

  // Calculate header height
  const headerHeight = 180;

  // Determine what to render
  let contentToRender: React.ReactNode = null;

  if (showLanding) {
    contentToRender = (
      <div className="w-full">
        <ChatLanding 
          submitQuery={submitQuery} 
          handlePresetReply={handlePresetReply}
        />
      </div>
    );
  } else if (presetReply) {
    contentToRender = (
      <div className="pb-4">
        <PresetReply
          question={presetReply.question}
          reply={presetReply.reply}
          tool={presetReply.tool}
          onGetAIResponse={handleGetAIResponse}
          onClose={() => setPresetReply(null)}
        />
      </div>
    );
  } else if (error) {
    contentToRender = (
      <div className="px-4 pt-4">
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div className="space-y-4 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center">
                  <span className="text-white text-lg">⚠️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                    Error
                  </h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    {error}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setPresetReply(null);
                  window.location.href = '/';
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Go Back
              </button>
            </div>
          </ChatBubbleMessage>
        </ChatBubble>
      </div>
    );
  } else if (currentAssistantMessage) {
    contentToRender = (
      <div className="pb-4">
        <SimplifiedChatView
          message={currentAssistantMessage}
          isLoading={isLoading}
          suggestedQuestions={messageSuggestions.get(currentAssistantMessage.id) || []}
          onQuestionClick={(question) => {
            submitQuery(question);
          }}
        />
      </div>
    );
  } else if (isLoading) {
    contentToRender = (
      <div className="px-4 pt-4">
        <ChatBubble variant="received">
          <ChatBubbleMessage isLoading />
        </ChatBubble>
      </div>
    );
  } else {
    // Fallback - always show landing if nothing else
    contentToRender = (
      <div className="w-full">
        <ChatLanding 
          submitQuery={submitQuery} 
          handlePresetReply={handlePresetReply}
        />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-white dark:bg-neutral-950">
      {/* Fixed Avatar Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
        <div className="py-6">
          <div className="flex justify-center">
            <ClientOnly>
              <Avatar hasActiveTool={false} />
            </ClientOnly>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className="w-full h-full overflow-y-auto"
        style={{ 
          paddingTop: `${headerHeight + 20}px`,
          paddingBottom: '220px'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-400px)]">
          {contentToRender}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col items-center gap-3">
            <HelperBoost 
              submitQuery={submitQuery} 
              setInput={setInput} 
              handlePresetReply={handlePresetReply}
            />
            <ChatBottombar
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={onSubmit}
              isLoading={isLoading}
              stop={handleStop}
              isToolInProgress={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;