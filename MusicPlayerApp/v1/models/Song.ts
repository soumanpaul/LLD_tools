// export interface Song {
//   id: string;
//   title: string;
//   artist: string;
//   // add whatever else you need
// }

// Song.ts

export class Song {
  private readonly title: string;
  private readonly artist: string;
  private readonly filePath: string;

  constructor(t: string, a: string, f: string) {
    this.title = t;
    this.artist = a;
    this.filePath = f;
  }
  getTitle(): string {
    return this.title;
  }
  getArtist(): string {
    return this.artist;
  }
  getFilePath(): string {
    return this.filePath;
  }
}
