import styled from 'styled-components';

import type { InputProps } from '@/components/input';
import Input from '@/components/input';

interface InputLabelProps extends InputProps {
  label: string;
}

function InputLabel({ label, ...rest }: InputLabelProps) {
  return (
    <>
      <Label>{label}</Label>
      <Input {...rest} />
    </>
  );
}

const Label = styled.label`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;

  color: #ffffff;
  display: inline-block;
  margin-bottom: 10px;
`;

export default InputLabel;
