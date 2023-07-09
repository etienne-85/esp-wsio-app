import { AppState } from "../AppState"

export enum ServiceState {
    Connected,
    Disconnected,
    Connecting
}

/**
 * Websocket layer to talk with device
 */
export class WebSocketService {
    static instances: [WebSocketService] // services instance
    ws
    path
    state
    stateCallback
    onMsgCallback

    get status() {
        return this.state
    }

    set status(val) {
        this.state = val
        this.stateCallback?.(val)
    }

    constructor(path) {
        console.log(`[WebSocketService::constructor] path: ${path}`)
        this.path = path
        this.status = ServiceState.Disconnected
        WebSocketService[path] = this
    }

    // static instance(path): WebSocketService {
    //     return WebSocketService[path] || new WebSocketService(path)
    // }

    connect(stateChangeCallback?, onMsgCallback?) {
        console.log("[WebSocketLayer] init")
        this.stateCallback = stateChangeCallback ? stateChangeCallback : (state) => console.log(`ws state change: ${state}`)
        this.onMsgCallback = onMsgCallback ? onMsgCallback : (msg) => console.log(`message received: ${msg.msgId}`)
        const wsAddress = `ws://${AppState.deviceIp}/gpio`
        console.log(`connecting to websocket: ${wsAddress} `)
        this.ws = new WebSocket(wsAddress)
        this.status = ServiceState.Connecting

        this.ws.onopen = (event) => {
            console.log("[WebSocket] Connection opened");
            this.status = ServiceState.Connected
        };

        this.ws.onclose = (event) => {
            console.log("[WebSocket] Connection closed");
            this.status = ServiceState.Disconnected
            // setTimeout(initWebSocket, 2000);
        };

        this.ws.onmessage = this.onMsg;

    }

    onMsg(evt: MessageEvent<any>) {
        console.log(evt.data)
        // this.onMsgCallback(evt.data)
        // WebSocketClientService.msgData = evt.data;
        // WebSocketClientService.msgCount++;
        // console.log(this.msgData);
    }

    /**
     * Send data to websocket server
     */
    sendMsg(data) {
        if (this.state === ServiceState.Connected) {
            const msg = JSON.stringify(data);
            try {
                console.log(data)
                this.ws.send(msg); //send msg to device
            } catch (error) {
                console.log(error); // catch error
            }
        }
    }
}