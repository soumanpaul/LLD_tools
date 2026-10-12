import { Persistence } from "../persistance/Persistence";

export class DocumentSaver {
  constructor(private strategy: Persistence) {}

  setStrategy(strategy: Persistence) {
    this.strategy = strategy;
  }

  save(data: string) {
    this.strategy.save(data);
  }
}
