import {ListItem, Day, Hour, Time} from '@/app/(root)/components/EventList';
import {getStringTimeFromDate} from '@/app/(root)/components/field/TimeInput';
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
        <Hour>{getStringTimeFromDate(event.timestamp.toDate())}</Hour>
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
        <Hour>{getStringTimeFromDate(event.timestamp.toDate())}</Hour>
      </Time>
      <Type>Bottle</Type>
    </ListItem>
  );
};

export {BreastFeedEventListItem, BottleFeedEventListItem};
