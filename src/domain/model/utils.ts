import {RuntimeError} from './RuntimeError';
import {Either, Result} from './Result';

type UUID = string;

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
const isString = (value: unknown): value is string => typeof value === 'string';
const convertStringToBool = (value: 'true' | 'false'): boolean => value === 'true';
const isStringCollection = (value: unknown): value is string[] => Array.isArray(value) && value.every(isString);
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isArray = (value: unknown): value is Array<unknown> => Array.isArray(value);
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isMeasurement = (value: unknown): value is {value: string; unit: string} =>
  isObject(value) && isString(value.value) && isString(value.unit);
const isPrice = (value: unknown): value is {amount: string; currency: string} =>
  isObject(value) && isString(value.amount) && isString(value.currency);
const isMedia = (value: unknown): value is {type: 'media' | 'url'; value: string} =>
  isObject(value) && isString(value.type) && ['media', 'url'].includes(value.type) && isString(value.value);
const camelToSnakeCase = (str: string): string => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
const capitalize = <T extends string>(value: T) => (value.charAt(0).toUpperCase() + value.slice(1)) as Capitalize<T>;

const waitFor = (time: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Capitalize<T>}${Capitalize<SnakeToCamelCase<U>>}`
  : Capitalize<S>;

const upperCamelize = <T extends string>(value: T): SnakeToCamelCase<T> =>
  value.split('_').map(capitalize).join('') as SnakeToCamelCase<T>;

type PositiveInteger<T extends number> = number extends T
  ? never
  : `${T}` extends `-${string}` | `${string}.${string}` | `0`
  ? never
  : T;

const groupIntoBatches = <T, BatchSizeType extends number>(
  iterator: T[],
  batchSize: PositiveInteger<BatchSizeType>
): T[][] => {
  const batchCount = Math.ceil(iterator.length / batchSize);

  return Array.from({length: batchCount}, (_, i) => iterator.slice(i * batchSize, (i + 1) * batchSize));
};

const pick = <ValueType>(
  source: Record<string, ValueType>,
  includedKeys: Array<keyof typeof source>
): Record<string, ValueType> =>
  Object.fromEntries(Object.entries(source).filter(([key]) => includedKeys.includes(key)));

const omit = <ObjectType extends Record<string, unknown>, KeyType extends (keyof ObjectType)[]>(
  source: ObjectType,
  excludedKeys: KeyType
): Omit<ObjectType, KeyType[number]> =>
  Object.fromEntries(Object.entries(source).filter(([key]) => !excludedKeys.includes(key))) as Omit<
    ObjectType,
    KeyType[number]
  >;

const parseJSON = <T>(json: string): Either<T, RuntimeError> => {
  try {
    return Result.Ok(JSON.parse(json));
  } catch (error) {
    return Result.fromNativeError(error, {
      type: 'parse_json',
      message: 'Unable to parse JSON',
      payload: {
        data: json,
      },
    });
  }
};

const arrayUnique = <T = unknown>(...arrays: T[][]): T[] => [...new Set([...arrays.flat()])];

const areObjectsEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
  const keys = arrayUnique([...Object.keys(obj1), ...Object.keys(obj2)]);
  return keys.every(key => obj1[key] === obj2[key]);
};

const indexBy = <Item extends Record<string, unknown>, Key extends keyof Item>(
  items: Item[],
  key: Key
): Record<Key, Item> => Object.fromEntries(items.map(item => [item[key], item])) as Record<Key, Item>;

const groupBy = <T>(array: T[], key: (item: T) => string | number) =>
  array.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<string | number, T[]>);

export {
  areObjectsEqual,
  arrayUnique,
  camelToSnakeCase,
  capitalize,
  convertStringToBool,
  groupBy,
  groupIntoBatches,
  indexBy,
  isArray,
  isBoolean,
  isMeasurement,
  isMedia,
  isNumber,
  isObject,
  isPrice,
  isString,
  isStringCollection,
  omit,
  parseJSON,
  pick,
  upperCamelize,
  waitFor,
};

export type {UUID};
