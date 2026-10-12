import { Document } from "./Document";
import { Persistence } from "../persistance/Persistence";
import { TextElement } from "./elements/TextElement";
import { ImageElement } from "./elements/ImageElement";
import { NewLineElement } from "./elements/NewLineElement";
import { TabSpaceElement } from "./elements/TabSpaceElement";

export class DocumentEditor {
  private renderedDocument = "";

  // constructor(private document: Document) {}. if we saperate storage
  constructor(private document: Document, private storage: Persistence) {}

  addText(text: string): void {
    this.document.addElement(new TextElement(text));
  }

  addImage(imagePath: string): void {
    this.document.addElement(new ImageElement(imagePath));
  }

  addNewLine(): void {
    this.document.addElement(new NewLineElement());
  }

  addTabSpace(): void {
    this.document.addElement(new TabSpaceElement());
  }

  renderDocument(): string {
    if (!this.renderedDocument) {
      this.renderedDocument = this.document.render();
    }
    return this.renderedDocument;
  }
  // if we saperate storage
  //  getDocument(): Document {
  //   return this.document;
  // }

  saveDocument(): void {
    this.storage.save(this.renderDocument());
  }
}
