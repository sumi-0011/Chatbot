import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import SendIcon from '@/components/icon/send';
import Input from '@/components/input';
import ReceiveMessage from '@/components/message/receiver';
import SenderMessage from '@/components/message/sender';
import useChat from '@/hooks/useChat';

function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState({
    roomId: id,
    roomName: '',
  });

  const { submitChat, messages } = useChat({
    people: 4,
    roomId: '1',
    roomName: room.roomName,
  });

  const [sendMessage, setSendMessage] = useState('');

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = () => {
    if (sendMessage === '') return;

    submitChat(sendMessage);
    setSendMessage(() => '');
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
        <h1>{room.roomName}</h1>
      </Header>
      <MessageContainer ref={scrollRef}>
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

const Header = styled.header``;
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
