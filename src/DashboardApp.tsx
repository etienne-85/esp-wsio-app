import React, { useState } from "react"
import { Flowbite } from "flowbite-react"
import { LogsMonitor } from "./components/LogsMon"
import { RemoteService } from "./services/RemoteService"
import { StatusBar } from "./components/StatusBar"
import { AppNavbar } from "./components/Navbar"

const DEVICE_DEFAULT_IP = "192.168.4.1"

export const DashboardApp = () => {
    const [refresh, setRefresh] = useState(false)
    RemoteService.notifyChange = () => setRefresh(current => !current)
    return (<>
        {/* <Flowbite theme={{ theme }}> */}
        <Flowbite>
            <AppNavbar />
            <LogsMonitor />
            <StatusBar />
            {/* <DeviceProvider>
                <TopNavBar defaultDeviceIp={DEVICE_DEFAULT_IP} />
                <ServicesProvider>
                    <div className="px-4 pt-6">
                        <RovRC />
                        <LogsWatch />
                    </div> */}
            {/* <EspBenchmark /> */}
            {/* <ServicesStatus> */}
            {/* <GpioStateWatch /> */}
            {/* </ServicesStatus> */}
            {/* <FBLayoutTest /> */}
            {/* <StatusBar />
                </ServicesProvider> */}
            {/* <Dashboard /> */}
            {/* </DeviceProvider> */}
        </Flowbite>
    </>)
}