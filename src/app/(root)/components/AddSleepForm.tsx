import {Submit} from '@/app/(root)/components/Submit';
import {TimeInput} from '@/app/(root)/components/TimeInput';
import {Event} from '@/domain/model/Event';
import {Timestamp} from '@firebase/firestore';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 0.5px solid #555;
  flex: 1;
  padding: 30px 0;
  gap: 20px;
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`;

const Timers = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Form = styled.form`
  display: flex;
  width: 100vw;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 1.5rem;
  align-self: center;
`;

type Inputs = {
  start: Date | null;
  end: Date | null;
};

type AddSleepFormProps = {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
};

const AddSleepForm = ({onAddEvent}: AddSleepFormProps) => {
  const {
    handleSubmit,
    setValue,
    formState: {errors},
    control,
  } = useForm<Inputs>({
    defaultValues: {
      start: null,
      end: null,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const event = {
      ...data,
      type: 'sleep',
      start: Timestamp.fromDate(data.start ?? new Date()),
      end: Timestamp.fromDate(data.end ?? new Date()),
      timestamp: Timestamp.fromDate(data.end ?? new Date()),
    } as const;

    onAddEvent(event);
  };

  return (
    <Container>
      <Title>Log a new Sleep</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Timers>
          <Controller
            control={control}
            name="start"
            render={({field: {onChange, onBlur, value}}) => (
              <TimeInput onChange={onChange} onBlur={onBlur} value={value ?? undefined} />
            )}
          />
          <Controller
            control={control}
            name="end"
            render={({field: {onChange, onBlur, value}}) => (
              <TimeInput onChange={onChange} onBlur={onBlur} value={value ?? undefined} />
            )}
          />
        </Timers>

        <Submit />
      </Form>
    </Container>
  );
};

export {AddSleepForm};
