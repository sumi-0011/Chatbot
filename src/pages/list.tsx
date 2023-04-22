import styled from 'styled-components';

import NumbleLogo from '@/components/icon/numble';
import PlusIcon from '@/components/icon/plus';
import ListItem from '@/components/list/item';

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
  return (
    <div>
      <Header>
        <NumbleLogo />
        <PlusIcon />
      </Header>
      {LIST.map(({ content, id }) => (
        <ListItem key={id} id={id} content={content} />
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

export default ChattingListPage;
