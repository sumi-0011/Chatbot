import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { Message } from '@/components/message/styled';

interface SenderMessageProps {
  img: string;
  name: string;
  message: string;
  date: number;
}

function SenderMessage({ img, name, message, date }: SenderMessageProps) {
  return (
    <Wrapper>
      <Profile>
        <ProfileImage>
          <Image src={img} alt="profile" width={50} height={50} />
        </ProfileImage>
        <span>{name}</span>
      </Profile>
      <Message>{message}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;

  margin: 10px 0;
`;

const Profile = styled.div`
  width: 50px;
  height: 50px;
  color: #fff;
  text-align: center;
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
export default SenderMessage;
