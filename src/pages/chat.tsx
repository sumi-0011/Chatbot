import { useEffect, useRef } from 'react';

import Button from '@/components/button';
import Input from '@/components/input';
import ReceiveMessage from '@/components/message/receiver';
import SenderMessage from '@/components/message/sender';
import useChat from '@/hooks/useChat';

function ChatPage() {
  const { submitChat, messages } = useChat(4);
  console.log('messages: ', messages);
  const sendMessage = useRef('');
  useEffect(() => {
    // submitChat('안녕하세요');
  }, []);

  return (
    <div>
      {messages.map((message, idx) => {
        return (
          <div key={idx}>
            {message.author === 0 ? (
              <ReceiveMessage
                message={message.content}
                date={message.createdAt}
              />
            ) : (
              <SenderMessage
                img="/assets/images/smiling1.png"
                name="chat1"
                message={message.content}
                date={message.createdAt}
              />
            )}
          </div>
        );
      })}

      <Input onChange={(e) => (sendMessage.current = e.target.value)} />
      <Button onClick={() => submitChat(sendMessage.current)}>전송</Button>
    </div>
  );
}

export default ChatPage;
