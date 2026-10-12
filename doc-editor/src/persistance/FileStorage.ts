import { Persistence } from "./Persistence";
import * as fs from "fs";

export class FileStorage implements Persistence {
  save(data: string): void {
    fs.writeFileSync("document.txt", data);
    console.log("Document saved to document.txt");
  }
}
