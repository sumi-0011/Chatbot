import type {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { Configuration, OpenAIApi } from 'openai';

export interface MessageType {
  content: string;
  author: string | number;
  createdAt: number;
}

export interface ChattingItemType {
  roomName: string;
  peopleCount: string;
  messages: MessageType[];
  roomId: string;
}

export const USER = 0;
export const CHAT_HISTORY_STORAGE_KEY = 'room-';
const CHAT_ROOM_LIST_STORAGE_KEY = 'chatroom-list';
export const API_STORAGE_KEY = 'open-api-key';

export const setAPIKeyToStorage = (API_KEY: string) => {
  localStorage.setItem(API_STORAGE_KEY, API_KEY);
};

export const getChatHistoryToStorage = (roomId: string) => {
  const chatHistory = localStorage.getItem(CHAT_HISTORY_STORAGE_KEY + roomId);
  if (chatHistory) {
    return JSON.parse(chatHistory);
  } else {
    return { roomId, messages: [] };
  }
};

export const setChatHistoryToStorage = (chatHistory: {
  roomId: string;
  messages: MessageType[];
  roomName: string;
  peopleCount: string;
}) => {
  localStorage.setItem(
    CHAT_HISTORY_STORAGE_KEY + chatHistory.roomId,
    JSON.stringify(chatHistory),
  );
};

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

export const addChatRoom = (roomName: string, peopleCount: string) => {
  const roomId = String(Date.now());
  const chatData: ChattingItemType = {
    roomName,
    peopleCount: String(peopleCount),
    messages: [],
    roomId,
  };

  setChatHistoryToStorage(chatData);

  const chatroomList = localStorage.getItem(CHAT_ROOM_LIST_STORAGE_KEY);
  if (chatroomList) {
    const chatroomListData = JSON.parse(chatroomList);
    chatroomListData.push(roomId);

    localStorage.setItem(
      CHAT_ROOM_LIST_STORAGE_KEY,
      JSON.stringify(chatroomListData),
    );
  } else {
    localStorage.setItem(CHAT_ROOM_LIST_STORAGE_KEY, JSON.stringify([roomId]));
  }

  return chatData;
};

export const getChatRoomList = () => {
  const chatroomListStr = localStorage.getItem(CHAT_ROOM_LIST_STORAGE_KEY);
  if (chatroomListStr) {
    const chatroomIdList = JSON.parse(chatroomListStr);

    const chatroomList = chatroomIdList.map((roomId: string) => {
      const chatroom = getChatHistoryToStorage(roomId);
      return chatroom;
    });

    return chatroomList;
  } else {
    return [];
  }
};

export const editChatRoom = (
  roomId: string,
  roomName: string,
  peopleCount: string,
) => {
  const chatHistory = getChatHistoryToStorage(roomId);
  chatHistory.roomName = roomName;
  chatHistory.peopleCount = peopleCount;
  setChatHistoryToStorage(chatHistory);
};

export const deleteChatRoom = (roomId: string) => {
  localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY + roomId);
  const chatroomListStr = localStorage.getItem(CHAT_ROOM_LIST_STORAGE_KEY);
  if (chatroomListStr) {
    const chatroomIdList = JSON.parse(chatroomListStr);
    const newChatroomIdList = chatroomIdList.filter(
      (id: string) => id !== roomId,
    );
    localStorage.setItem(
      CHAT_ROOM_LIST_STORAGE_KEY,
      JSON.stringify(newChatroomIdList),
    );
  }
};
