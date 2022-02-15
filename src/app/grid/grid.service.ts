import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Word, WordsService } from './words.service';

export type Grid = string[][]

@Injectable({
  providedIn: 'root',
})
export class GridService {
  cells: number;
  rows: number;
  random = new BehaviorSubject<Grid>([]);
  time = new BehaviorSubject<Grid>([]);

  constructor(
    private wordsService: WordsService,
  ) {
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
    const fillWord = (word: Word): void => {
      word.characters.split('')
        .forEach((char, index) => {
          grid[word.row][word.start + index] = char;
        });
    };

    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();

    fillWord(this.wordsService.word('its'));
    let minutesSet = false;

    if (minute > 2 && minute <= 7 || minute > 53 && minute < 58) {
      fillWord(this.wordsService.minute(5));
      fillWord(this.wordsService.word('minutes'));
      minutesSet = true;

    } else if (minute > 7 && minute <= 13 || minute > 47 && minute <= 53) {
      fillWord(this.wordsService.minute(10));
      fillWord(this.wordsService.word('minutes'));
      minutesSet = true;

    } else if (minute > 13 && minute <= 17 || minute > 42 && minute <= 47) {
      fillWord(this.wordsService.minute(15));
      fillWord(this.wordsService.word('a'));
      minutesSet = true;

    } else if (minute > 17 && minute <= 25 || minute > 35 && minute <= 42) {
      fillWord(this.wordsService.minute(20));
      fillWord(this.wordsService.word('minutes'));
      minutesSet = true;

    } else if (minute > 25 && minute <= 35) {
      fillWord(this.wordsService.minute(30));
      fillWord(this.wordsService.word('a'));
      minutesSet = true;

    }

    if (minutesSet) {
      if (minute <= 35) {
        fillWord(this.wordsService.word('past'));
      } else {
        fillWord(this.wordsService.word('to'));
        hour++;
      }
    } else {
      if (minute >= 30) {
        hour++;
      }
      fillWord(this.wordsService.word('oclock'));
    }

    if (hour > 12) {
      hour = hour - 12;
    } else if (hour === 0) {
      hour = 12;
    }
    fillWord(this.wordsService.hour(hour));

    return grid;
  }

  private generate(): Grid {
    const row: string[] = Array(this.cells)
      .fill('');

    return Array(this.rows)
      .fill([])
      .map(() => [...row]);
  }
}
