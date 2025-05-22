import { ServiceState, WebSocketService } from "./WebSocketLayer";

export interface GpioPinStub {
    id,
    val,
    type,
    default?,
    chan?,
    freq?,
    res?,
    op?
}

/**
 * interface with device
 * performs CRUD operations on GPIOs through websockets messages
 */
export class GpioInterface extends WebSocketService {
    static instance
    static msgId = 0
    static get singleton() {
        GpioInterface.instance = GpioInterface.instance || new GpioInterface('/gpio')
        return GpioInterface.instance
    }
    // static wsLayer = WebSocketLayer.instance('/gpio')

    // TODO check if better returning promise instead
    static connect(eventNotifyCallback) {
        if (GpioInterface.singleton.state === ServiceState.Disconnected)
            GpioInterface.singleton.connect(eventNotifyCallback)
    }

    /**
     * Send multiple pins as a batch
     */
    static sendPinsBatch(pins: [GpioPinStub]) {
        const pinsBatch = {}
        // const cmd = ""
        const msgRefId = this.msgId++
        pins.forEach(pin => pinsBatch[pin.id] = { ...pin })
        GpioInterface.singleton.sendMsg({ msgRefId, pinsBatch })
    }

    static config() {
        const cmd = "config"
        const msgRefId = this.msgId++
        GpioInterface.singleton.sendMsg({ cmd, msgRefId })
    }

    static ping() {
        const cmd = "ping"
        const msgRefId = this.msgId++
        GpioInterface.singleton.sendMsg({ cmd, msgRefId })
    }

}