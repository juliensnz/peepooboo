'use client';

import styled from 'styled-components';
import {ReactNode, useState} from 'react';
import {MenuItem, Menu} from '@/app/(root)/components/Menu';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  background: #f5f5f5;
`;

const Layout = ({children}: {children: ReactNode}) => {
  const [value, setValue] = useState<MenuItem>('Feed');

  return (
    <Container>
      <Content>{children}</Content>
      <Menu
        value={value}
        onSelect={value => {
          setValue(value);
          console.log('changed');
        }}
      />
    </Container>
  );
};

export default Layout;
