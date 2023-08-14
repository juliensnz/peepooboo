'use client';

import {getStringTimeFromDate} from '@/app/(root)/components/TimeInput';
import {useEvents} from '@/app/(root)/hooks/useEvents';
import {BottleFeed, BreastFeed, Change, Event, Sleep} from '@/domain/model/Event';
import {eventRepository} from '@/infrastructure/EventRepository';
import Image from 'next/image';
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

const Pee = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Poo = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  height: 60px;
`;

const NoEvent = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ChangeImage = styled(Image)<{active: boolean}>`
  opacity: ${({active}) => (active ? 1 : 0.2)};
`;

const ChangeEventListItem = ({event}: {event: Change}) => {
  const relativeDay = event.timestamp.toDate().getDate() - new Date().getDate();

  return (
    <ListItem>
      <Time>
        <Day>{intlRelative.format(relativeDay, 'day')}</Day>
        <Hour>{getStringTimeFromDate(event.timestamp.toDate())}</Hour>
      </Time>
      <Pee>
        <ChangeImage active={event.pee} src="/icon/1.svg" width={40} height={40} alt="pee" />
      </Pee>
      <Poo>
        <ChangeImage active={event.poop} src="/icon/2.svg" width={40} height={40} alt="poop" />
      </Poo>
    </ListItem>
  );
};
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
const SleepEventListItem = ({event}: {event: Sleep}) => {
  const relativeDayStart = event.start.toDate().getDate() - new Date().getDate();
  const duration = Math.ceil(Math.abs(event.end.toMillis() - event.start.toMillis()) / 1000 / 60);
  const formattedDuration = Intl.DurationFormat
    ? new Intl.DurationFormat('fr', {style: 'narrow'}).format({minutes: duration}, 'minutes')
    : `${duration}min`;

  return (
    <ListItem>
      <Time>
        <Day>{intlRelative.format(relativeDayStart, 'day')}</Day>
        <Hour>
          {event.start.toDate().getHours()}:{event.start.toDate().getMinutes()}
        </Hour>
      </Time>
      <Time>
        <Day>Duration</Day>
        <Hour>{formattedDuration}</Hour>
      </Time>
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
        {data?.docs.map(doc => {
          const event = doc.data() as Event;

          switch (event.type) {
            case 'change':
              return (
                <SwipeToDelete
                  key={event.id}
                  height={100}
                  onDelete={() => {
                    eventRepository.deleteEvent(event.id);
                  }}
                >
                  <ChangeEventListItem event={event} />
                </SwipeToDelete>
              );
            case 'breast_feed':
              return <BreastFeedEventListItem key={event.id} event={event} />;
            case 'bottle_feed':
              return <BottleFeedEventListItem key={event.id} event={event} />;
            case 'sleep':
              return (
                <SwipeToDelete
                  key={event.id}
                  height={100}
                  onDelete={() => {
                    eventRepository.deleteEvent(event.id);
                  }}
                >
                  <SleepEventListItem key={event.id} event={event} />
                </SwipeToDelete>
              );
          }
        })}
      </ScrollContainer>
    </Container>
  );
});

export {EventList};
