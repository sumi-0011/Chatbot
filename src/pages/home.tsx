import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/button';
import InputLabel from '@/components/input-label';
import { setAPIKeyToStorage } from '@/utils/chat';

function Home() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleLogin = () => {
    const validAPIKeyRegex = /^[-0-9A-z]{51}$/;
    if (!apiKey.match(validAPIKeyRegex)) {
      alert('API KEY를 확인해주세요.');
      return;
    }
    setAPIKeyToStorage(apiKey);

    router.push('/list');
  };

  return (
    <Wrapper>
      <div>
        <ImageWrapper>
          <Image
            src="/assets/images/numble.svg"
            alt="Next.js"
            width={107}
            height={104}
          />
        </ImageWrapper>
        <InputWrapper>
          <InputLabel
            value={apiKey}
            onChange={onChange}
            label="API KEY"
            inputSize="md"
          />
        </InputWrapper>
      </div>
      <BottomWrapper>
        <Button onClick={handleLogin}>login</Button>
        <KeyIssued>KEY 발급받는 방법</KeyIssued>
      </BottomWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 200px 0 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const ImageWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const InputWrapper = styled.div`
  margin-top: 80px;
`;

const BottomWrapper = styled.div`
  text-align: center;
`;

const KeyIssued = styled.span`
  display: inline-block;
  margin: 20px auto;
  font-weight: 500;
  font-size: 22px;
  text-decoration-line: underline;

  color: #ffffff;
`;

export default Home;
