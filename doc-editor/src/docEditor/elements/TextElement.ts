import { DocumentElement } from "../DocumentElement";

export class TextElement extends DocumentElement {
  constructor(private text: string) {
    super();
  }

  render(): string {
    return this.text;
  }
}
