// RandomPlayStrategy.ts
import type { Song } from "../models/Song";
import type { Playlist } from "../models/Playlist";
import type { PlayStrategy } from "./PlayStrategy";

export class RandomPlayStrategy implements PlayStrategy {
  private currentPlaylist: Playlist | null = null;
  private remainingSongs: Song[] = [];
  private history: Song[] = []; // acts like a stack (push/pop from end)

  setPlaylist(playlist: Playlist): void {
    this.currentPlaylist = playlist;

    if (!this.currentPlaylist || this.currentPlaylist.size === 0) {
      this.remainingSongs = [];
      this.history = [];
      return;
    }

    // clone the songs into a working list
    this.remainingSongs = [...this.currentPlaylist.songs];
    this.history = [];
  }

  hasNext(): boolean {
    return !!this.currentPlaylist && this.remainingSongs.length > 0;
  }

  next(): Song {
    if (!this.currentPlaylist || this.currentPlaylist.size === 0) {
      throw new Error("No playlist loaded or playlist is empty.");
    }
    if (this.remainingSongs.length === 0) {
      throw new Error("No songs left to play.");
    }

    // pick random index
    const idx = Math.floor(Math.random() * this.remainingSongs.length);
    const selectedSong = this.remainingSongs[idx];

    // remove it efficiently (swap & pop in C++ style)
    this.remainingSongs[idx] =
      this.remainingSongs[this.remainingSongs.length - 1];
    this.remainingSongs.pop();

    this.history.push(selectedSong);
    return selectedSong;
  }

  hasPrevious(): boolean {
    return this.history.length > 0;
  }

  previous(): Song {
    if (this.history.length === 0) {
      throw new Error("No previous song available.");
    }
    return this.history.pop()!; // non-null because we checked length
  }
}
