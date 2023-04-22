import { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/button';
import EditModal from '@/components/modal/edit-modal';

interface ListItemProps {
  content: string;
  id: number;
}

function ListItem({ content, id }: ListItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(true);
  const onEditClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <Wrapper>
      <span>{content}</span>
      <Button size="sm" onClick={onEditClick}>
        수정
      </Button>

      {isEditModalOpen && (
        <EditModal onClose={() => setIsEditModalOpen(false)}></EditModal>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100px;
  width: 100%;

  font-weight: 700;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 35px;

  border-top: 1px solid #e5e5e5;
  &:last-child {
    border-bottom: 1px solid #e5e5e5;
  }
`;

export default ListItem;
