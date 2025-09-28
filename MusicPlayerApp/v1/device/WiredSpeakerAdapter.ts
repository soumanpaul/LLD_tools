// WiredSpeakerAdapter.ts
import type { Song } from "../models/Song";
import type { IAudioOutputDevice } from "./IAudioOutputDevice";
import { WiredSpeakerAPI } from "../external/WiredSpeakerAPI";

export class WiredSpeakerAdapter implements IAudioOutputDevice {
  private wiredApi: WiredSpeakerAPI;

  constructor(api: WiredSpeakerAPI) {
    this.wiredApi = api;
  }

  playAudio(song: Song): void {
    const payload = `${song.getTitle()} by ${song.getArtist()}`;
    this.wiredApi.playSoundViaCable(payload);
  }
}
