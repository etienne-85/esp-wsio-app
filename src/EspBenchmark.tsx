import React from "react"
import { useEffect, useState, useMemo } from "react"
import { useGpio } from "./AppStateContext";
import { GpioInterface } from "./services/GpioInterface";
import { ServiceState } from "./services/WebSocketLayer";
import { Button } from "flowbite-react";

export const EspBenchmark = () => {
    const [refresh, setRefresh] = useState(false)
    const [pingDelay, setPingDelay] = useState(1)   // in seconds

    const timer: Date = useMemo(() => new Date(), []);
    const gpio: any = useGpio();

    const ping = () => {
        if (gpio.status === ServiceState.Connected) {
            GpioInterface.ping()
        }
        // GpioInterface.dumpState()
        setRefresh(current => !current)
    }

    useEffect(() => {
        console.log(gpio)
    }, [gpio])
    console.log(`[GpioStateWatch] ${gpio.status}`)
    return (<>
        <Button onClick={ping} size="xs">
            Ping
        </Button>
    </>)
}