// PlayStrategy.ts
import type { Song } from "../models/Song";
import type { Playlist } from "../models/Playlist";

export interface PlayStrategy {
  setPlaylist(playlist: Playlist): void;
  next(): Song | null; // TS doesn’t have raw pointers, so null makes sense
  hasNext(): boolean;
  previous(): Song | null;
  hasPrevious(): boolean;
  addToNext?(song: Song): void; // optional, since base C++ gave empty default
}
