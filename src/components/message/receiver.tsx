import React from 'react';
import styled from 'styled-components';

import { DateWrapperStyled, Message } from '@/components/message/styled';
import type { MessageType } from '@/utils/chat';
import { getHHMMFormat } from '@/utils/date';

interface ReceiveMessageProps {
  message: MessageType;
  date: number;
}
function ReceiveMessage({ message }: ReceiveMessageProps) {
  const { content, createdAt } = message;
  return (
    <Wrapper>
      <Message>
        {content}

        <DateWrapper>{getHHMMFormat(createdAt)}</DateWrapper>
      </Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;

  position: relative;
`;

const DateWrapper = styled(DateWrapperStyled)`
  right: calc(100% + 5px);
`;

export default ReceiveMessage;
