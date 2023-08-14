import {decorateError, RuntimeError} from './RuntimeError';

type Either<A, E> = Ok<A, E> | Error<A, E>;

class Ok<A, E> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isOk(): this is Ok<A, E> {
    return true;
  }

  isError(): this is Error<A, E> {
    return false;
  }

  get(): A {
    return this.value;
  }
}

class Error<A, E> {
  readonly value: E;

  constructor(value: E) {
    this.value = value;
  }

  isOk(): this is Ok<A, E> {
    return false;
  }

  isError(): this is Error<A, E> {
    return true;
  }

  getError(): E {
    return this.value;
  }
}

class Result {
  public static Ok<A, E>(value: A): Ok<A, E>;
  public static Ok<E>(): Ok<void, E>;
  public static Ok<A, E>(value?: A): Ok<A, E> | Ok<void, E> {
    if (undefined === value) {
      return new Ok<void, E>(undefined);
    }

    return new Ok(value);
  }
  static Error = <A, E>(error: E): Error<A, E> => {
    return new Error(error);
  };
  static isAllOk = <A, E>(collection: Either<A, E>[]): collection is Ok<A, E>[] => {
    return collection.every(value => value.isOk());
  };
  static isAllError = <A, E>(collection: Either<A, E>[]): collection is Error<A, E>[] => {
    return collection.every(value => value.isError());
  };
  static allOk = <A, E>(okCollection: Ok<A, E>[]): Ok<A[], E> => {
    return new Ok(okCollection.map(ok => ok.get()));
  };
  static allError = <A, E>(errorCollection: Error<A, E>[]): Error<A, E[]> => {
    return new Error(errorCollection.map(error => error.getError()));
  };
  static wrapOks = <A, E>(okCollection: Either<A, E>[]): Ok<A[], E> => {
    return new Ok(okCollection.filter((ok): ok is Ok<A, E> => ok.isOk()).map(ok => ok.get()));
  };
  static wrapErrors = <A, E>(errorCollection: Either<A, E>[]): Error<A, E[]> => {
    return new Error(
      errorCollection.filter((error): error is Error<A, E> => error.isError()).map(error => error.getError())
    );
  };
  static mapErrors = <A, E, B>(errorCollection: Either<A, E>[], mappingFn: (item: Error<A, E>) => B): B[] => {
    return errorCollection.filter((error): error is Error<A, E> => error.isError()).map(error => mappingFn(error));
  };
  static fromNativeError = <A>(nativeError: unknown, decoratingError: RuntimeError): Error<A, RuntimeError> => {
    return new Error(decorateError(nativeError, decoratingError));
  };
}

export {Error, Ok, Result};
export type {Either};
