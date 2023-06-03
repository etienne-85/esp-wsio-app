import { Gpio, GpioFactory, GpioPWM, PIN_TYPE } from "./Gpio";

/**
 * Motor driver by driving gpio pins
 */
export class MotorDriver {
    pwmPinL: GpioPWM
    pwmPinR: GpioPWM

    constructor(pinL, pwmChanL, pinR, pwmChanR) {
        this.pwmPinL = GpioFactory.instance(pinL, PIN_TYPE.PWM)
        this.pwmPinR = GpioFactory.instance(pinR, PIN_TYPE.PWM)

        // init on device
        this.pwmPinL.init(pwmChanL)
        this.pwmPinR.init(pwmChanR)

        // this.gpios.pwmR = {
        //     pin: pinR,
        //     pwmChan: pwmChanR,
        //     val: 0,
        //     type: PIN_TYPES.PWM
        // }
    }

    forward(dutyCycle) {
        this.pwmPinL.syncValue = 0
        this.pwmPinR.syncValue = dutyCycle;
    }

    backward(dutyCycle) {
        this.pwmPinL.syncValue = dutyCycle;
        this.pwmPinR.syncValue = 0;
    }
}