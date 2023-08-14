import {Event} from '@/domain/model/Event';
import {Result} from '@/domain/model/Result';
import {firebaseApp} from '@/lib/firebase';
import {
  getFirestore,
  doc,
  setDoc,
  Firestore,
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';

const db = getFirestore(firebaseApp);

const eventRepositoryCreator = ({db}: {db: Firestore}) => ({
  addEvent: async (event: Omit<Event, 'id'>) => {
    try {
      const id = uuidv4();
      await setDoc(doc(db, 'events', id), {...event, id});

      return Result.Ok(event);
    } catch (error) {
      return Result.Error({
        type: 'event_repository.add_event',
        message: 'Error adding event',
        payload: {event, error},
      });
    }
  },
  deleteEvent: async (eventId: Event['id']) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));

      return Result.Ok();
    } catch (error) {
      return Result.Error({
        type: 'event_repository.delete_event',
        message: 'Error deleteing event',
        payload: {eventId, error},
      });
    }
  },
  streamEvents: <T extends Event>(updateEvents: (events: T[]) => void, type: T['type']) => {
    try {
      const q = query(collection(db, 'events'), where('type', '==', type), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, querySnapshot => {
        const events: T[] = [];
        querySnapshot.forEach(doc => {
          events.push(doc.data() as T);
        });

        updateEvents(events);
      });

      return Result.Ok(unsubscribe);
    } catch (error) {
      return Result.Error({
        type: 'event_repository.stream_events',
        message: 'Error streaming events',
        payload: {error},
      });
    }
  },
});

const eventRepository = eventRepositoryCreator({db});

export {eventRepository};
