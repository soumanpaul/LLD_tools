import { Document } from "../docEditor/Document";

export class Renderer {
  render(document: Document): string {
    return document.render();
  }
}
