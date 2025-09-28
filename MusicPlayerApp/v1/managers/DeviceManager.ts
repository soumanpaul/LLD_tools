// DeviceManager.ts
import type { IAudioOutputDevice } from "../device/IAudioOutputDevice";
import { DeviceType } from "../enums/DeviceType";
import { DeviceFactory } from "../factories/DeviceFactory";

export class DeviceManager {
  private static instance: DeviceManager | null = null;

  private currentOutputDevice: IAudioOutputDevice | null = null;

  private constructor() {}

  static getInstance(): DeviceManager {
    if (!DeviceManager.instance) {
      DeviceManager.instance = new DeviceManager();
    }
    return DeviceManager.instance;
  }

  connect(deviceType: DeviceType): void {
    // no need to manually delete in TS, GC takes care of old references
    this.currentOutputDevice = DeviceFactory.createDevice(deviceType);

    switch (deviceType) {
      case DeviceType.BLUETOOTH:
        console.log("Bluetooth device connected");
        break;
      case DeviceType.WIRED:
        console.log("Wired device connected");
        break;
      case DeviceType.HEADPHONES:
        console.log("Headphones connected");
        break;
    }
  }

  getOutputDevice(): IAudioOutputDevice {
    if (!this.currentOutputDevice) {
      throw new Error("No output device is connected.");
    }
    return this.currentOutputDevice;
  }

  hasOutputDevice(): boolean {
    return this.currentOutputDevice !== null;
  }
}
