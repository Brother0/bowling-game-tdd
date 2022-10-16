import BowlingGameFrame from '@src/game-frame';
import { LAST_FRAME_INDEX } from '@src/constants';
import BowlingGame, { IBowlingGameLogger } from '@src/game';

describe('bowling game tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns a representation of a standard bowling scoreboard', () => {
    expect.assertions(1);
    const logger: IBowlingGameLogger = {
      ...console,
      playerName: 'Brother0',
    };
    const Game = new BowlingGame();
    Array.from(Array(21)).forEach(() => Game.roll(10));

    const spy = jest.spyOn(logger, 'log');

    Game.printScoreBoard(logger);
    expect(spy).toHaveBeenCalledWith(`
    Player: Brother0
    -----------------------------
    Frame 01:        10 | 10
    Frame 02:        10 | 10
    Frame 03:        10 | 10
    Frame 04:        10 | 10
    Frame 05:        10 | 10
    Frame 06:        10 | 10
    Frame 07:        10 | 10
    Frame 08:        10 | 10
    Frame 09:        10 | 10
    Frame 10:        10 | 10 | 10
    -----------------------------
    Total score: 300
    `);
  });

  it('works for valid game', () => {
    expect.assertions(1);
    const Game = new BowlingGame();
    Array.from(Array(20)).forEach(() => Game.roll(1));
    expect(Game.getScore()).toBe(20);
  });

  it('returns error if no more pins in a frame', () => {
    expect.assertions(1);
    const Game = new BowlingGame();
    expect(() => [3, 8].forEach((roll) => Game.roll(roll))).toThrow(
      'Not possible to roll 8 pins. Only 7 pins remaining.'
    );
  });

  it('returns error if we try to roll negative number of pins', () => {
    expect.assertions(1);
    const Game = new BowlingGame();
    expect(() => [-1].forEach((roll) => Game.roll(roll))).toThrow(
      'Invalid roll. It is not possible to roll -1 pins.'
    );
  });

  it('returns an error if game is complete and we try to roll', () => {
    expect.assertions(2);
    const Game = new BowlingGame();
    const rolls = Array(20).fill(1);

    expect(() => rolls.forEach((roll) => Game.roll(roll))).not.toThrow();
    expect(() => Game.roll(1)).toThrow('Game is completed. You have rolled 20');
  });

  it('returns an error if game is complete and we try to roll - strike last game', () => {
    expect.assertions(2);
    const Game = new BowlingGame();
    const rolls = Array(21).fill(10);

    expect(() => rolls.forEach(() => Game.roll(10))).not.toThrow();
    expect(() => Game.roll(10)).toThrow(
      'Game is completed. You have rolled 300'
    );
  });

  it('returns error if no rolls available (standard frame)', () => {
    expect.assertions(2);
    const Frame = new BowlingGameFrame();
    expect(() => [1, 1].forEach((roll) => Frame.roll(roll))).not.toThrow();
    expect(() => Frame.roll(1)).toThrow(
      'Already rolled all rolls in this frame.'
    );
  });

  it('cannot create a frame, if last frame was reached', () => {
    expect.assertions(1);

    expect(() => {
      let Frame = new BowlingGameFrame();
      for (let i = 1; i < LAST_FRAME_INDEX + 1; i += 1) {
        const PreviousFrame = Frame as BowlingGameFrame;
        Frame = new BowlingGameFrame({ previous: PreviousFrame });
      }
    }).toThrow(`Cannot create a new frame. Last frame already reached.`);
  });
});
