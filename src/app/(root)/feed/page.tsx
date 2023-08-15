'use client';

import {AddChangeEventForm} from '@/app/(root)/components/AddChangeEventForm';
import {AddEventButton} from '@/app/(root)/components/common/AddEventButton';
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
        <AddChangeEventForm onAddEvent={() => {}} />
      </AddEventButton>
    </Container>
  );
}
