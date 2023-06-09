import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import BackIcon from '@/components/icon/back';
import SendIcon from '@/components/icon/send';
import Input from '@/components/input';
import ReceiveMessage from '@/components/message/receiver';
import SenderMessage from '@/components/message/sender';
import useChat from '@/hooks/useChat';
import { PointerComponent } from '@/styles/core';
import type { ChattingItemType } from '@/utils/chat';

function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState<ChattingItemType>({
    roomId: String(id),
    roomName: '',
    peopleCount: '0',
    messages: [],
  });

  const { submitChat, messages } = useChat(room);

  const [sendMessage, setSendMessage] = useState('');

  const onSubmit = () => {
    if (sendMessage === '') return;
    setSendMessage('');

    submitChat(sendMessage);
  };

  const onBackClick = () => {
    router.push('/list');
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  useEffect(() => {
    const roomData = JSON.parse(localStorage.getItem('room-' + id) || '[]');
    setRoom(roomData);
  }, [id]);

  return (
    <div>
      <Header>
        <PointerComponent onClick={onBackClick}>
          <BackIcon />
        </PointerComponent>
        <h1>{room.roomName}</h1>
      </Header>
      <MessageContainer>
        {messages.map((message, idx) => {
          return (
            <div key={idx}>
              {message.author === 0 ? (
                <ReceiveMessage message={message} date={message.createdAt} />
              ) : (
                <SenderMessage
                  img="/assets/images/smiling1.png"
                  message={message}
                />
              )}
            </div>
          );
        })}
      </MessageContainer>
      <ChatInputWrapper>
        <Input
          inputSize="sm"
          placeholder="메시지를 입력해주세요."
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
        />
        <IconWrapper onClick={onSubmit}>
          <SendIcon />
        </IconWrapper>
      </ChatInputWrapper>
    </div>
  );
}

const MessageContainer = styled.div`
  margin-top: 80px;
  min-height: calc(100vh - 180px);
  overflow: auto;
`;

const Header = styled.header`
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  padding: 20px;
  position: fixed;
  top: 0;
  display: flex;
  gap: 20px;
`;
const ChatInputWrapper = styled.div`
  width: 100%;
  height: 50px;

  position: relative;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 15px;
  bottom: 10px;
`;
export default ChatPage;
