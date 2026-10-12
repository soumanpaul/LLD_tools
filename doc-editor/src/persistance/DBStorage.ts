import { Persistence } from "./Persistence";

export class DBStorage implements Persistence {
  save(data: string): void {
    // Simulate saving to a DB
    console.log("Saving document to DB (not implemented)");
  }
}
