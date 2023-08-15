'use client';

import {ChangeEventListItem} from '@/app/(root)/change/components/ChangeEventListItem';
import {useEvents} from '@/app/(root)/components/hooks/useEvents';
import {BreastFeedEventListItem, BottleFeedEventListItem} from '@/app/(root)/feed/components/FeedEventListItem';
import {SleepEventListItem} from '@/app/(root)/sleep/components/SleepEventListItem';
import {Event} from '@/domain/model/Event';
import {eventRepository} from '@/infrastructure/EventRepository';
import {AnimatePresence, motion} from 'framer-motion';
import {forwardRef, ForwardedRef, ReactNode} from 'react';
import SwipeToDelete from 'react-swipe-to-delete-ios';
import styled from 'styled-components';

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

const ListItemContainer = ({children, onDelete}: {children: ReactNode; onDelete: () => void}) => {
  return (
    <motion.div initial={{height: 0}} animate={{height: '100px'}} exit={{height: 0}}>
      <SwipeToDelete height={100} onDelete={onDelete}>
        {children}
      </SwipeToDelete>
    </motion.div>
  );
};

type EventListProps = {
  types: Event['type'][];
};

const EventList = forwardRef(function EventList({types}: EventListProps, ref: ForwardedRef<HTMLDivElement>) {
  const {data} = useEvents(types);

  return (
    <Container>
      {data?.docs.length === 0 && <NoEvent>No event for now</NoEvent>}
      <ScrollContainer ref={ref}>
        <AnimatePresence initial={false}>
          {data?.docs.map(doc => {
            const event = doc.data() as Event;
            const handleDelete = () => {
              eventRepository.deleteEvent(event.id);
            };

            switch (event.type) {
              case 'change':
                return (
                  <ListItemContainer key={event.id} onDelete={handleDelete}>
                    <ChangeEventListItem event={event} />
                  </ListItemContainer>
                );
              case 'breast_feed':
                return (
                  <ListItemContainer key={event.id} onDelete={handleDelete}>
                    <BreastFeedEventListItem key={event.id} event={event} />
                  </ListItemContainer>
                );
              case 'bottle_feed':
                return (
                  <ListItemContainer key={event.id} onDelete={handleDelete}>
                    <BottleFeedEventListItem key={event.id} event={event} />
                  </ListItemContainer>
                );
              case 'sleep':
                return (
                  <ListItemContainer key={event.id} onDelete={handleDelete}>
                    <SleepEventListItem key={event.id} event={event} />
                  </ListItemContainer>
                );
            }
          })}
        </AnimatePresence>
      </ScrollContainer>
    </Container>
  );
});

export {EventList, Time, Day, Hour, ListItem};
