'use client';

import {AddChangeEventForm} from '@/app/(root)/change/components/AddChangeEventForm';
import {AddEventButton} from '@/app/(root)/components/common/AddEventButton';
import {PageContainer} from '@/app/(root)/components/common/PageContainer';
import {EventList} from '@/app/(root)/components/EventList';
import {useAddEvent} from '@/app/(root)/components/hooks/useEvents';
import {Change} from '@/domain/model/Event';
import {useRef} from 'react';

export default function Change() {
  const addEvent = useAddEvent<Change>();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <PageContainer>
      <EventList ref={ref} types={['change']} />
      <AddEventButton>
        <AddChangeEventForm
          onAddEvent={event => {
            (async () => {
              ref.current?.parentElement?.scrollTo({top: 0, behavior: 'smooth'});
              addEvent(event as Change);
            })();
          }}
        />
      </AddEventButton>
    </PageContainer>
  );
}
