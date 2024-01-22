import React, { useEffect, useState, useMemo } from "react"
import { GpioInterface } from "./services/GpioInterface";
import { ServiceState } from "./services/WebSocketLayer";
import { Button } from "flowbite-react";
import { useServices } from "./AppStateContext";

export const EspBenchmark = () => {
    const [refresh, setRefresh] = useState(false)
    const [pingDelay, setPingDelay] = useState(1)   // in seconds

    const timer: Date = useMemo(() => new Date(), []);
    const services: any = useServices();
    const { gpio: gpioService } = services

    const ping = () => {
        if (gpioService.status === ServiceState.Connected) {
            GpioInterface.ping()
        }
        // GpioInterface.dumpState()
        setRefresh(current => !current)
    }

    useEffect(() => {
        // console.log(gpioService)
    }, [services])
    // console.log(`[GpioStateWatch] ${gpioService.status}`)
    return (<>
        <Button onClick={ping} size="xs">
            Ping
        </Button>
    </>)
}