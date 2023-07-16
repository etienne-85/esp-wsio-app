import { ServiceState, WebSocketService } from "./WebSocketLayer";

/**
 * interface with device
 * performs CRUD operations on GPIOs through websockets messages
 */
export class LogService extends WebSocketService {
    static instance
    static msgId = 0
    static get singleton() {
        LogService.instance = LogService.instance || new LogService('/logs')
        return LogService.instance
    }
    // static wsLayer = WebSocketLayer.instance('/gpio')

    // TODO check if better returning promise instead
    static connect(eventNotifyCallback) {
        if (LogService.singleton.state === ServiceState.Disconnected)
            LogService.singleton.connect(eventNotifyCallback)
    }

    static dumpLogs() {
        const cmd = "dump"
        // const msgRefId = this.msgId++
        LogService.singleton.sendMsg({ cmd })
    }
}