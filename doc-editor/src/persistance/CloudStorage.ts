import { Persistence } from "./Persistence";

export class CloudStorage implements Persistence {
  save(data: string): void {
    console.log("Simulated save to cloud storage.");
  }
}
