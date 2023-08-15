import {ListItem, Day, Hour, Time} from '@/app/(root)/components/EventList';
import {BottleFeed, BreastFeed} from '@/domain/model/Event';
import styled from 'styled-components';

const intlRelative = new Intl.RelativeTimeFormat('fr', {numeric: 'auto'});

const Type = styled.div`
  font-size: 3rem;
  font-weight: 100;
`;

const BreastFeedEventListItem = ({event}: {event: BreastFeed}) => {
  const relativeDay = event.timestamp.toDate().getDate() - new Date().getDate();

  return (
    <ListItem>
      <Time>
        <Day>{intlRelative.format(relativeDay, 'day')}</Day>
        <Hour>
          {event.timestamp.toDate().getHours()}:{event.timestamp.toDate().getMinutes()}
        </Hour>
      </Time>
      <Type>Breast</Type>
    </ListItem>
  );
};
const BottleFeedEventListItem = ({event}: {event: BottleFeed}) => {
  const relativeDay = event.timestamp.toDate().getDate() - new Date().getDate();

  return (
    <ListItem>
      <Time>
        <Day>{intlRelative.format(relativeDay, 'day')}</Day>
        <Hour>
          {event.timestamp.toDate().getHours()}:{event.timestamp.toDate().getMinutes()}
        </Hour>
      </Time>
      <Type>Bottle</Type>
    </ListItem>
  );
};

export {BreastFeedEventListItem, BottleFeedEventListItem};
