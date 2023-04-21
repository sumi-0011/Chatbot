import React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  max-width: 475px;

  margin: 0 auto;

  background-color: #aaa;
  padding: 50px 10px;
`;

export default Layout;
