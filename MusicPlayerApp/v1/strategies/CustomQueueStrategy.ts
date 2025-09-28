// CustomQueueStrategy.ts
import type { Song } from "../models/Song";
import type { Playlist } from "../models/Playlist";
import type { PlayStrategy } from "./PlayStrategy";

export class CustomQueueStrategy implements PlayStrategy {
  private currentPlaylist: Playlist | null = null;
  private currentIndex = -1;

  // Use arrays to model queue/stack behavior
  private nextQueue: Song[] = []; // enqueue: push, dequeue: shift
  private prevStack: Song[] = []; // push/pop at end

  setPlaylist(playlist: Playlist): void {
    this.currentPlaylist = playlist;
    this.currentIndex = -1;
    this.nextQueue = [];
    this.prevStack = [];
  }

  hasNext(): boolean {
    return (
      !!this.currentPlaylist &&
      this.currentIndex + 1 < this.currentPlaylist.size
    );
  }

  next(): Song {
    if (!this.currentPlaylist || this.currentPlaylist.size === 0) {
      throw new Error("No playlist loaded or playlist is empty.");
    }

    // If user enqueued a specific next song, honor that first.
    if (this.nextQueue.length > 0) {
      const s = this.nextQueue.shift()!;
      this.prevStack.push(s);
      // Sync index to the queued song (by object identity)
      const idx = this.indexOfSongInPlaylist(s);
      if (idx === -1) {
        // If the queued song isn't in the playlist, treat as error (same spirit as C++)
        throw new Error("Queued song is not in the current playlist.");
      }
      this.currentIndex = idx;
      return s;
    }

    // Otherwise, go sequentially
    return this.nextSequential();
  }

  hasPrevious(): boolean {
    if (!this.currentPlaylist) return false;
    // allow stepping back to index 0 (fixes the (> 0) bug in the C++)
    return this.currentIndex - 1 >= 0 || this.prevStack.length > 0;
  }

  previous(): Song {
    if (!this.currentPlaylist || this.currentPlaylist.size === 0) {
      throw new Error("No playlist loaded or playlist is empty.");
    }

    // If there’s a history stack (from queued plays), pop that first
    if (this.prevStack.length > 0) {
      const s = this.prevStack.pop()!;
      const idx = this.indexOfSongInPlaylist(s);
      if (idx === -1) {
        throw new Error("Previous song is not in the current playlist.");
      }
      this.currentIndex = idx;
      return s;
    }

    // Otherwise, go sequentially backwards
    return this.previousSequential();
  }

  addToNext(song: Song): void {
    if (song == null) {
      throw new Error("Cannot enqueue null song.");
    }
    this.nextQueue.push(song);
  }

  // ---- helpers (private) ----

  private nextSequential(): Song {
    if (!this.currentPlaylist || this.currentPlaylist.size === 0) {
      throw new Error("Playlist is empty.");
    }
    if (!(this.currentIndex + 1 < this.currentPlaylist.size)) {
      throw new Error("No next song available.");
    }
    this.currentIndex += 1;
    return this.currentPlaylist.songs[this.currentIndex];
  }

  private previousSequential(): Song {
    if (!this.currentPlaylist || this.currentPlaylist.size === 0) {
      throw new Error("Playlist is empty.");
    }
    if (!(this.currentIndex - 1 >= 0)) {
      throw new Error("No previous song available.");
    }
    this.currentIndex -= 1;
    return this.currentPlaylist.songs[this.currentIndex];
  }

  private indexOfSongInPlaylist(s: Song): number {
    // identity-based lookup to mirror pointer equality in C++
    if (!this.currentPlaylist) return -1;
    const list = this.currentPlaylist.songs;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === s) return i;
    }
    return -1;
  }
}
