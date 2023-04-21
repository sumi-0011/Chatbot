import styled from 'styled-components';

import Button from '@/components/button';
import NumbleLogo from '@/components/icon/numble';
import PlusIcon from '@/components/icon/plus';

const LIST = ['넘블 모여라', '넘블 모여라', '넘블 모여라'];
function ChattingListPage() {
  return (
    <div>
      <Header>
        <NumbleLogo />
        <PlusIcon />
      </Header>
      {LIST.map((item) => (
        <ListItem key={item}>
          <span>{item}</span>
          <Button size="sm">수정</Button>
        </ListItem>
      ))}
    </div>
  );
}

const Header = styled.header`
  padding: 35px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListItem = styled.div`
  height: 100px;
  width: 100%;

  font-weight: 700;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 35px;
`;

export default ChattingListPage;
