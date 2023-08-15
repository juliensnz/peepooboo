import {ListItem, Day, Hour} from '@/app/(root)/components/EventList';
import {BottleFeed, BreastFeed} from '@/domain/model/Event';

const intlRelative = new Intl.RelativeTimeFormat('fr', {numeric: 'auto'});

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

export {BreastFeedEventListItem, BottleFeedEventListItem};
