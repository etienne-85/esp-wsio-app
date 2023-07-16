import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react"
import { useServices } from "./AppStateContext";
import { LogService } from "./services/LogService";

export const LogsMonitor = () => {
    const [refresh, setRefresh] = useState(false)
    const services: any = useServices();

    useEffect(() => {
        console.log(services.logs)
    }, [services])

    const dumpLogs = () => {
        console.log("dump logs")
        LogService.dumpLogs()
        setRefresh(current => !current)
    }

    const logService = services.logs
    console.log(`[LogsMonitor] ${logService.status}`)

    return (<>
        <Button onClick={dumpLogs} size="xs">
            Dump Logs
        </Button>
    </>)
}