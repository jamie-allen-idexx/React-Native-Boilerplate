const pleasantries = [
  'Hello! How can I help you today?',
  'Hi there! What would you like to chat about?',
  'Hey! I am here to help. Ask me anything.',
];

const DEFAULT_PLEASANTRY = 'Hello! How can I help you today?';

const getInitialPleasantry = (): string => {
  const index = Math.floor(Math.random() * pleasantries.length);
  const pick = pleasantries[index];
  return pick ?? DEFAULT_PLEASANTRY;
};

const respond = async (userInput: string): Promise<string> => {
  const lower = userInput.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello! Great to hear from you. How can I assist?';
  }
  if (lower.includes('help')) {
    return 'Sure — tell me a bit more about what you need help with.';
  }
  if (lower.includes('appointment')) {
    return 'For appointments, please share your preferred date and time.';
  }

  // Fallback playful echo with slight variation
  return `You said: "${userInput}". Tell me more!`;
};

export const aiAgent = { getInitialPleasantry, respond };
