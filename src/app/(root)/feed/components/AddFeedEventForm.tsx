import {useModalContext} from '@/app/(root)/components/context/ModalContext';
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
  padding: 30px 0 5px 0;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Fieldset = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 1.5rem;
`;

const Select = styled.select`
  border: none;
  border-bottom: 1px solid #555;
  border-radius: 0;
  font-size: 3rem;
  font-weight: 100;
  font-variant-numeric: tabular-nums;
  border: none;
  border-bottom: 1px solid black;
  padding: 0;
  text-align: center;
  font-family: inherit;
  background-color: transparent;
  color: inherit;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
`;

const Submit = styled.input`
  border: 1px solid #555;
  border-radius: 25px;
  height: 50px;
  display: block;
  background: transparent;
  font-size: 1.5rem;
  color: white;
  padding: 5px 25px;
  margin-top: 10px;
`;

type Inputs = {
  type: 'breast_feed' | 'bottle_feed';
  timestamp: Date;
  left: number;
  right: number;
  volume: number;
};

const getMinuteLabel = (minutes: number) => {
  // @ts-ignore
  return Intl.DurationFormat
    ? // @ts-ignore
      new Intl.DurationFormat('fr', {style: 'narrow'}).format({minutes: minutes}, 'minutes')
    : `${minutes}min`;
};

const generateElements = (count: number) => Array.from({length: count}).map((_, index) => index);

type AddFeedEventFormProps = {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
};

const AddFeedEventForm = ({onAddEvent}: AddFeedEventFormProps) => {
  const {
    handleSubmit,
    formState: {errors},
    control,
    register,
    watch,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      type: 'breast_feed',
      timestamp: new Date(),
      left: 0,
      right: 0,
      volume: 10,
    },
  });

  const {closeModal} = useModalContext();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const event = {...data, timestamp: Timestamp.fromDate(data.timestamp)} as const;

    onAddEvent(event);
    reset();
    closeModal();
  };

  return (
    <Container>
      <Title>Log a new Feed</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Controller
            control={control}
            name="timestamp"
            render={({field: {onChange, onBlur, value}}) => (
              <TimeInput onChange={onChange} onBlur={onBlur} value={value} />
            )}
          />

          <Select {...register('type')}>
            <option value="breast_feed">Breast</option>
            <option value="bottle_feed">Bottle</option>
          </Select>
        </Fieldset>
        <Fieldset>
          {watch('type') === 'breast_feed' && (
            <>
              <Select {...register('left')}>
                {generateElements(30).map(index => {
                  return (
                    <option key={index} value={index}>
                      {getMinuteLabel(index)}
                    </option>
                  );
                })}
              </Select>
              <Select {...register('right')}>
                {generateElements(30).map(index => {
                  return (
                    <option key={index} value={index}>
                      {getMinuteLabel(index)}
                    </option>
                  );
                })}
              </Select>
            </>
          )}
          {watch('type') === 'bottle_feed' && (
            <Select {...register('volume')}>
              {generateElements(30).map(index => {
                const value = index * 10 + 10;

                return (
                  <option key={index} value={value}>
                    {value} ml
                  </option>
                );
              })}
            </Select>
          )}
        </Fieldset>
        <Submit type="submit" />
      </Form>
    </Container>
  );
};

export {AddFeedEventForm};
