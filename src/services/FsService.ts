import { ServiceState, WebSocketService } from "./WebSocketLayer";

/**
 * Interface with FS service API
 */
export class FsService extends WebSocketService {
    static instance
    static msgId = 0
    static get singleton() {
        FsService.instance = FsService.instance || new FsService('/fs')
        return FsService.instance
    }
    // static wsLayer = WebSocketLayer.instance('/gpio')

    // TODO check if better returning promise instead
    static connect(eventNotifyCallback) {
        if (FsService.singleton.state === ServiceState.Disconnected)
            FsService.singleton.connect(eventNotifyCallback)
    }

    static readFile() {
        const cmd = "read"
        // const msgRefId = this.msgId++
        FsService.singleton.sendMsg("testfile")
    }
}