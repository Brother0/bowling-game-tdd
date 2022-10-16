import BowlingGameFrame from './game-frame';
import { LAST_FRAME_INDEX } from './constants';

export default class BowlingGame {
  private frames: BowlingGameFrame[];
  private index = 0;

  constructor() {
    let Frame = new BowlingGameFrame();
    this.frames = [Frame];
    for (let i = 1; i < LAST_FRAME_INDEX; i += 1) {
      const PreviousFrame = Frame as BowlingGameFrame;
      Frame = new BowlingGameFrame({ previous: PreviousFrame });
      this.frames.push(Frame);
    }
  }

  getScore() {
    return this.frames.reduce((acc, frame) => acc + frame.getScore(), 0);
  }

  printScoreBoard(logger: IBowlingGameLogger) {
    const output = `
    Player: ${logger?.playerName}
    -----------------------------
    ${this.frames
      .reduce(
        (acc, frame, index) =>
          `${acc}Frame ${(index + 1)
            .toString()
            .padStart(2, '0')}:        ${frame
            .getRollHistory()
            .join(' | ')}\n    `,
        ''
      )
      .trim()}
    -----------------------------
    Total score: ${this.getScore()}
    `;

    logger.log(output);
  }

  roll(pins: number) {
    if (this.frames[this.index]?.getRemainingRolls()) {
      this.frames[this.index]?.roll(pins);
      return;
    }

    if (this.index < LAST_FRAME_INDEX - 1) {
      this.index += 1;
      this.frames[this.index]?.roll(pins);
      return;
    }

    throw new Error(`Game is completed. You have rolled ${this.getScore()}`);
  }
}

export interface IBowlingGameLogger {
  log: typeof console.log;
  playerName?: string;
}
