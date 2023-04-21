import styled from 'styled-components';

type InputSizeType = 'md' | 'sm';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSizeType;
}

const INPUT_SIZE: Record<InputSizeType, number> = {
  md: 72,
  sm: 65,
};

function Input(props: InputProps) {
  const { inputSize, onChange, value, type } = props;

  return (
    <Wrapper
      inputSize={inputSize}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
}

const Wrapper = styled.input<{ inputSize?: InputSizeType }>`
  border: 2px solid #393939;

  border-radius: 5px;

  width: 100%;
  height: ${({ inputSize }) => INPUT_SIZE[inputSize || 'md']}px;
  color: #fff;
  font-size: 24px;

  padding: 0 20px;
`;

export default Input;
