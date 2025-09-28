// MusicPlayerFacade.ts
import { AudioEngine } from "./core/AudioEngine";
import type { Playlist } from "./models/Playlist";
import type { Song } from "./models/Song";
import type { PlayStrategy } from "./strategies/PlayStrategy";
import { DeviceType } from "./enums/DeviceType";
import { PlayStrategyType } from "./enums/PlayStrategyType";
import { DeviceManager } from "./managers/DeviceManager";
import { PlaylistManager } from "./managers/PlaylistManager";
import { StrategyManager } from "./managers/StrategyManager";

export class MusicPlayerFacade {
  private static instance: MusicPlayerFacade | null = null;

  private audioEngine: AudioEngine;
  private loadedPlaylist: Playlist | null = null;
  private playStrategy: PlayStrategy | null = null;

  private constructor() {
    this.audioEngine = new AudioEngine();
  }

  static getInstance(): MusicPlayerFacade {
    if (!MusicPlayerFacade.instance) {
      MusicPlayerFacade.instance = new MusicPlayerFacade();
    }
    return MusicPlayerFacade.instance;
  }

  connectDevice(deviceType: DeviceType): void {
    DeviceManager.getInstance().connect(deviceType);
  }

  setPlayStrategy(strategyType: PlayStrategyType): void {
    this.playStrategy = StrategyManager.getInstance().getStrategy(strategyType);
  }

  loadPlaylist(name: string): void {
    this.loadedPlaylist = PlaylistManager.getInstance().getPlaylist(name);
    if (!this.playStrategy) {
      throw new Error("Play strategy not set before loading.");
    }
    this.playStrategy.setPlaylist(this.loadedPlaylist);
  }

  playSong(song: Song | null): void {
    if (!DeviceManager.getInstance().hasOutputDevice()) {
      throw new Error("No audio device connected.");
    }
    const device = DeviceManager.getInstance().getOutputDevice();
    this.audioEngine.play(device, song);
  }

  pauseSong(song: Song): void {
    if (this.audioEngine.getCurrentSongTitle() !== song.getTitle()) {
      throw new Error(
        `Cannot pause "${song.getTitle()}"; not currently playing.`
      );
    }
    this.audioEngine.pause();
  }

  playAllTracks(): void {
    if (!this.loadedPlaylist) {
      throw new Error("No playlist loaded.");
    }
    if (!this.playStrategy) {
      throw new Error("No play strategy set.");
    }

    while (this.playStrategy.hasNext()) {
      const nextSong = this.playStrategy.next();
      const device = DeviceManager.getInstance().getOutputDevice();
      this.audioEngine.play(device, nextSong);
    }
    console.log(`Completed playlist: ${this.loadedPlaylist.name}`);
  }

  playNextTrack(): void {
    if (!this.loadedPlaylist) {
      throw new Error("No playlist loaded.");
    }
    if (!this.playStrategy) {
      throw new Error("No play strategy set.");
    }

    if (this.playStrategy.hasNext()) {
      const nextSong = this.playStrategy.next();
      const device = DeviceManager.getInstance().getOutputDevice();
      this.audioEngine.play(device, nextSong);
    } else {
      console.log(`Completed playlist: ${this.loadedPlaylist.name}`);
    }
  }

  playPreviousTrack(): void {
    if (!this.loadedPlaylist) {
      throw new Error("No playlist loaded.");
    }
    if (!this.playStrategy) {
      throw new Error("No play strategy set.");
    }

    if (this.playStrategy.hasPrevious()) {
      const prevSong = this.playStrategy.previous();
      const device = DeviceManager.getInstance().getOutputDevice();
      this.audioEngine.play(device, prevSong);
    } else {
      console.log(`Completed playlist: ${this.loadedPlaylist.name}`);
    }
  }

  enqueueNext(song: Song): void {
    if (!this.playStrategy) {
      throw new Error("No play strategy set.");
    }
    // Only strategies that support addToNext will implement it (optional in TS interface)
    if (typeof (this.playStrategy as any).addToNext === "function") {
      (this.playStrategy as any).addToNext(song);
    } else {
      throw new Error("Current play strategy does not support enqueueing.");
    }
  }
}
