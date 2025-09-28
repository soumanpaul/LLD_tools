// Playlist.ts
import type { Song } from "./Song";

export class Playlist {
  private readonly playlistName: string;
  private readonly songList: Song[] = [];

  constructor(name: string) {
    this.playlistName = name;
  }
  get name(): string {
    return this.playlistName;
  }
  get songs(): ReadonlyArray<Song> {
    return this.songList;
  }
  get size(): number {
    return this.songList.length;
  }
  addSongToPlaylist(song: Song): void {
    if (song == null) {
      throw new Error("Cannot add null song to playlist.");
    }
    this.songList.push(song);
  }
}
