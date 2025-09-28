// IAudioOutputDevice.ts
import type { Song } from "../models/Song";

export interface IAudioOutputDevice {
  playAudio(song: Song): void;
}
