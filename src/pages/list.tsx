import { useEffect, useState } from 'react';
import styled from 'styled-components';

import NumbleLogo from '@/components/icon/numble';
import PlusIcon from '@/components/icon/plus';
import ListItem from '@/components/list/item';
import AddModal from '@/components/modal/add-modal';
import { PointerComponent } from '@/styles/core';
import type { ChattingItemType } from '@/utils/chat';
import { getChatRoomList } from '@/utils/chat';
import { addChatRoom } from '@/utils/chat';

const LIST = [
  {
    id: 1,
    name: '넘블 모여라',
  },
  {
    id: 3,
    name: '넘블 모여라',
  },
  {
    id: 2,
    name: '넘블 모여라',
  },
];

function ChattingListPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [list, setList] = useState<ChattingItemType[]>([]);

  const addList = (roomName: string, peopleCount: string) => {
    const chatData = addChatRoom(roomName, peopleCount);
    setList((prev) => [...prev, chatData]);
  };

  useEffect(() => {
    setList(getChatRoomList());
  }, []);

  return (
    <div>
      <Header>
        <NumbleLogo />
        <PointerComponent onClick={() => setIsAddModalOpen(true)}>
          <PlusIcon />
        </PointerComponent>
      </Header>
      {list.map((chatroomData) => (
        <ListItem
          key={chatroomData.roomId}
          id={chatroomData.roomId}
          data={chatroomData}
        />
      ))}

      {isAddModalOpen && (
        <AddModal onAction={addList} onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}

const Header = styled.header`
  padding: 35px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ChattingListPage;
