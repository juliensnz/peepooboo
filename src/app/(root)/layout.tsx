'use client';

import styled from 'styled-components';
import {ReactNode} from 'react';
import {Menu} from '@/app/(root)/components/Menu';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
`;

const Content = styled.div`
  overflow: hidden;
  color: white;
`;

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <Container>
      <Content>{children}</Content>
      <Menu />
    </Container>
  );
};

export default Layout;
