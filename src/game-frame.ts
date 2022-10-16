import { NUMBER_OF_PINS, NUMBER_OF_ROLLS, LAST_FRAME_INDEX } from './constants';
import BowlingGameErrorChecker from './game-errors';

export default class BowlingGameFrame {
  private score = 0;
  private pins = NUMBER_OF_PINS;
  private previous: BowlingGameFrame | null;
  private index: number;
  private rolls = NUMBER_OF_ROLLS;
  private rollHistory: number[] = [];
  private bonus = false;
  private additionalThrowLastFrame = false;

  constructor(input: { previous?: BowlingGameFrame } = {}) {
    BowlingGameErrorChecker.lastFrameReached(input.previous?.index || 0);
    this.previous = input.previous ?? null;
    this.index = (this.previous?.index ?? 0) + 1;
  }

  roll(roll: number) {
    BowlingGameErrorChecker.noMoreFrameRolls(this.rolls);
    BowlingGameErrorChecker.invalidRoll(roll);
    BowlingGameErrorChecker.rollGreaterThanRemainingPins(roll, this.pins);

    this.updatePreviousFrame(roll);
    this.updateFrame(roll);
  }

  getScore() {
    return this.score;
  }

  getRollHistory() {
    return this.rollHistory;
  }

  getRemainingRolls() {
    return this.rolls;
  }

  private updatePreviousFrame(roll: number) {
    if (this.previous?.bonus) {
      this.previous.score += roll;
      this.previous.bonus = false;
    }
  }

  private updateFrame(roll: number) {
    this.score += roll;
    this.pins -= roll;
    this.rolls -= 1;
    if (this.pins === 0) {
      this.updateFrameAfterStrikeOrSpare();
    }
    this.rollHistory.push(roll);
  }

  private updateFrameAfterStrikeOrSpare() {
    this.bonus = true;
    this.pins = NUMBER_OF_PINS;

    if (this.index === LAST_FRAME_INDEX && !this.additionalThrowLastFrame) {
      this.additionalThrowLastFrame = true;
      this.rolls += 1;
    }
  }
}
