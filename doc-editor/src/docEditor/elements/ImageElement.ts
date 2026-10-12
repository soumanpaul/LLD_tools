import { DocumentElement } from "../DocumentElement";

export class ImageElement extends DocumentElement {
  constructor(private imagePath: string) {
    super();
  }

  render(): string {
    return `[Image: ${this.imagePath}]`;
  }
}
