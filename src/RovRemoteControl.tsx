import { useEffect, useState, useMemo, useRef } from "react"
import { MotorDriver, MotorStub } from "./model/Motor"
import { RovDevice } from "./model/RovDevice";
import { ServiceState } from "./services/WebSocketLayer";
import { Button } from "flowbite-react";
import { useServices } from "./AppStateContext";

const MOTOR_L: MotorStub = { pin1: 26, chan1: 0, pin2: 25, chan2: 1 }
const MOTOR_R: MotorStub = { pin1: 32, chan1: 2, pin2: 33, chan2: 3 }

const SpeedPresets = {
    Slow: 88,
    Medium: 128,
    Fast: 160
}

export const RovRemoteControl = () => {
    const [speed, setSpeed] = useState(SpeedPresets.Slow)
    const services = useServices();
    const {gpio: gpioService} = services;
    console.log(`isGpioAvailable: ${gpioService.status}`)

    useEffect(() => {
        if (gpioService.status === ServiceState.Connected && !RovDevice.singleton.isDeviceInit) {
            RovDevice.singleton.deviceInit()
        }
    }, [services])

    useEffect(() => {
        RovDevice.singleton.init(MOTOR_L, MOTOR_R)
    }, [])


    // const motorMower = useMemo(()=> new MotorDriver(32, 4, 33, 5))
    return (<>
        <h2>ROV Remote Control</h2>
        <div className="grid grid-cols-5 gap-4 w-1/3">
            <div></div>
            <Button className="w-24" onClick={() => RovDevice.singleton.move(speed)}>
                Forward
            </Button>
            <div></div>
            <div></div>
            <Button className="w-24" onClick={() => setSpeed(SpeedPresets.Slow)}>
                Slow
            </Button>
            <Button className="w-24" onClick={() => RovDevice.singleton.turn(-speed)}>
                Left
            </Button>
            <Button className="w-24" onClick={() => RovDevice.singleton.move(0)}>
                Stop
            </Button>
            <Button className="w-24" onClick={() => RovDevice.singleton.turn(speed)}>
                Right
            </Button>
            <div></div>
            <Button className="w-24" onClick={() => setSpeed(SpeedPresets.Medium)}>
                Medium
            </Button>
            <div></div>
            <Button className="w-24" onClick={() => RovDevice.singleton.move(-speed)}>
                Backward
            </Button>
            <div></div>
            <div></div>
            <Button className="w-24" onClick={() => setSpeed(SpeedPresets.Fast)}>
                Fast
            </Button>
        </div>
        {/* <div className="columns-3">
            <div>COL1</div>
            <div>
                <Button onClick={() => RovDevice.singleton.move(70)} size="xs">
                    Forward
                </Button>
                <div className="flex items-center">
                    <Button onClick={() => RovDevice.singleton.turn(-100)} size="xs">
                        Left
                    </Button>
                    <Button onClick={() => RovDevice.singleton.move(0)} size="xs">
                        Stop
                    </Button>
                    <Button onClick={() => RovDevice.singleton.turn(100)} size="xs">
                        Right
                    </Button>
                </div>
                <Button onClick={() => RovDevice.singleton.move(-70)} size="xs">
                    Backward
                </Button>
            </div>
            <div>COL2</div>
        </div> */}
    </>)
}