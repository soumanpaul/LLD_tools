import { IDeliveryMethod } from '../interfaces/IDeliveryMethod';
export class FaxDelivery implements IDeliveryMethod {
  send(document: string): boolean {
    console.log(`📠 Fax sent: ${document}`);
    return true;
  }
}
