'use client';

import {AddEventButton} from '@/app/(root)/components/common/AddEventButton';
import {AddSleepEventForm} from '@/app/(root)/sleep/components/AddSleepEventForm';
import {EventList} from '@/app/(root)/components/EventList';
import {useAddEvent} from '@/app/(root)/components/hooks/useEvents';
import {Sleep} from '@/domain/model/Event';
import {useRef} from 'react';
import {PageContainer} from '@/app/(root)/components/common/PageContainer';

export default function Sleep() {
  const addEvent = useAddEvent<Sleep>();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <PageContainer>
      <EventList ref={ref} types={['sleep']} />

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
    </PageContainer>
  );
}
