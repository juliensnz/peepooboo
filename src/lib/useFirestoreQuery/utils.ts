import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocFromCache,
  getDocFromServer,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  Query,
  QuerySnapshot,
  SnapshotListenOptions,
} from 'firebase/firestore';

export type GetSnapshotSource = 'server' | 'cache';

export type GetSnapshotOptions = {
  source?: GetSnapshotSource;
};

export type UseFirestoreHookOptions =
  | ({
      subscribe: true;
    } & SnapshotListenOptions)
  | ({
      subscribe?: false;
    } & GetSnapshotOptions);

export type WithIdField<D, F = void> = F extends string ? D & {[key in F]: string} : D;

export async function getSnapshot<T>(
  ref: DocumentReference<T>,
  source?: GetSnapshotSource
): Promise<DocumentSnapshot<T>> {
  let snapshot: DocumentSnapshot<T>;

  if (source === 'cache') {
    snapshot = await getDocFromCache(ref);
  } else if (source === 'server') {
    snapshot = await getDocFromServer(ref);
  } else {
    snapshot = await getDoc(ref);
  }

  return snapshot;
}

export type NamedQueryPromise<T> = () => Promise<Query<T> | null>;

export type NamedQuery<T = DocumentData> = Query<T> | NamedQueryPromise<T>;

export type QueryType<T> = Query<T> | NamedQuery<T>;

export async function getQuerySnapshot<T>(query: Query<T>, source?: GetSnapshotSource): Promise<QuerySnapshot<T>> {
  let snapshot: QuerySnapshot<T>;

  if (source === 'cache') {
    snapshot = await getDocsFromCache(query);
  } else if (source === 'server') {
    snapshot = await getDocsFromServer(query);
  } else {
    snapshot = await getDocs(query);
  }

  return snapshot;
}

function isNamedQuery<T>(query: QueryType<T>): query is NamedQuery<T> {
  return typeof query === 'function';
}

export async function resolveQuery<T>(query: QueryType<T>): Promise<Query<T>> {
  if (isNamedQuery(query)) {
    if (typeof query === 'function') {
      // Firebase throws an error if the query doesn't exist.
      const resolved = await query();
      return resolved!;
    }

    return query;
  }

  return query;
}
