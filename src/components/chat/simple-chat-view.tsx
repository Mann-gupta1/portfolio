'use client';

import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { motion } from 'framer-motion';
import { ChatMessage } from '@/types/chat';
import { SuggestedQuestions } from './suggested-questions';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SimplifiedChatViewProps {
  message: ChatMessage;
  isLoading: boolean;
  suggestedQuestions?: Array<{ question: string; answer: string }>;
  onQuestionClick?: (question: string) => void;
}

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1] as const,
  },
};

export function SimplifiedChatView({
  message,
  isLoading,
  suggestedQuestions = [],
  onQuestionClick,
}: SimplifiedChatViewProps) {
  if (message.role !== 'assistant') return null;

  const hasTextContent = message.content?.trim().length > 0;

  return (
    <motion.div {...MOTION_CONFIG} className="flex h-full w-full flex-col px-4">
      <div className="custom-scrollbar flex h-full w-full flex-col overflow-y-auto">
        {hasTextContent && (
          <div className="w-full">
            <ChatBubble variant="received" className="w-full">
              <ChatBubbleMessage className="w-full">
                <div className="prose dark:prose-invert w-full max-w-none">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="break-words whitespace-pre-wrap mb-2">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-4 list-disc pl-6">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="my-4 list-decimal pl-6">{children}</ol>
                      ),
                      li: ({ children }) => <li className="my-1">{children}</li>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {children}
                        </a>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold">{children}</strong>
                      ),
                    }}
                  >
                    {message.content}
                  </Markdown>
                </div>
                {/* Display suggested questions below the answer */}
                {!isLoading && suggestedQuestions.length > 0 && onQuestionClick && (
                  <SuggestedQuestions
                    questions={suggestedQuestions}
                    onQuestionClick={onQuestionClick}
                  />
                )}
              </ChatBubbleMessage>
            </ChatBubble>
          </div>
        )}

        <div className="pb-4"></div>
      </div>
    </motion.div>
  );
}