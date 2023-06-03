import { WebSocketLayer } from "./WebSocketLayer";

export interface GpioValueStub {
    pin,
    val
}

export interface GpioStateStub extends GpioValueStub {
    type,
    pwmChan?,
}

/**
 * interface with device
 * performs CRUD operations on GPIOs through websockets messages
 */
export class GpioInterface {
    static wsLayer = WebSocketLayer.instance('/gpio')

    static connect(callback){
        GpioInterface.wsLayer.init(callback)
    }

    /**
     * Init pin
     */
    static initPinState(pinState: GpioStateStub) {
        GpioInterface.wsLayer.sendMsg({ pins: [pinState], action: "init" })
    }

    /**
     * Read pin value
     * @param pin 
     */
    static readPinValue(pin: Number): GpioValueStub {
        const pinData: GpioValueStub = GpioInterface.wsLayer.sendMsg({ pins: [{ pin }], action: "read" })
        return pinData
    }

    /**
     * Write pin value
     * @param pinData 
     */
    static writePinValue(pin, val) {
        const pinData: GpioValueStub = {pin, val}
        GpioInterface.wsLayer.sendMsg({ pins: [pinData], action: "write" })
    }

    /**
     * Delete pin value
     * @param pinData 
     */
    static deletePin(pin) {
        GpioInterface.wsLayer.sendMsg({ pins: [{ pin }], action: "delete" })
    }

    /**
     * Read pin state
     */
    static dumpPinState(pin) {
        const pinState: GpioStateStub = GpioInterface.wsLayer.sendMsg({ pins: [{ pin }], action: "dump" })
    }

    /**
     * Write multiple pins at once
     */
    static writeBatchValues(pinsArr: [GpioValueStub] ) {
        GpioInterface.wsLayer.sendMsg({ pins: pinsArr, action: "batchWrite" })
    }
}