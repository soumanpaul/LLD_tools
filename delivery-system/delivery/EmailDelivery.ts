import { IDeliveryMethod } from '../interfaces/IDeliveryMethod';
export class EmailDelivery implements IDeliveryMethod {
  send(document: string): boolean {
    console.log(`📧 Email sent: ${document}`);
    return true;
  }
}
