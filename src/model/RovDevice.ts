import { MotorDriver, MotorStub } from "./Motor"

export class RovDevice {
    static instance
    motorR: MotorDriver
    motorL: MotorDriver
    isDeviceInit = false

    constructor() {
        console.log("[RovDevice] Create singleton ")
        RovDevice.instance = this
    }

    static get singleton(): RovDevice {
        return RovDevice.instance || new RovDevice()
    }

    // offline init
    init(m1: MotorStub, m2: MotorStub) {
        console.log("[ROV] Offline init  ")
        this.motorR = new MotorDriver(m1)
        this.motorL = new MotorDriver(m2)
    }

    // init on device
    deviceInit() {
        console.log("[ROV] Device init  ")
        this.motorR.init()
        this.motorL.init()
        this.isDeviceInit = true
    }

    move(speed) {
        const dutyCycle = Math.abs(speed)
        if (speed >= 0) {
            this.motorL.backward(dutyCycle)
            this.motorR.forward(dutyCycle)
        } else {
            this.motorL.forward(dutyCycle)
            this.motorR.backward(dutyCycle)
        }
    }

    turn(speed) {
        const dutyCycle = Math.abs(speed)
        if (speed >= 0) {
            this.motorL.forward(dutyCycle)
            this.motorR.forward(dutyCycle)
        } else {
            this.motorL.backward(dutyCycle)
            this.motorR.backward(dutyCycle)
        }
    }
}