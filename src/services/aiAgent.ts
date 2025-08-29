interface AIResponse {
  text: string;
  timestamp: Date;
}

const pleasantries = [
  'Hello! How can I help you today?',
  'Hi there! What would you like to chat about?',
  "Greetings! I'm here to assist you.",
  'Welcome! How may I be of service?',
  "Good to see you! What's on your mind?",
];

const responses = [
  "That's an interesting point! Tell me more about it.",
  "I understand what you're saying. Have you considered this perspective?",
  'Thanks for sharing that with me. What else would you like to discuss?',
  'That makes sense. How can I help you further with this?',
  'I appreciate your thoughts on this matter.',
  'Let me think about that... What specific aspect interests you most?',
  "That's a great question! Here's what I think...",
  "I'm happy to help with that. Could you provide more details?",
];

class AIAgentService {
  static getInitialPleasantry(): AIResponse {
    const randomIndex = Math.floor(Math.random() * pleasantries.length);
    return {
      text: pleasantries[randomIndex] || 'Hello! How can I help you today?',
      timestamp: new Date(),
    };
  }

  static async generateResponse(userMessage: string): Promise<AIResponse> {
    // Simulate AI processing delay
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 500 + Math.random() * 1000);
    });

    // Simple contextual responses based on user input
    let responseText: string;

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      responseText =
        "Hello! It's great to hear from you. How are you doing today?";
    } else if (lowerMessage.includes('help')) {
      responseText = "I'm here to help! What specific assistance do you need?";
    } else if (lowerMessage.includes('how are you')) {
      responseText =
        "I'm doing well, thank you for asking! I'm here and ready to chat with you.";
    } else if (
      lowerMessage.includes('bye') ||
      lowerMessage.includes('goodbye')
    ) {
      responseText =
        'Goodbye! It was nice chatting with you. Feel free to come back anytime!';
    } else if (lowerMessage.includes('thank')) {
      responseText =
        "You're very welcome! Is there anything else I can help you with?";
    } else if (lowerMessage.includes('?')) {
      responseText =
        "That's a thoughtful question. Let me share my perspective on this...";
    } else {
      // Random response for general messages
      const randomIndex = Math.floor(Math.random() * responses.length);
      responseText = responses[randomIndex] || 'That\'s interesting! Tell me more.';
    }

    return {
      text: responseText,
      timestamp: new Date(),
    };
  }
}

export default AIAgentService;
