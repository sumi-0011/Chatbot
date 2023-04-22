import { useState } from 'react';
import styled from 'styled-components';

import NumbleLogo from '@/components/icon/numble';
import PlusIcon from '@/components/icon/plus';
import ListItem from '@/components/list/item';
import AddModal from '@/components/modal/add-modal';
import { PointerComponent } from '@/styles/core';

const LIST = [
  {
    id: 1,
    content: '넘블 모여라',
  },
  {
    id: 3,
    content: '넘블 모여라',
  },
  {
    id: 2,
    content: '넘블 모여라',
  },
];

function ChattingListPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <div>
      <Header>
        <NumbleLogo />
        <PointerComponent onClick={() => setIsAddModalOpen(true)}>
          <PlusIcon />
        </PointerComponent>
      </Header>
      {LIST.map(({ content, id }) => (
        <ListItem key={id} id={id} content={content} />
      ))}

      {isAddModalOpen && <AddModal onClose={() => setIsAddModalOpen(false)} />}
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
