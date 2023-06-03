import { AppGlobalState } from "../AppGlobalState"
/**
 * Websocket layer to talk with device
 */
export class WebSocketLayer {
    static instances // services instance
    state = false
    ws

    constructor(path) {
        console.log(`[WebSocketLayer::constructor] path: ${path}`)
        WebSocketLayer[path] = this
    }

    static instance(path) {
        return WebSocketLayer[path] || new WebSocketLayer(path)
    }

    init(onStateChange?) {
        console.log("[WebSocketLayer] init")
        const connectionString = `ws://${AppGlobalState.deviceIp}/gpio`
        console.log(`connecting to websocket: ${connectionString} `)
        this.ws = new WebSocket(connectionString)

        this.ws.onopen = (event) => {
            console.log("[WebSocket] Connection opened");
            this.state = true
            onStateChange?.(true)
        };

        this.ws.onclose = (event) => {
            console.log("[WebSocket] Connection closed");
            this.state = false
            onStateChange?.(false)
            // setTimeout(initWebSocket, 2000);
        };

        this.ws.onmessage = this.onMsg;

    }

    onMsg(evt: MessageEvent<any>) {
        console.log(evt.data)
        // WebSocketClientService.msgData = evt.data;
        // WebSocketClientService.msgCount++;
        // console.log(this.msgData);
    }

    /**
     * Send data to websocket server
     */
    sendMsg(data) {
        if (this.state) {
            const msg = JSON.stringify(data);
            try {
                // this.ws.send(msg); //send msg to the server
                console.log(data)
            } catch (error) {
                console.log(error); // catch error
            }
        }
    }
}