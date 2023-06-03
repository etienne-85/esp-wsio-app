import { ESP32_PINOUT } from "../pinout_config"
import { GpioInterface, GpioStateStub } from "../services/GpioInterface"

enum PIN_MODE {
    NONE, // 0b00
    RO, // 0b01
    WO, // 0b10
    RW, // 0b11
}

enum PIN_FEATURES {
    ADC, I2C
}

// enum PIN_TYPE {
//     TX, RX
// }

export enum PIN_TYPE {
    PWM
}

// GPIO class
export class Gpio {
    pin
    state: GpioStateStub    // reflect pin state on device

    constructor(pin) {
        // console.log(`[Gpio::constructor] PIN #${pin} `)
        this.pin = pin
    }

    init() {
        // get current state from device 
        this.state = GpioInterface.dumpPinState()
        // if inactive init on device
        if (!this.state) {
            this.state = {
                pin: this.pin,
                type: undefined,
                val: 0
            }
            GpioInterface.initPinState(this.state)
        } else {
            console.warn(`${this.pin} already active. To reinit, disable first`)
        }
    }

    // ref to local value
    get value() {
        return this.state.val
    }

    set value(val) {
        this.state.val = val
    }

    // synced with device
    get syncValue() {
        this.value = GpioInterface.readPinValue(this.pin)
        return this.value
    }

    set syncValue(val) {
        this.value = val
        GpioInterface.writePinValue(this.pin, val)
    }
}

export class GpioPWM extends Gpio {
    // overload init
    init(pwmChan) {
        // get current state from device 
        this.state = GpioInterface.dumpPinState(this.pin)
        // if inactive init on device
        if (!this.state) {
            this.state = {
                pin: this.pin,
                type: PIN_TYPE.PWM,
                val: 0,
                pwmChan: pwmChan
            }
            GpioInterface.initPinState(this.state)
        } else {
            console.warn(`${this.pin} already active. To reinit, disable first`)
        }
    }
}

// Read only => disable write method
class GpioRO extends Gpio {
    write(): void {
        console.warn(`[GPIO#${this.pin}::write] forbidden action => READ-ONLY pin`)
    }
}

// Write only => disable read method
class GpioWO extends Gpio {
    read() {
        console.warn(`[GPIO#${this.pin}::read] forbidden action => WRITE-ONLY pin`)
    }
}

// Disabled pin => disable read & write methods
class GpioDisabled extends Gpio {
    read() {
        console.warn(`[GPIO#${this.pin}::read] forbidden action => DISABLED pin`)
    }
    write() {
        console.warn(`[GPIO#${this.pin}::write] forbidden action => DISABLED pin`)
    }
}

export class GpioFactory {
    static instances = {}
    static pinout = ESP32_PINOUT

    static instanciate(pin, pinType: PIN_TYPE) {
        const staticConf = GpioFactory.pinout[pin]
        switch (pinType) {
            case PIN_TYPE.PWM:
                if (staticConf.mode === PIN_MODE.RW) {
                    GpioFactory.instances[pin] = new GpioPWM(pin)
                } else {
                    console.warn(`PWM not allowed on pin ${pin}`)
                }
                break;
            default:
                GpioFactory.instances[pin] = new Gpio(pin)

        }
        return GpioFactory.instances[pin]
    }

    static instance(pin, pinType) {
        return GpioFactory.instances[pin] || GpioFactory.instanciate(pin, pinType)
    }

    /**
     * Init pins from board pinout
     * @param pinout 
     */
    // static fromPinout(pinout = ESP32_PINOUT) {
    //     GpioFactory.pinout = pinout
    //     const pins = Object.keys(pinout)
    //     pins.forEach(pin => GpioFactory.instance(pin))
    //     console.log(GpioFactory.instances)
    // }

    static fromDeviceState() {

    }

    static batchWrite() {

    }

}
