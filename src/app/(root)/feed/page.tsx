'use client';

import {AddChangeForm} from '@/app/(root)/components/AddChangeForm';
import {AddEventButton} from '@/app/(root)/components/AddEventButton';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function Feed() {
  return (
    <Container>
      Feed
      <AddEventButton>
        <AddChangeForm onAddEvent={() => {}} />
      </AddEventButton>
    </Container>
  );
}
