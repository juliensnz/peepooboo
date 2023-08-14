import {Event} from '@/domain/model/Event';
import {eventRepository} from '@/infrastructure/EventRepository';
import {useState, useEffect, useCallback} from 'react';

const useStreamEvents = <T extends Event>(type: T['type']) => {
  const [events, setEvents] = useState<T[]>([]);

  useEffect(() => {
    const streamResult = eventRepository.streamEvents<T>(setEvents, type);

    if (streamResult.isError()) throw streamResult.getError();

    return streamResult.get();
  }, [type]);

  const addEvent = useCallback(async (event: Omit<T, 'id'>) => {
    const result = await eventRepository.addEvent(event);

    if (result.isError()) throw result.getError();
  }, []);

  return [events, addEvent] as const;
};

export {useStreamEvents};
