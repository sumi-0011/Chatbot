import { useRef } from 'react';

import Button from '@/components/button';
import Input from '@/components/input';
import ReceiveMessage from '@/components/message/receiver';
import SenderMessage from '@/components/message/sender';
import useChat from '@/hooks/useChat';

function ChatPage() {
  const { submitChat, messages } = useChat(4, '1');
  const sendMessage = useRef('');

  return (
    <div>
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

      <Input onChange={(e) => (sendMessage.current = e.target.value)} />
      <Button onClick={() => submitChat(sendMessage.current)}>전송</Button>
    </div>
  );
}

export default ChatPage;
