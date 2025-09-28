// SequentialPlayStrategy.ts
import type { Song } from "../models/Song";
import type { Playlist } from "../models/Playlist";
import type { PlayStrategy } from "./PlayStrategy";

export class SequentialPlayStrategy implements PlayStrategy {
  private currentPlaylist: Playlist | null = null;
  private currentIndex = -1;

  setPlaylist(playlist: Playlist): void {
    this.currentPlaylist = playlist;
    this.currentIndex = -1;
  }

  hasNext(): boolean {
    if (!this.currentPlaylist) return false;
    return this.currentIndex + 1 < this.currentPlaylist.size;
  }

  next(): Song {
    if (!this.currentPlaylist || this.currentPlaylist.size === 0) {
      throw new Error("No playlist loaded or playlist is empty.");
    }
    this.currentIndex++;
    return this.currentPlaylist.songs[this.currentIndex];
  }

  hasPrevious(): boolean {
    if (!this.currentPlaylist) return false;
    return this.currentIndex - 1 >= 0; // ✅ corrected from C++ bug
  }

  previous(): Song {
    if (!this.currentPlaylist || this.currentPlaylist.size === 0) {
      throw new Error("No playlist loaded or playlist is empty.");
    }
    this.currentIndex--;
    return this.currentPlaylist.songs[this.currentIndex];
  }
}
