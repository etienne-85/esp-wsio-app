import { Gpio, GpioFactory, GpioPWM, PIN_TYPE } from "./Gpio";

export interface MotorStub {
    pin1: Number,
    chan1: Number,
    pin2: Number,
    chan2: Number,
}

/**
 * Motor driver by driving gpio pins
 */
export class MotorDriver {
    pwmPinL: GpioPWM
    pwmPinR: GpioPWM
    initStub: MotorStub

    constructor(initStub: MotorStub) {
        this.pwmPinL = GpioFactory.instance(initStub.pin1, PIN_TYPE.PWM)
        this.pwmPinR = GpioFactory.instance(initStub.pin2, PIN_TYPE.PWM)
        this.initStub = initStub
        // this.gpios.pwmR = {
        //     pin: pinR,
        //     pwmChan: pwmChanR,
        //     val: 0,
        //     type: PIN_TYPES.PWM
        // }
    }

    init() {
        // init on device
        this.pwmPinL.init(this.initStub.chan1)
        this.pwmPinR.init(this.initStub.chan2)
    }

    forward(dutyCycle) {
        this.pwmPinL.syncValue = dutyCycle;
        this.pwmPinR.syncValue = 0;
    }

    backward(dutyCycle) {
        this.pwmPinL.syncValue = 0
        this.pwmPinR.syncValue = dutyCycle;
    }
}