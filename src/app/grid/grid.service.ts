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
    const time = this.fillTime();

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

  private fillTime(): Grid {
    const grid = this.generate();
    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();

    let word = this.wordsService.word('its');
    this.fillWord(grid, word);
    let minutesSet = false;

    if (minute > 2 && minute <= 7 || minute > 53 && minute < 58) {
      word = this.wordsService.minute(5);
      this.fillWord(grid, word);
      word = this.wordsService.word('minutes');
      this.fillWord(grid, word);
      minutesSet = true;

    } else if (minute > 7 && minute <= 13 || minute > 47 && minute <= 53) {
      word = this.wordsService.minute(10);
      this.fillWord(grid, word);
      word = this.wordsService.word('minutes');
      this.fillWord(grid, word);
      minutesSet = true;

    } else if (minute > 13 && minute <= 17 || minute > 42 && minute <= 47) {
      word = this.wordsService.minute(15);
      this.fillWord(grid, word);
      word = this.wordsService.word('a');
      this.fillWord(grid, word);
      minutesSet = true;

    } else if (minute > 17 && minute <= 25 || minute > 35 && minute <= 42) {
      word = this.wordsService.minute(20);
      this.fillWord(grid, word);
      word = this.wordsService.word('minutes');
      this.fillWord(grid, word);
      minutesSet = true;

    } else if (minute > 25 && minute <= 35) {
      word = this.wordsService.minute(30);
      this.fillWord(grid, word);
      word = this.wordsService.word('a');
      this.fillWord(grid, word);
      minutesSet = true;

    }

    if (minutesSet) {
      if (minute <= 35) {
        word = word = this.wordsService.word('past');
        this.fillWord(grid, word);
      } else {
        word = word = this.wordsService.word('to');
        this.fillWord(grid, word);
        hour++;
      }
    } else {
      if (minute >= 30) {
        hour++;
      }
      word = word = this.wordsService.word('oclock');
      this.fillWord(grid, word);
    }

    if (hour > 12) {
      hour = hour - 12;
    } else if (hour === 0) {
      hour = 12;
    }
    word = this.wordsService.hour(hour);
    this.fillWord(grid, word);

    return grid;
  }

  private fillWord(grid: Grid, word: Word): void {
    word.characters.split('')
      .forEach((char, index) => {
        grid[word.row][word.start + index] = char;
      });
  }

  private generate(): Grid {
    const row: string[] = Array(this.cells)
      .fill('');

    return Array(this.rows)
      .fill([])
      .map(() => [...row]);
  }
}
