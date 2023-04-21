import React from 'react';
import styled from 'styled-components';

import { Message } from '@/components/message/styled';

interface ReceiveMessageProps {
  message: string;
}
function ReceiveMessage({ message }: ReceiveMessageProps) {
  return (
    <Wrapper>
      <Message>{message}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

export default ReceiveMessage;
