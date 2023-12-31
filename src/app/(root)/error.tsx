'use client';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = () => {
  return <Container>An error occurred</Container>;
};

export default Error;
