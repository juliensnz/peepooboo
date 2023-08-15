'use client';

import {Loader} from '@/app/(root)/components/common/Loader';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <Container>
      <Loader color="#000" size={50} />
    </Container>
  );
};

export default Loading;
