'use client';

import {AddSleepForm} from '@/app/(root)/components/AddSleepForm';
import {EventList} from '@/app/(root)/components/EventList';
import {useAddEvent} from '@/app/(root)/hooks/useEvents';
import {Sleep} from '@/domain/model/Event';
import {useRef} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Sleep() {
  const addEvent = useAddEvent<Sleep>('sleep');
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <EventList ref={ref} type="sleep" />
      <AddSleepForm
        onAddEvent={event => {
          (async () => {
            ref.current?.parentElement?.scrollTo({top: 0, behavior: 'smooth'});
            addEvent(event as Sleep);
          })();
        }}
      />
    </Container>
  );
}
