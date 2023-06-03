import { useEffect, useMemo } from "react"
import { useGpio } from "./Common";
import { MotorDriver } from "./model/Motor"

export const RovRemoteControl = () => {
    const isGpioAvailable = useGpio();

    // const motorL = useMemo(() => new MotorDriver(12, 2, 14, 3), [])
    // const motorR = useMemo(() => new MotorDriver(16, 0, 17, 1), [])

    console.log(`isGpioAvailable: ${isGpioAvailable}`)

    // const motorMower = useMemo(()=> new MotorDriver(32, 4, 33, 5))
    return (<><h2>ROV Remote Control</h2></>)
}