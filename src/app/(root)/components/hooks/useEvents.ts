import {Event} from '@/domain/model/Event';
import {eventRepository} from '@/infrastructure/EventRepository';
import {useFirestoreQuery} from '@/lib/useFirestoreQuery/useFirestoreQuery';
import {useCallback} from 'react';

const useEvents = <T extends Event>(types: T['type'][]) => {
  const ref = eventRepository.getRef<T>(types);

  if (ref.isError()) throw ref.getError();

  const query = useFirestoreQuery(['events', ...types], ref.get(), {subscribe: true});

  return query;
};

const useAddEvent = <T extends Event>() => {
  return useCallback(async (event: Omit<T, 'id'>): Promise<Event> => {
    const result = await eventRepository.addEvent(event);

    if (result.isError()) throw result.getError();

    return result.get();
  }, []);
};

export {useEvents, useAddEvent};
