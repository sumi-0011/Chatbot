import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { useEffect, useRef, useState } from 'react';

import {
  getChatBotMessage,
  getChatHistoryToStorage,
  getOpenAPI,
  getSystemMessage,
  ROLE_STRING,
  setChatHistoryToStorage,
  USER,
} from '@/utils/chat';

interface MessageType {
  content: string;
  author: string | number;
  createdAt: number;
}

interface ChatCompletionRequestMessageType {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
}

interface UseChatReturns {
  messages: MessageType[];
  isLoading: boolean;
  submitChat: (input: string) => void;
}

interface UseChatProps {
  people: number;
  roomId: string;
  roomName: string;
}
const useChat = ({
  people,
  roomId,
  roomName,
}: UseChatProps): UseChatReturns => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_KEY = useRef('');

  const addMessages = (newMessage: MessageType[]) => {
    setMessages((prev) => [...prev, ...newMessage]);
  };

  const actionChat = async (message: string) => {
    const openai = getOpenAPI(API_KEY.current);

    const chattingHistory: ChatCompletionRequestMessageType[] = messages.map(
      (m) => {
        return {
          role: m.author === USER ? ROLE_STRING.USER : ROLE_STRING.ASSISTANT,
          content: `[${m.author}] ${m.content}`,
        };
      },
    );

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        getSystemMessage(people - 1),
        ...chattingHistory,
        { role: ROLE_STRING.USER, content: message },
      ],
    });

    return completion;
  };

  const submitChat = async (input: string) => {
    if (isLoading || !input.length) return;

    const newMessage: MessageType = {
      author: USER,
      content: input,
      createdAt: Date.now(),
    };
    addMessages([newMessage]);

    setIsLoading(true);

    try {
      const result = await actionChat(input);
      if (
        result.status !== 200 ||
        result.data.choices[0].finish_reason !== 'stop' ||
        !result.data.choices[0].message
      ) {
        throw new Error();
      }

      const receiveMessageContents = getChatBotMessage(
        result.data.choices[0].message.content,
      );

      const receiveMessages = receiveMessageContents.map(
        ({ author, content }) => {
          return {
            author: author.substring(1, author.length - 1),
            content: content,
            createdAt: Date.now(),
          };
        },
      );
      addMessages(receiveMessages);
    } catch (error) {
      const newMessage: MessageType = {
        author: 1,
        content: '오류가 발생했습니다. 다시 시도해주세요.',
        createdAt: Date.now(),
      };
      addMessages([newMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const key = localStorage.getItem('open-api-key');
    if (key) {
      API_KEY.current = key;
    } else {
      alert('API KEY가 없습니다.');
    }

    const chatHistory = getChatHistoryToStorage(roomId);
    if (chatHistory) {
      setMessages(chatHistory.messages);
    }
  }, [roomId]);

  useEffect(() => {
    if (messages.length) {
      setChatHistoryToStorage({ roomId, messages, roomName });
    }
  }, [messages, roomId, roomName]);

  return { messages, submitChat, isLoading };
};

export default useChat;
