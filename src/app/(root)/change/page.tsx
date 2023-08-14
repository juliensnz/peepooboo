'use client';

import {AddChangeForm} from '@/app/(root)/components/AddChangeForm';
import {EventList} from '@/app/(root)/components/EventList';
import {useStreamEvents} from '@/app/(root)/hooks/useEvents';
import {Change} from '@/domain/model/Event';
import {useRef} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Change() {
  const [changeEvents, addEvent] = useStreamEvents<Change>('change');
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <EventList ref={ref} events={changeEvents} />
      <AddChangeForm
        onAddEvent={event => {
          addEvent(event);
          console.log(ref.current);
          ref.current?.scrollTo(0, 0);
        }}
      />
    </Container>
  );
}
