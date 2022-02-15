import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { hours, minutes, words } from './word-list';

type Grid = string[][]

type Word = {
  characters: string
  start: number
  row: number
};

@Injectable({
  providedIn: 'root',
})
export class GridService {
  cells: number;
  rows: number;
  random = new BehaviorSubject<Grid>([]);
  time = new BehaviorSubject<Grid>([]);

  constructor() {
    this.cells = 13;
    this.rows = 8;

    const empty = this.generate();
    const random = this.fillRandom(empty);
    const time = this.fillTime(empty);

    this.random.next(random);
    this.time.next(time);
  }

  private fillRandom(grid: Grid): Grid {
    const random = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      return chars.charAt(Math.floor(Math.random() * chars.length));
    };
    let last = '';

    return grid.map(row => row.map(() => {
      let char = random();

      while (char === last) {
        char = random();
      }

      last = char;

      return char;
    }));
  }

  private fillTime(grid: Grid): Grid {
    const update = [...grid];

    const fillWord = (g: Grid, w: Word) => {
      w.characters.split('')
        .forEach((char, index) => {
          g[w.row][w.start + index] = char;
        });

    };

    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();

    fillWord(update, words['its']);
    let minutesSet = false;

    if (minute > 2 && minute <= 7 || minute > 53 && minute < 58) {
      fillWord(update, minutes[5]);
      fillWord(update, words['minutes']);
      minutesSet = true;

    } else if (minute > 7 && minute <= 13 || minute > 47 && minute <= 53) {
      fillWord(update, minutes[10]);
      fillWord(update, words['minutes']);
      minutesSet = true;

    } else if (minute > 13 && minute <= 17 || minute > 42 && minute <= 47) {
      fillWord(update, minutes[15]);
      fillWord(update, words['a']);
      minutesSet = true;

    } else if (minute > 17 && minute <= 25 || minute > 35 && minute <= 42) {
      fillWord(update, minutes[20]);
      fillWord(update, words['minutes']);
      minutesSet = true;

    } else if (minute > 25 && minute <= 35) {
      fillWord(update, minutes[30]);
      fillWord(update, words['a']);
      minutesSet = true;

    }

    if (minutesSet) {
      if (minute <= 35) {
        fillWord(update, words['past']);
      } else {
        fillWord(update, words['to']);
        hour++;
      }
    } else {
      if (minute >= 30) {
        hour++;
      }
      fillWord(update, words['oclock']);
    }

    if (hour > 12) {
      hour = hour - 12;
    } else if (hour === 0) {
      hour = 12;
    }
    fillWord(update, hours[hour]);

    return update;
  }

  private generate(): Grid {
    const row: string[] = Array(this.cells)
      .fill('');

    return Array(this.rows)
      .fill([])
      .map(() => [...row]);
  }
}
