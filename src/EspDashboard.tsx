import { DarkThemeToggle, Flowbite } from "flowbite-react"
import React from "react"
import { DeviceProvider, GpioProvider, useDevice } from "./AppStateContext"
import { GpioServiceConnect } from "./components/Common"
import { Navbar } from "./components/Navbar"
import { TopNavBar } from "./components/TopNavBar"
import { EspBenchmark } from "./EspBenchmark"
import { GpioStateWatch } from "./GpioStateWatch"
import { RovRemoteControl } from "./RovRemoteControl"
import { Dashboard } from "./Dashboard"

const DEVICE_DEFAULT_IP = "192.168.1.101"

export const EspDashboard = () => {
    const device: any = useDevice();

    return (<>
        <DeviceProvider>
            <Flowbite>
                <TopNavBar defaultDeviceIp={DEVICE_DEFAULT_IP} />
                {/* <Navbar /> */}
                <DarkThemeToggle className="" />
            </Flowbite>
            {/* <Dashboard /> */}
            <GpioProvider>
                <GpioServiceConnect>
                    <RovRemoteControl />
                    <GpioStateWatch />
                    <EspBenchmark />
                </GpioServiceConnect>
            </GpioProvider>
        </DeviceProvider>
    </>)
}