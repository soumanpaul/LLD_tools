// PlaylistManager.ts
import { Playlist } from "../models/Playlist";
import type { Song } from "../models/Song";

export class PlaylistManager {
  private static instance: PlaylistManager | null = null;

  private playlists: Map<string, Playlist> = new Map();

  private constructor() {}

  static getInstance(): PlaylistManager {
    if (!PlaylistManager.instance) {
      PlaylistManager.instance = new PlaylistManager();
    }
    return PlaylistManager.instance;
  }

  createPlaylist(name: string): void {
    if (this.playlists.has(name)) {
      throw new Error(`Playlist "${name}" already exists.`);
    }
    this.playlists.set(name, new Playlist(name));
  }

  addSongToPlaylist(playlistName: string, song: Song): void {
    const playlist = this.playlists.get(playlistName);
    if (!playlist) {
      throw new Error(`Playlist "${playlistName}" not found.`);
    }
    playlist.addSongToPlaylist(song);
  }

  getPlaylist(name: string): Playlist {
    const playlist = this.playlists.get(name);
    if (!playlist) {
      throw new Error(`Playlist "${name}" not found.`);
    }
    return playlist;
  }
}
