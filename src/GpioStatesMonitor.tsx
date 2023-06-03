import { useState } from "react"
import { useGpio } from "./Common"
import { Gpio, GpioFactory } from "./model/Gpio"

/**
 * GPIO states control and monitor UI
 */

const GpioState = ({ gpio }: { gpio: Gpio }) => {
    return (<>
        <p>{gpio.pin}</p>
    </>)
}

const GpioRow = ({ gpio }: { gpio: Gpio }) => {
    const [editMode, toggleEdit] = useState(false)
    const [pinValue, setPinValue] = useState(0)

    const writePin = () => {
        gpio.write(pinValue)
        toggleEdit(false)
    }
    return (<>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {gpio.pin}
            </th>
            <td class="px-6 py-4">
                {gpio.state.pwmChan}
            </td>
            <td class="px-6 py-4">
                {editMode ? <input value={pinValue} onChange={(e) => setPinValue(e.target.value)} /> : pinValue}
            </td>
            <td class="px-6 py-4">
                {gpio.state ? "active" : "inactive"}
            </td>
            <td class="px-6 py-4 text-right">
                {!editMode ?
                    <button onClick={() => toggleEdit(true)}>Edit</button> :
                    <button onClick={writePin}>Write</button>}
            </td>
        </tr>
    </>)
}

export const PinLayout = () => {
    return (<>
        {/* {Object.values(GpioFactory.instances).map(gpio => <GpioState gpio={gpio} />)} */}

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Pin #
                        </th>
                        <th scope="col" class="px-6 py-3">
                            PWM Channel
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Value
                        </th>
                        <th scope="col" class="px-6 py-3">
                            State
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(GpioFactory.instances)
                        .filter((gpio: Gpio) => gpio.active)
                        .map((gpio: Gpio) => <GpioRow gpio={gpio} />)}
                </tbody>
            </table>
        </div>

    </>)
}

export const GpioStatesMonitor = () => {
    const isGpioAvailable =  useGpio();
    return (<>
        <h2> GPIO states </h2>
        status: {isGpioAvailable ? "connected" : "disconnected"}
        {isGpioAvailable && <>
            <button onClick={null}>Sync</button>
            <PinLayout />
        </>}
    </>)
}