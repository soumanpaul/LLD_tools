import { IDeliveryMethod } from '../interfaces/IDeliveryMethod';

export class TelegramDelivery implements IDeliveryMethod {
  send(document: string): boolean {
    console.log(`💬 Telegram sent: ${document}`);
    return true;
  }
}
