// Simple message types without AI SDK dependency
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export interface ChatResponse {
  answer: string;
  suggestions: Array<{
    question: string;
    answer: string;
  }>;
}
