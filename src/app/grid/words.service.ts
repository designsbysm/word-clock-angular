import { Injectable } from '@angular/core';

export type Word = {
  characters: string
  start: number
  row: number
};

type List = {
  [key: number | string]: Word
}

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  private hours: List = {
    1: {
      characters: 'ONE',
      start: 7,
      row: 3,
    },
    2: {
      characters: 'TWO',
      start: 9,
      row: 3,
    },
    3: {
      characters: 'THREE',
      start: 0,
      row: 4,
    },
    4: {
      characters: 'FOUR',
      start: 5,
      row: 4,
    },
    5: {
      characters: 'FIVE',
      start: 9,
      row: 4,
    },
    6: {
      characters: 'SIX',
      start: 0,
      row: 5,
    },
    7: {
      characters: 'SEVEN',
      start: 4,
      row: 5,
    },
    8: {
      characters: 'EIGHT',
      start: 8,
      row: 5,
    },
    9: {
      characters: 'NINE',
      start: 0,
      row: 6,
    },
    10: {
      characters: 'TEN',
      start: 0,
      row: 6,
    },
    11: {
      characters: 'ELEVEN',
      start: 0,
      row: 6,
    },
    12: {
      characters: 'TWELVE',
      start: 0,
      row: 7,
    },
  };
  private minutes: List = {
    5: {
      characters: 'FIVE',
      start: 0,
      row: 2,
    },
    10: {
      characters: 'TEN',
      start: 6,
      row: 0,
    },
    15: {
      characters: 'QUARTER',
      start: 0,
      row: 1,
    },
    20: {
      characters: 'TWENTY',
      start: 7,
      row: 1,
    },
    30: {
      characters: 'HALF',
      start: 9,
      row: 0,
    },
  };
  private words: List = {
    a: {
      characters: 'A',
      start: 4,
      row: 0,
    },
    its: {
      characters: 'ITS',
      start: 0,
      row: 0,
    },
    minutes: {
      characters: 'MINUTES',
      start: 5,
      row: 2,
    },
    oclock: {
      characters: 'OCLOCK',
      start: 7,
      row: 7,
    },
    past: {
      characters: 'PAST',
      start: 0,
      row: 3,
    },
    to: {
      characters: 'TO',
      start: 4,
      row: 3,
    },
  };

  hour(key: number): Word {
    return this.hours[key];
  }

  minute(key: number): Word {
    return this.minutes[key];
  }

  word(key: string): Word {
    return this.words[key];
  }
}
