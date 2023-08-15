'use client';

import {EventList} from '@/app/(root)/components/EventList';
import {AddEventButton} from '@/app/(root)/components/common/AddEventButton';
import {PageContainer} from '@/app/(root)/components/common/PageContainer';
import {useAddEvent} from '@/app/(root)/components/hooks/useEvents';
import {AddFeedEventForm} from '@/app/(root)/feed/components/AddFeedEventForm';
import {BottleFeed, BreastFeed} from '@/domain/model/Event';
import {useRef} from 'react';

export default function Feed() {
  const addEvent = useAddEvent<BreastFeed | BottleFeed>();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <PageContainer>
      <EventList ref={ref} types={['breast_feed', 'bottle_feed']} />
      <AddEventButton>
        <AddFeedEventForm
          onAddEvent={event => {
            (async () => {
              ref.current?.parentElement?.scrollTo({top: 0, behavior: 'smooth'});
              addEvent(event as BreastFeed);
            })();
          }}
        />
      </AddEventButton>
    </PageContainer>
  );
}
