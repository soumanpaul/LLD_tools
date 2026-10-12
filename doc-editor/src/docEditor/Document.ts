import { DocumentElement } from "./DocumentElement";

export class Document {
  private documentElements: DocumentElement[] = [];

  addElement(element: DocumentElement): void {
    this.documentElements.push(element);
  }

  render(): string {
    return this.documentElements.map((e) => e.render()).join("");
  }
}
