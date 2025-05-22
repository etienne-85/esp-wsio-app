import React, { useEffect } from "react";
import { useDevice, useServicesDispatch, useServices } from "./AppStateContext";
import { SubTitle } from "./components/Common";
import { FsService } from "./services/FsService";
import { GpioInterface } from "./services/GpioInterface";
import { LogService } from "./services/LogService";
import { ServiceEvent, ServiceState } from "./services/WebSocketLayer";

export const ServicesStatus = () => {
    const device: any = useDevice();
    const servicesDispatch: any = useServicesDispatch();

    // forward service event states to context
    const onServiceEvent = (service, event, data) => {
        console.log(`Service \"${service}\", event ${event}`)
        const serviceState = {
            service,
            event,
            data
        }
        switch (event) {
            case ServiceEvent.ServiceState:
                const { status } = data
                console.log(`${status === ServiceState.Connected ? 'available' : 'unavailable'}`)
                break;
            case ServiceEvent.Message:
                const { msg } = data
                console.log(msg)
                break;
        }
        // forward service state to react context
        servicesDispatch(serviceState)
    }

    useEffect(() => {
        if (device.ready) {
            console.log("[GpioServiceConnect] connecting")
            GpioInterface.connect((evt, data) => onServiceEvent('gpio', evt, data))
            LogService.connect((evt, data) => onServiceEvent('logs', evt, data))
            // FsService.connect((evt, data) => onServiceEvent('fs', evt, data))
        }
    }, [device])

    // return (device?.ready ? children : "Waiting for device setup")
    return (<>
        <SubTitle>Status</SubTitle>
        {/* <GpioStatusIndicator /> */}
    </>)
}

const getCustomStyle = (status) => {

    let main = "inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ",
        secondary = "w-2 h-2 mr-1 rounded-full ",
        text = "",
        color

    switch (status) {
        case ServiceState.Connected:
            text = "Connected"
            color = "green"
            break
        case ServiceState.Connecting:
            text = "Connecting"
            color = "orange"
            break
        case ServiceState.Disconnected:
            text = "Disconnected"
            color = "red"
            break
    }

    main += `bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`
    secondary += `bg-${color}-500`
    return ({ main, secondary, text })
}

export const StatusIndicators = () => {
    const services = useServices();
    const { gpio: gpioService, logs: logService, fs: fsService } = services;
    const gpioStyle = getCustomStyle(gpioService.status)
    const logStyle = getCustomStyle(logService.status)
    const fsStyle = getCustomStyle(fsService.status)

    return (<>
        <span className={gpioStyle.main}>
            <span className={gpioStyle.secondary}></span>
            GPIO
        </span>
        <span className={logStyle.main}>
            <span className={logStyle.secondary}></span>
            LOGS
        </span>
        <span className={fsStyle.main}>
            <span className={fsStyle.secondary}></span>
            FS
        </span>
    </>)
}

export const StatusBar = () => {
    return (<>
        <ServicesStatus />
        <StatusIndicators />
    </>)
}