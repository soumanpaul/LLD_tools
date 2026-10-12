import { DocumentElement } from "../DocumentElement";

export class NewLineElement extends DocumentElement {
  render(): string {
    return "\n";
  }
}
