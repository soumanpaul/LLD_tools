import { Document } from "./docEditor/Document";
import { FileStorage } from "./persistance/FileStorage";
import { DocumentEditor } from "./docEditor/DocumentEditor";

const document = new Document();
const storage = new FileStorage();

const editor = new DocumentEditor(document, storage);

editor.addText("Hello, world!");
editor.addNewLine();
editor.addText("This is a real-world document editor example.");
editor.addNewLine();
editor.addTabSpace();
editor.addText("Indented text after a tab space.");
editor.addNewLine();
editor.addImage("picture.jpg");

console.log(editor.renderDocument());
editor.saveDocument();

// Render using renderer
// const renderedOutput = renderer.render(editor.getDocument());
// console.log(renderedOutput);

// Example usage of DocumentSaver with different strategies
// Render and save using strategy
// const saver = new DocumentSaver(new FileStorage());
// console.log(editor.renderDocument());
// saver.save(editor.renderDocument());

// Switch strategy at runtime (example)
// saver.setStrategy(new DBStorage());
// saver.save(editor.renderDocument());

// ✅ Summary of Benefits
// 🔹 DocumentEditor is now only concerned with building content
// 🔹 Renderer is the only place responsible for document rendering
// 🔹 DocumentSaver handles persistence strategy switching
// 🔹 Your app is now clean, extendable, and adheres to SOLID principles
