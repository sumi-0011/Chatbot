import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/button';
import EditModal from '@/components/modal/edit-modal';

interface ListItemProps {
  content: string;
  id: string;
}

function ListItem({ content, id }: ListItemProps) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const onEditClick = () => {
    setIsEditModalOpen(true);
  };

  const onNextClick = () => {
    router.push(`/chat?id=${id}`);
  };

  return (
    <Wrapper>
      <Content onClick={onNextClick}>{content}</Content>
      <Button size="sm" onClick={onEditClick}>
        수정
      </Button>

      {isEditModalOpen && (
        <EditModal
          onClose={() => setIsEditModalOpen(false)}
          id={0}
          initName={''}
          initPeopleCount={''}
        />
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

const Content = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
export default ListItem;
