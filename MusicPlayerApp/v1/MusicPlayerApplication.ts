// MusicPlayerApplication.ts
import { MusicPlayerFacade } from "./MusicPlayerFacade";
import { PlaylistManager } from "./managers/PlaylistManager";
import { DeviceType } from "./enums/DeviceType";
import { PlayStrategyType } from "./enums/PlayStrategyType";
import { Song } from "./models/Song";

export class MusicPlayerApplication {
  private static instance: MusicPlayerApplication | null = null;

  private songLibrary: Song[] = [];

  private constructor() {}

  static getInstance(): MusicPlayerApplication {
    if (!MusicPlayerApplication.instance) {
      MusicPlayerApplication.instance = new MusicPlayerApplication();
    }
    return MusicPlayerApplication.instance;
  }

  createSongInLibrary(title: string, artist: string, path: string): void {
    const newSong = new Song(title, artist, path);
    this.songLibrary.push(newSong);
  }

  findSongByTitle(title: string): Song | null {
    for (const s of this.songLibrary) {
      if (s.getTitle() === title) {
        return s;
      }
    }
    return null;
  }

  createPlaylist(playlistName: string): void {
    PlaylistManager.getInstance().createPlaylist(playlistName);
  }

  addSongToPlaylist(playlistName: string, songTitle: string): void {
    const song = this.findSongByTitle(songTitle);
    if (!song) {
      throw new Error(`Song "${songTitle}" not found in library.`);
    }
    PlaylistManager.getInstance().addSongToPlaylist(playlistName, song);
  }

  connectAudioDevice(deviceType: DeviceType): void {
    MusicPlayerFacade.getInstance().connectDevice(deviceType);
  }

  selectPlayStrategy(strategyType: PlayStrategyType): void {
    MusicPlayerFacade.getInstance().setPlayStrategy(strategyType);
  }

  loadPlaylist(playlistName: string): void {
    MusicPlayerFacade.getInstance().loadPlaylist(playlistName);
  }

  playSingleSong(songTitle: string): void {
    const song = this.findSongByTitle(songTitle);
    if (!song) {
      throw new Error(`Song "${songTitle}" not found.`);
    }
    MusicPlayerFacade.getInstance().playSong(song);
  }

  pauseCurrentSong(songTitle: string): void {
    const song = this.findSongByTitle(songTitle);
    if (!song) {
      throw new Error(`Song "${songTitle}" not found.`);
    }
    MusicPlayerFacade.getInstance().pauseSong(song);
  }

  playAllTracksInPlaylist(): void {
    MusicPlayerFacade.getInstance().playAllTracks();
  }

  playPreviousTrackInPlaylist(): void {
    MusicPlayerFacade.getInstance().playPreviousTrack();
  }

  queueSongNext(songTitle: string): void {
    const song = this.findSongByTitle(songTitle);
    if (!song) {
      throw new Error(`Song "${songTitle}" not found.`);
    }
    MusicPlayerFacade.getInstance().enqueueNext(song);
  }
}
