import {ListItem, Time, Day, Hour} from '@/app/(root)/components/EventList';
import {getStringTimeFromDate} from '@/app/(root)/components/field/TimeInput';
import {Change} from '@/domain/model/Event';
import Image from 'next/image';
import styled from 'styled-components';
const intlRelative = new Intl.RelativeTimeFormat('fr', {numeric: 'auto'});

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

export {ChangeEventListItem};
