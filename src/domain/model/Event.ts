import {Timestamp} from '@firebase/firestore';

type Change = {
  type: 'change';
  id: string;
  timestamp: Timestamp;
  poop: boolean;
  pee: boolean;
};

type BreastFeed = {
  type: 'breast_feed';
  id: string;
  timestamp: Timestamp;
  left: number;
  right: number;
};

type BottleFeed = {
  type: 'bottle_feed';
  id: string;
  timestamp: Timestamp;
  volume: number;
};

type Sleep = {
  type: 'sleep';
  id: string;
  start: Timestamp;
  end: Timestamp;
  timestamp: Timestamp;
};

type Event = Change | BreastFeed | BottleFeed | Sleep;

export type {Event, Change, BottleFeed, BreastFeed, Sleep};
