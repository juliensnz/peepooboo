'use client';

import {ChangeEventListItem} from '@/app/(root)/change/components/ChangeEventListItem';
import {useEvents} from '@/app/(root)/components/hooks/useEvents';
import {SleepEventListItem} from '@/app/(root)/sleep/components/SleepEventListItem';
import {BottleFeed, BreastFeed, Event} from '@/domain/model/Event';
import {eventRepository} from '@/infrastructure/EventRepository';
import {AnimatePresence, motion} from 'framer-motion';
import {ForwardedRef, forwardRef} from 'react';
import SwipeToDelete from 'react-swipe-to-delete-ios';
import styled from 'styled-components';

const intlRelative = new Intl.RelativeTimeFormat('fr', {numeric: 'auto'});

const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

const ScrollContainer = styled.div`
  overflow: auto;
`;

const ListItem = styled.div`
  border-top: 1pt solid #333;
  display: flex;
  align-items: center;
  padding: 10px;
  height: 100px;
  background: black;
`;

const Time = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Day = styled.div`
  text-transform: capitalize;
  padding-left: 5px;
`;

const Hour = styled.div`
  font-size: 3rem;
  font-weight: 100;
  font-variant-numeric: tabular-nums;
`;

const NoEvent = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const BreastFeedEventListItem = ({event}: {event: BreastFeed}) => {
  const relativeDay = event.timestamp.toDate().getDate() - new Date().getDate();

  return (
    <ListItem>
      <Day>{intlRelative.format(relativeDay, 'day')}</Day>
      <Hour>
        {event.timestamp.toDate().getHours()}:{event.timestamp.toDate().getMinutes()}
      </Hour>
    </ListItem>
  );
};
const BottleFeedEventListItem = ({event}: {event: BottleFeed}) => {
  const relativeDay = event.timestamp.toDate().getDate() - new Date().getDate();

  return (
    <ListItem>
      <Day>{intlRelative.format(relativeDay, 'day')}</Day>
      <Hour>
        {event.timestamp.toDate().getHours()}:{event.timestamp.toDate().getMinutes()}
      </Hour>
    </ListItem>
  );
};

type EventListProps = {
  type: Event['type'];
};

const EventList = forwardRef(function EventList({type}: EventListProps, ref: ForwardedRef<HTMLDivElement>) {
  const {data} = useEvents(type);

  return (
    <Container>
      {data?.docs.length === 0 && <NoEvent>No event for now</NoEvent>}
      <ScrollContainer ref={ref}>
        <AnimatePresence initial={false}>
          {data?.docs.map(doc => {
            const event = doc.data() as Event;

            switch (event.type) {
              case 'change':
                return (
                  <motion.div key={event.id} initial={{height: 0}} animate={{height: '100px'}} exit={{height: 0}}>
                    <SwipeToDelete
                      height={100}
                      onDelete={() => {
                        eventRepository.deleteEvent(event.id);
                      }}
                    >
                      <ChangeEventListItem event={event} />
                    </SwipeToDelete>
                  </motion.div>
                );
              case 'breast_feed':
                return <BreastFeedEventListItem key={event.id} event={event} />;
              case 'bottle_feed':
                return <BottleFeedEventListItem key={event.id} event={event} />;
              case 'sleep':
                return (
                  <motion.div key={event.id} initial={{height: 0}} animate={{height: '100px'}} exit={{height: 0}}>
                    <SwipeToDelete
                      height={100}
                      onDelete={() => {
                        eventRepository.deleteEvent(event.id);
                      }}
                    >
                      <SleepEventListItem key={event.id} event={event} />
                    </SwipeToDelete>
                  </motion.div>
                );
            }
          })}
        </AnimatePresence>
      </ScrollContainer>
    </Container>
  );
});

export {EventList, Time, Day, Hour, ListItem};
