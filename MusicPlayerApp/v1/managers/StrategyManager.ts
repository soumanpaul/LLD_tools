// StrategyManager.ts
import { SequentialPlayStrategy } from "../strategies/SequentialPlayStrategy";
import { RandomPlayStrategy } from "../strategies/RandomPlayStrategy";
import { CustomQueueStrategy } from "../strategies/CustomQueueStrategy";
import { PlayStrategyType } from "../enums/PlayStrategyType";
import type { PlayStrategy } from "../strategies/PlayStrategy";

export class StrategyManager {
  private static instance: StrategyManager | null = null;

  private readonly sequentialStrategy: SequentialPlayStrategy;
  private readonly randomStrategy: RandomPlayStrategy;
  private readonly customQueueStrategy: CustomQueueStrategy;

  private constructor() {
    this.sequentialStrategy = new SequentialPlayStrategy();
    this.randomStrategy = new RandomPlayStrategy();
    this.customQueueStrategy = new CustomQueueStrategy();
  }

  static getInstance(): StrategyManager {
    if (!StrategyManager.instance) {
      StrategyManager.instance = new StrategyManager();
    }
    return StrategyManager.instance;
  }

  getStrategy(type: PlayStrategyType): PlayStrategy {
    switch (type) {
      case PlayStrategyType.SEQUENTIAL:
        return this.sequentialStrategy;
      case PlayStrategyType.RANDOM:
        return this.randomStrategy;
      case PlayStrategyType.CUSTOM_QUEUE:
      default:
        return this.customQueueStrategy;
    }
  }
}
