export interface IDeliveryMethod {
  send(document: string): boolean;
}
