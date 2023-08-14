import {CheckboxInput} from '@/app/(root)/components/CheckboxInput';
import {Submit} from '@/app/(root)/components/Submit';
import {TimeInput} from '@/app/(root)/components/TimeInput';
import {Change} from '@/domain/model/Event';
import {eventRepository} from '@/infrastructure/EventRepository';
import {Timestamp} from '@firebase/firestore';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  width: 100vw;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  align-self: center;
  padding: 10px;
  background: black;
  flex: 1;
  border-top: 0.5px solid #555;
`;

const PeePoop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

type Inputs = {
  timestamp: Date;
  pee: boolean;
  poop: boolean;
};

type AddChangeFormProps = {
  onAddEvent: (event: Change) => void;
};

const AddChangeForm = ({onAddEvent}: AddChangeFormProps) => {
  const {
    handleSubmit,
    setValue,
    formState: {errors},
    control,
  } = useForm<Inputs>({
    defaultValues: {
      timestamp: new Date(),
      pee: true,
      poop: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await eventRepository.addEvent({...data, type: 'change', timestamp: Timestamp.fromDate(data.timestamp)});
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="timestamp"
        render={({field: {onChange, onBlur, value}}) => <TimeInput onChange={onChange} onBlur={onBlur} value={value} />}
      />

      <PeePoop>
        <Controller
          control={control}
          name="pee"
          render={({field: {onChange, onBlur, value}}) => (
            <CheckboxInput
              onChange={value => {
                onChange(value);
                if (false === value) {
                  setValue('poop', false);
                }
              }}
              onBlur={onBlur}
              value={value}
              icon="1"
            />
          )}
        />
        {errors.pee && <span>This field is required</span>}
        <Controller
          control={control}
          name="poop"
          render={({field: {onChange, onBlur, value}}) => (
            <CheckboxInput
              onChange={value => {
                onChange(value);
                if (true === value) {
                  setValue('pee', true);
                }
              }}
              onBlur={onBlur}
              value={value}
              icon="2"
            />
          )}
        />
        {errors.poop && <span>This field is required</span>}
      </PeePoop>

      <Submit />
    </Form>
  );
};

export {AddChangeForm};