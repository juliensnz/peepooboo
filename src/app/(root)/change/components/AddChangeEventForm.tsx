import {useModalContext} from '@/app/(root)/components/context/ModalContext';
import {CheckboxInput} from '@/app/(root)/components/field/CheckboxInput';
import {Submit} from '@/app/(root)/components/field/Submit';
import {TimeInput} from '@/app/(root)/components/field/TimeInput';
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
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
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

type AddChangeEventFormProps = {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
};

const AddChangeEventForm = ({onAddEvent}: AddChangeEventFormProps) => {
  const {
    handleSubmit,
    setValue,
    formState: {errors},
    control,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      timestamp: new Date(),
      pee: true,
      poop: false,
    },
  });

  const {closeModal} = useModalContext();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const event = {...data, type: 'change', timestamp: Timestamp.fromDate(data.timestamp)} as const;

    onAddEvent(event);
    reset();
    closeModal();
  };

  return (
    <Container>
      <Title>Log a new change</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="timestamp"
          render={({field: {onChange, onBlur, value}}) => (
            <TimeInput onChange={onChange} onBlur={onBlur} value={value} />
          )}
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
    </Container>
  );
};

export {AddChangeEventForm};
