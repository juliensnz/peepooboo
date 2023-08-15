import {Time, Day, Hour, ListItem} from '@/app/(root)/components/EventList';
import {getStringTimeFromDate} from '@/app/(root)/components/field/TimeInput';
import {Sleep} from '@/domain/model/Event';

const intlRelative = new Intl.RelativeTimeFormat('fr', {numeric: 'auto'});

const SleepEventListItem = ({event}: {event: Sleep}) => {
  const relativeDayStart = event.start.toDate().getDate() - new Date().getDate();
  const duration = Math.ceil(Math.abs(event.end.toMillis() - event.start.toMillis()) / 1000 / 60);
  // @ts-ignore
  const formattedDuration = Intl.DurationFormat
    ? // @ts-ignore
      new Intl.DurationFormat('fr', {style: 'narrow'}).format({minutes: duration}, 'minutes')
    : `${duration}min`;

  return (
    <ListItem>
      <Time>
        <Day>{intlRelative.format(relativeDayStart, 'day')}</Day>
        <Hour>{getStringTimeFromDate(event.start.toDate())}</Hour>
      </Time>
      <Time>
        <Day>Duration</Day>
        <Hour>{formattedDuration}</Hour>
      </Time>
    </ListItem>
  );
};

export {SleepEventListItem};
