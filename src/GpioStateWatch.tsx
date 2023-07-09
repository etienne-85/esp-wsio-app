import { Button } from "flowbite-react"
import React from "react"
import { useEffect, useState } from "react"
import { useDevice, useGpio } from "./AppStateContext"
import { GpioStatusIndicator } from "./components/Common"
import { Gpio, GpioFactory, PIN_TYPE } from "./model/Gpio"
import { GpioInterface } from "./services/GpioInterface"
import { ServiceState } from "./services/WebSocketLayer"

import { Badge } from 'flowbite-react';

/**
 * GPIO states control and monitor UI
 */

const GpioStateControl = ({ gpio }: { gpio: Gpio }) => {
    const [pinValue, setPinValue] = useState(gpio.value)

    const writePin = (val) => {
        console.log()
        gpio.write(val)
    }

    // useEffect(()=>{

    // }, [pinValue])

    return (<>
        {/* <p>{pinValue}</p> */}
        <div className="flex">
            <input className="w-24" value={pinValue} onChange={(e) => setPinValue(e.target.value)} />
            <Button onClick={writePin} size="xs">
                Set
            </Button>
        </div>
        {/* {editMode ? <input value={pinValue} onChange={(e) => setPinValue(e.target.value)} /> : pinValue}
        {!editMode ?
            <Button onClick={() => toggleEdit(true)} size="xs">
                Edit
            </Button> :
            <Button onClick={writePin} size="xs">
                Write
            </Button>} */}
    </>)
}

const GpioRow = ({ gpio }: { gpio: Gpio }) => {
    const [editMode, toggleEdit] = useState(false)
    const [pinValue, setPinValue] = useState(0)


    return (<>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Badge className="w-16" color={gpio.state.type === PIN_TYPE.PWM ? "green" : "gray"} >
                    #{gpio.pin}
                </Badge>
            </th>
            <td className="px-2 py-4">
                <Badge className="w-16" color={gpio.state.type === PIN_TYPE.PWM ? "yellow" : "gray"} >
                    {gpio.state.type === PIN_TYPE.PWM ? "PWM" : "REGULAR"}
                </Badge>
            </td>
            <td className="px-6 py-4">
                <GpioStateControl gpio={gpio} />
            </td>
            <td className="px-6 py-4">
                {!isNaN(gpio.state.chan) ? `channel: ${gpio.state.chan}` : ""}
            </td>
        </tr>
    </>)
}

export const PinLayout = () => {
    console.log(GpioFactory.instances)
    return (<>
        {/* {Object.values(GpioFactory.instances).map(gpio => <GpioState gpio={gpio} />)} */}

        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Pin #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Value
                        </th>
                        <th scope="col" className="px-6 py-3">
                            State
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(GpioFactory.instances)
                        .filter((gpio: Gpio) => gpio.state)
                        .map((gpio: Gpio) => <GpioRow gpio={gpio} />)}
                </tbody>
            </table>
        </div>

    </>)
}

export const GpioStateWatch = () => {
    const [refresh, setRefresh] = useState(false)
    const gpio: any = useGpio();

    const dumpState = () => {
        // GpioInterface.dumpState()
        setRefresh(current => !current)
    }

    useEffect(() => {
        console.log(gpio)
    }, [gpio])
    console.log(`[GpioStateWatch] ${gpio.status}`)
    return (<>
        <GpioStatusIndicator />
        <Button onClick={dumpState} size="xs">
            Dump State
        </Button>
        {gpio.status === ServiceState.Connected ? <PinLayout /> : "Waiting for GPIO access to be available"}

    </>)
}