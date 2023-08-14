import {useCallback} from 'react';
import {QueryKey, UseQueryOptions, UseQueryResult} from '@tanstack/react-query';
import {onSnapshot, QuerySnapshot, DocumentData, FirestoreError} from 'firebase/firestore';
import {getQuerySnapshot, QueryType, resolveQuery, UseFirestoreHookOptions} from './utils';
import {useSubscription} from './useSubscription';

type NextOrObserver<T> = (data: QuerySnapshot<T> | null) => Promise<void>;

export function useFirestoreQuery<T = DocumentData, R = QuerySnapshot<T>>(
  queryKey: QueryKey,
  query: QueryType<T>,
  options?: UseFirestoreHookOptions,
  useQueryOptions?: Omit<UseQueryOptions<QuerySnapshot<T>, FirestoreError, R>, 'queryFn'>
): UseQueryResult<R, FirestoreError> {
  const isSubscription = !!options?.subscribe;

  const subscribeFn = useCallback(
    (callback: NextOrObserver<T>) => {
      let unsubscribe = () => {
        // noop
      };
      resolveQuery(query).then(res => {
        unsubscribe = onSnapshot(
          res,
          {
            // @ts-ignore
            includeMetadataChanges: options?.includeMetadataChanges,
          },
          (snapshot: QuerySnapshot<T>) => {
            return callback(snapshot);
          }
        );
      });
      return unsubscribe;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, queryKey]
  );

  return useSubscription<QuerySnapshot<T>, FirestoreError, R>(
    queryKey,
    ['useFirestoreDocument', queryKey],
    subscribeFn,
    {
      ...useQueryOptions,
      onlyOnce: !isSubscription,
      fetchFn: () =>
        resolveQuery(query).then(resolvedQuery => {
          // @ts-ignore
          return getQuerySnapshot(resolvedQuery, options?.source);
        }),
    }
  );
}
