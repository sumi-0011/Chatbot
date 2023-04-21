import ReceiveMessage from '@/components/message/receiver';
import SenderMessage from '@/components/message/sender';

function ChatPage() {
  return (
    <div>
      <SenderMessage
        img="/assets/images/smiling1.png"
        name="chat1"
        message={
          'ㄴㄹㅁㄹㄴㅇqweqweqweqweqweqweqwe럼ㅇ린어리너린아ㅓ린아러ㅣㄴㄹ'
        }
        date={'2021-08-01'}
      />

      <ReceiveMessage
        message={
          'ㄴㄹㅁㄹㄴㅇqweqweqweqweqweqweqwe럼ㅇ린어리너린아ㅓ린아러ㅣㄴㄹ'
        }
      />
    </div>
  );
}

export default ChatPage;
