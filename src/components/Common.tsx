import React, { useEffect } from "react";
import { useDevice, useGpio, useGpioDispatch } from "../AppStateContext";
import { GpioInterface } from "../services/GpioInterface";
import { ServiceState } from "../services/WebSocketLayer";

export const GpioServiceConnect = ({ children }) => {
    const device: any = useDevice(); 
    const dispatchGpio: any = useGpioDispatch();

    const onServiceStateChange = (state) => {
        console.log(`GPIO service state:${state ? 'available' : 'unavailable'}`)
        // forward service state to react context
        dispatchGpio(
            {
                type: 'status',
                status: state,
            })
    }

    const onMessage = (msgId) => {
        console.log(`[GpioService::onMessage] `)
        // forward service state to react context
        dispatchGpio(
            {
                type: 'msg',
                msgId 
            })
    }

    useEffect(() => {
        if (device.ready) {
            console.log("[GpioServiceConnect] connecting")
            GpioInterface.connect(onServiceStateChange, onMessage)
        }
    }, [device])

    return (device?.ready ? children : "Waiting for device setup")
}

const customizeStyle = (status, style) => {
    let text, color

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
    style.main += `bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`
    style.secondary += `bg-${color}-500`
    style.text = text
}

export const GpioStatusIndicator = () => {
    const gpio = useGpio();

    const style = {
        main: "inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ",
        secondary: "w-2 h-2 mr-1 rounded-full ",
        text: ""
    }

    // useEffect(()=>{

    // }, [gpio])
    customizeStyle(gpio.status, style)
    console.log(style.text)

    return (<>
        <span className={style.main}>
            <span className={style.secondary}></span>
            {style.text}
        </span></>)
}