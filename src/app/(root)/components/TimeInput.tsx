import {Override} from '@/domain/model/Override';
import {InputHTMLAttributes} from 'react';
import styled from 'styled-components';

const intl = new Intl.RelativeTimeFormat('fr', {numeric: 'auto'});

const Container = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Day = styled.div`
  font-size: 1.5rem;
  font-weight: 200;
  text-transform: capitalize;
`;

const Input = styled.input`
  font-size: 3rem;
  font-weight: 200;
  border: none;
  border-bottom: 1px solid black;
  padding: 0;
  text-align: center;
  font-family: inherit;
  background-color: transparent;
  color: inherit;

  &::-webkit-calendar-picker-indicator {
    background: none;
    display: none;
  }
`;

type TimeInputProps = Override<
  InputHTMLAttributes<HTMLInputElement>,
  {
    value: Date | undefined;
    onChange: (value: Date) => void;
  }
>;

const TimeInput = ({value, onChange, ...props}: TimeInputProps) => {
  value = value ?? new Date();

  const relativeDay = value.getDate() - new Date().getDate();

  return (
    <Container>
      <Day>{intl.format(relativeDay, 'day')}</Day>
      <Input
        type="time"
        {...props}
        value={getStringTimeFromDate(value)}
        defaultValue={getStringTimeFromDate(value)}
        onChange={event => onChange(getDateFromStringTime(event.target.value))}
      />
    </Container>
  );
};

const getStringTimeFromDate = (value: Date) =>
  `${('0' + value.getHours()).slice(-2)}:${('0' + value.getMinutes()).slice(-2)}`;

const getDateFromStringTime = (value: string) => {
  const hours = value.split(':').at(0);
  const minutes = value.split(':').at(1);
  const timestamp = new Date();
  timestamp.setHours(parseInt(hours ?? '0'));
  timestamp.setMinutes(parseInt(minutes ?? '0'));
  const inSixHour = new Date();
  inSixHour.setHours(inSixHour.getHours() + 6);

  if (timestamp > inSixHour) {
    timestamp.setDate(timestamp.getDate() - 1);
  }

  return timestamp;
};

export {TimeInput, getDateFromStringTime, getStringTimeFromDate};
