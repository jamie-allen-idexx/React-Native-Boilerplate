import AIAgentService from './aiAgent';

describe('AIAgentService', () => {
  describe('getInitialPleasantry', () => {
    it('should return a pleasantry with text and timestamp', () => {
      const response = AIAgentService.getInitialPleasantry();

      expect(response).toBeDefined();
      expect(response.text).toBeTruthy();
      expect(response.timestamp).toBeInstanceOf(Date);
    });

    it('should return one of the predefined pleasantries', () => {
      const expectedPleasantries = [
        'Hello! How can I help you today?',
        'Hi there! What would you like to chat about?',
        "Greetings! I'm here to assist you.",
        'Welcome! How may I be of service?',
        "Good to see you! What's on your mind?",
      ];

      const response = AIAgentService.getInitialPleasantry();
      expect(expectedPleasantries).toContain(response.text);
    });
  });

  describe('generateResponse', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return a response with text and timestamp', async () => {
      const responsePromise = AIAgentService.generateResponse('Hello');
      jest.runAllTimers();
      const response = await responsePromise;

      expect(response).toBeDefined();
      expect(response.text).toBeTruthy();
      expect(response.timestamp).toBeInstanceOf(Date);
    });

    it('should respond appropriately to greeting', async () => {
      const responsePromise = AIAgentService.generateResponse('Hello');
      jest.runAllTimers();
      const response = await responsePromise;

      expect(response.text).toContain('Hello');
    });

    it('should respond appropriately to help request', async () => {
      const responsePromise = AIAgentService.generateResponse('I need help');
      jest.runAllTimers();
      const response = await responsePromise;

      expect(response.text.toLowerCase()).toContain('help');
    });

    it('should respond appropriately to goodbye', async () => {
      const responsePromise = AIAgentService.generateResponse('Goodbye');
      jest.runAllTimers();
      const response = await responsePromise;

      expect(response.text).toContain('Goodbye');
    });

    it('should respond appropriately to thank you', async () => {
      const responsePromise = AIAgentService.generateResponse('Thank you');
      jest.runAllTimers();
      const response = await responsePromise;

      expect(response.text).toContain('welcome');
    });

    it('should respond to questions', async () => {
      const responsePromise = AIAgentService.generateResponse(
        'What is your purpose?',
      );
      jest.runAllTimers();
      const response = await responsePromise;

      expect(response.text).toBeTruthy();
      expect(response.text.length).toBeGreaterThan(0);
    });

    it('should provide a general response for other messages', async () => {
      const responsePromise = AIAgentService.generateResponse('Random message');
      jest.runAllTimers();
      const response = await responsePromise;

      expect(response.text).toBeTruthy();
      expect(response.text.length).toBeGreaterThan(0);
    });
  });
});
