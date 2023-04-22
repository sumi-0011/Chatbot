import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { DateWrapperStyled, Message } from '@/components/message/styled';
import type { MessageType } from '@/utils/chat';
import { getHHMMFormat } from '@/utils/date';

interface SenderMessageProps {
  img: string;
  message: MessageType;
}

function SenderMessage({ message }: SenderMessageProps) {
  const { content, createdAt, author } = message;

  if (content === '') {
    return <></>;
  }

  return (
    <Wrapper>
      <Profile>
        <ProfileImage>
          <Image
            src={'/assets/images/smiling' + author + '.png'}
            alt="profile"
            width={50}
            height={50}
          />
        </ProfileImage>
        <ProfileText>bot {author}</ProfileText>
      </Profile>
      <Message>
        {content}
        <DateWrapper>{getHHMMFormat(createdAt)}</DateWrapper>
      </Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;

  margin: 10px 0 30px;
`;

const Profile = styled.div`
  width: 50px;
  height: 50px;
  color: #fff;
  text-align: center;
`;

const ProfileText = styled.span`
  font-size: 12px;
  color: #fff;
  margin-top: 10px;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  border-radius: 50%;

  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const DateWrapper = styled(DateWrapperStyled)`
  left: calc(100% + 5px);
`;
export default SenderMessage;
