import { findBestMatch, getSuggestedQuestions, qaData } from '@/lib/qa-data';
import { ChatResponse } from '@/types/chat';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage?.content || '';
    
    if (!userInput.trim()) {
      return new Response(JSON.stringify({ 
        error: 'No input provided',
        type: 'invalid_input'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Find best matching Q&A
    const match = findBestMatch(userInput);
    
    if (!match) {
      // Return a friendly message if no match found
      const defaultAnswer = "I'm sorry, I couldn't find a specific answer to that question. Could you try rephrasing it or ask one of the suggested questions below?";
      const suggestedQuestions = getSuggestedQuestions(new Set(), 5);
      
      const response: ChatResponse = {
        answer: defaultAnswer,
        suggestions: suggestedQuestions.map(qa => ({
          question: qa.question,
          answer: qa.answer
        }))
      };
      
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Track which questions have been asked (based on message history)
    const askedQuestionIds = new Set<number>();
    messages.forEach((msg: any) => {
      if (msg.role === 'user') {
        const msgMatch = findBestMatch(msg.content);
        if (msgMatch) {
          const qaIndex = qaData.findIndex(qa => qa.question === msgMatch.question);
          if (qaIndex !== -1) {
            askedQuestionIds.add(qaIndex);
          }
        }
      }
    });
    
    // Get suggested questions (excluding the current one and already asked ones)
    const currentQaIndex = qaData.findIndex(qa => qa.question === match.question);
    if (currentQaIndex !== -1) {
      askedQuestionIds.add(currentQaIndex);
    }
    
    const suggestedQuestions = getSuggestedQuestions(askedQuestionIds, 3);
    
    const response: ChatResponse = {
      answer: match.answer,
      suggestions: suggestedQuestions.map(qa => ({
        question: qa.question,
        answer: qa.answer
      }))
    };
    
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return new Response(JSON.stringify({ 
      error: `Internal Server Error: ${errorMessage}`,
      type: 'server_error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
