'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface SuggestedQuestion {
  question: string;
  answer: string;
}

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onQuestionClick: (question: string) => void;
}

export function SuggestedQuestions({ questions, onQuestionClick }: SuggestedQuestionsProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="mt-4 space-y-2"
    >
      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Suggested questions:</p>
      <div className="flex flex-col gap-2">
        {questions.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            onClick={() => onQuestionClick(item.question)}
            className="group flex items-start gap-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50 px-4 py-3 text-left text-sm transition-all hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="h-4 w-4 mt-0.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
            <span className="text-neutral-700 dark:text-neutral-300">{item.question}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
