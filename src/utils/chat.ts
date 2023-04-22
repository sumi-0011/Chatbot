import type {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { Configuration, OpenAIApi } from 'openai';

export const USER = 0;

export const ROLE_STRING: Record<
  'USER' | 'ASSISTANT' | 'SYSTEM',
  ChatCompletionRequestMessageRoleEnum
> = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
};

export const getSystemMessage = (
  maxNumber: number,
): ChatCompletionRequestMessage => {
  return {
    role: ROLE_STRING.SYSTEM,
    content: `You are a chatbot in a chat room where one user and ${maxNumber} chatbots talk. Each message is in the [number] content format, where 0 represents the user's message and 1 ton represents the message of the nth chatbot. You should take the role of all chatbots from 1 to ${maxNumber} and actively engage in conversations. Each chatbot can speak only a few at a time, and one chatbot can speak several times. Format the response in the [number] content format, and separate each message with two lines.`,
  };
};

export const getChatBotMessage = (msg: string) => {
  const messageList = msg.split('\n');

  const chatBotMessage = messageList.map((message) => {
    const author = message.split(' ')[0];
    const content = message.split(' ').slice(1).join(' ');
    return { author, content };
  });

  return chatBotMessage;
};

export const getOpenAPI = (API_KEY: string) => {
  const config = new Configuration({
    apiKey: API_KEY,
  });
  delete config.baseOptions.headers['User-Agent'];
  const openai = new OpenAIApi(config);

  return openai;
};