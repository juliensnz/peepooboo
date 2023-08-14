'use client';

import {AddChangeForm} from '@/app/(root)/components/AddChangeForm';
import {AddEventButton} from '@/app/(root)/components/AddEventButton';
import {EventList} from '@/app/(root)/components/EventList';
import {useAddEvent} from '@/app/(root)/hooks/useEvents';
import {Change} from '@/domain/model/Event';
import {useRef} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function Change() {
  const addEvent = useAddEvent<Change>('change');
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <EventList ref={ref} type="change" />
      <AddEventButton>
        <AddChangeForm
          onAddEvent={event => {
            (async () => {
              ref.current?.parentElement?.scrollTo({top: 0, behavior: 'smooth'});
              addEvent(event as Change);
            })();
          }}
        />
      </AddEventButton>
    </Container>
  );
}
