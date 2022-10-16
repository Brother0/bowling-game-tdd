import { LAST_FRAME_INDEX } from './constants';

export default class BowlingGameErrorChecker {
  public static invalidRoll(roll: number) {
    if (roll < 0 || roll > 10) {
      throw new Error(`Invalid roll. It is not possible to roll ${roll} pins.`);
    }
  }

  public static noMoreFrameRolls(remainingRolls: number) {
    if (remainingRolls <= 0) {
      throw new Error(`Already rolled all rolls in this frame.`);
    }
  }

  public static rollGreaterThanRemainingPins(roll: number, pins: number) {
    if (roll > pins) {
      throw new Error(
        `Not possible to roll ${roll} pins. Only ${pins} pins remaining.`
      );
    }
  }

  public static lastFrameReached(frameIndex: number) {
    if (frameIndex === LAST_FRAME_INDEX) {
      throw new Error(`Cannot create a new frame. Last frame already reached.`);
    }
  }
}
