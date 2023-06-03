import React, { useEffect } from "react";
import { useState } from "react"
import { AppGlobalState } from "./AppGlobalState";
import { GpioInterface } from "./services/GpioInterface";

export const OnDeviceSet = ({ children }) => {
  const [isReadyState, onReadyState] = useState(false)
  console.log(isReadyState)
  return (<>
    <DeviceSetup onReadyState={onReadyState} />
    {isReadyState && children}
  </>)
}

/**
 * Checking GPIO service availability
 * @returns 
 */
export const useGpio = () => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    GpioInterface.connect((state) => setIsConnected(state))
  }, [])
  return isConnected
}

export const DeviceSetup = ({ onReady }) => {
  const [deviceIp, setDeviceIp] = useState("192.168.1.105")

  const onConfirm = () => {
    AppGlobalState.deviceIp = deviceIp
    onReady?.(true)
  }

  return <>
    Device IP: <input value={deviceIp} onChange={(e) => setDeviceIp(e.target.value)} /> <button onClick={onConfirm}>Ok</button>
  </>;
}