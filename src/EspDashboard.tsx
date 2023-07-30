import React from "react"
import { Flowbite } from "flowbite-react"
// import theme from "./theme";
import { DeviceProvider, ServicesProvider, useDevice } from "./AppStateContext"
import { TopNavBar } from "./components/TopNavBar"
import { EspBenchmark } from "./EspBenchmark"
import { GpioStateWatch } from "./GpioStateWatch"
import { StatusBar } from "./StatusBar"
import { LogsWatch } from "./LogsWatch"
import { FBLayoutTest } from "./components/FBTestSandbox"
import { RovRC } from "./RovRC";

const DEVICE_DEFAULT_IP = "192.168.4.1"

export const EspDashboard = () => {
    const device: any = useDevice();

    return (<>
        {/* <Flowbite theme={{ theme }}> */}
        <Flowbite>
            <DeviceProvider>
                <TopNavBar defaultDeviceIp={DEVICE_DEFAULT_IP} />
                <ServicesProvider>
                    <div className="px-4 pt-6">
                        <RovRC />
                        <LogsWatch />
                    </div>
                    {/* <EspBenchmark /> */}
                    {/* <ServicesStatus> */}
                    {/* <GpioStateWatch /> */}
                    {/* </ServicesStatus> */}
                    {/* <FBLayoutTest /> */}
                    <StatusBar />
                </ServicesProvider>
                {/* <Dashboard /> */}
            </DeviceProvider>
        </Flowbite>
    </>)
}