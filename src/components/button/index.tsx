import React from 'react';
import styled from 'styled-components';

type ButtonSize = 'sm' | 'full';
type ButtonColorSchemaType = 'primary' | 'error';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  colorScheme?: ButtonColorSchemaType;
}

function Button({ children, size, ...rest }: ButtonProps) {
  return (
    <Wrapper size={size} {...rest}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.button<{
  size?: ButtonSize;
  colorScheme?: ButtonColorSchemaType;
}>`
  border-radius: 5px;

  ${({ colorScheme }) => {
    if (colorScheme === 'error') {
      return `
        background: #ff0000;
      `;
    }
    return `
      background: #26d9fd;
    `;
  }}

  ${({ size }) => {
    if (size === 'sm') {
      return `
        width: 95px;
        height : 50px
      `;
    }
    return `
      width: 100%;
      height: 72px;
    `;
  }}

  &:disabled {
    opacity: 0.5;
  }
`;

export default Button;
