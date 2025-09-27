import { IDeliveryMethod } from "../interfaces/IDeliveryMethod";
import { Logger } from "../utils/Logger";

export class DeliveryService {
  constructor(private method: IDeliveryMethod) {}

  deliver(doc: string): boolean {
    Logger.info("Initiating delivery...");
    return this.method.send(doc);
  }
}
