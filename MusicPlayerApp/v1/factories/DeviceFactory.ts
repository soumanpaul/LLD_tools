// DeviceFactory.ts
import type { IAudioOutputDevice } from "../device/IAudioOutputDevice";
import { BluetoothSpeakerAdapter } from "../device/BluetoothSpeakerAdapter";
import { WiredSpeakerAdapter } from "../device/WiredSpeakerAdapter";
import { HeadphonesAdapter } from "../device/HeadphonesAdapter";
import { BluetoothSpeakerAPI } from "../external/BluetoothSpeakerAPI";
import { WiredSpeakerAPI } from "../external/WiredSpeakerAPI";
import { HeadphonesAPI } from "../external/HeadphonesAPI";
import { DeviceType } from "../enums/DeviceType";

export class DeviceFactory {
  static createDevice(deviceType: DeviceType): IAudioOutputDevice {
    switch (deviceType) {
      case DeviceType.BLUETOOTH:
        return new BluetoothSpeakerAdapter(new BluetoothSpeakerAPI());
      case DeviceType.WIRED:
        return new WiredSpeakerAdapter(new WiredSpeakerAPI());
      case DeviceType.HEADPHONES:
      default:
        return new HeadphonesAdapter(new HeadphonesAPI());
    }
  }
}
