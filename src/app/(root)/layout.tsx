'use client';

import styled from 'styled-components';
import {ReactNode} from 'react';
import {Menu} from '@/app/(root)/components/Menu';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

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
  height: 100%;
`;

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Container>
        <Content>{children}</Content>
        <Menu />
      </Container>
    </QueryClientProvider>
  );
};

export default Layout;
