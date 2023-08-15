'use client';

import {AddEventButton} from '@/app/(root)/components/common/AddEventButton';
import {AddSleepEventForm} from '@/app/(root)/sleep/components/AddSleepEventForm';
import {EventList} from '@/app/(root)/components/EventList';
import {useAddEvent} from '@/app/(root)/components/hooks/useEvents';
import {Sleep} from '@/domain/model/Event';
import {useRef} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function Sleep() {
  const addEvent = useAddEvent<Sleep>('sleep');
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <EventList ref={ref} type="sleep" />

      <AddEventButton>
        <AddSleepEventForm
          onAddEvent={event => {
            (async () => {
              ref.current?.parentElement?.scrollTo({top: 0, behavior: 'smooth'});
              addEvent(event as Sleep);
            })();
          }}
        />
      </AddEventButton>
    </Container>
  );
}
