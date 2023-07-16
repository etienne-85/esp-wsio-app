import { DarkThemeToggle, Flowbite } from "flowbite-react"
import React from "react"
import { DeviceProvider, ServicesProvider, useDevice } from "./AppStateContext"
import { Navbar } from "./components/Navbar"
import { TopNavBar } from "./components/TopNavBar"
import { EspBenchmark } from "./EspBenchmark"
import { GpioStateWatch } from "./GpioStateWatch"
import { RovRemoteControl } from "./RovRemoteControl"
import { StatusBar } from "./StatusBar"
import { LogsMonitor } from "./LogsMonitor"

const DEVICE_DEFAULT_IP = "192.168.4.1"

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
            <ServicesProvider>
                {/* <ServicesStatus> */}
                <RovRemoteControl />
                <GpioStateWatch />
                <EspBenchmark />
                <LogsMonitor />
                {/* </ServicesStatus> */}
                <StatusBar />
            </ServicesProvider>
        </DeviceProvider>
    </>)
}