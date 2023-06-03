// import { RemoteGpio } from "./RemoteGpio";

import React, { useState } from "react";
import { DeviceSetup } from "./Common";
import { GpioStatesMonitor } from "./GpioStatesMonitor";
import { RovRemoteControl } from "./RovRemoteControl";

export function App() {
  const [isReady, setReady] = useState(false)

  return <>
    <h1>ESP32 Web Interface</h1>
    <DeviceSetup onReady={setReady} />
    {isReady && <>
      <RovRemoteControl />
      <GpioStatesMonitor />
    </>}
  </>;
}