import { AppState } from "../AppState"

const DEFAULT_MIN_TIMEOUT = 250 // ms
const SERVICE_DEFAULT_ROUTE = "/ws"
const PING_RATE = 1000  // ms

export enum ConnectionState {
    Connected = "connected",
    Disconnected = "disconnected",
    Connecting = "connecting"
}

export class RemoteService {
    static registeredServices = {}
    // static deviceIp
    static webSocket
    static connectionState
    static retryCounter = 0
    static timeout = DEFAULT_MIN_TIMEOUT
    static deviceIp
    static notifyChange
    static stats = {
        packets: {
            sent: 0,
            received: 0,
            lastSentTime: 0,
            lastReceivedTime: 1,
        },
        ping: {
            latest: 0,
            avg: 0,
            min: 0,
            max: 0
        }
    }
    serviceId

    constructor(serviceId) {
        this.serviceId = serviceId
        RemoteService.registeredServices[serviceId] = this
    }

    /**
     * once started will manage autoreconnect
     * @param deviceIp 
     * @param timeout 
     */
    // static connect(notifyEvent?) {
    static autoconnect() {
        const { deviceIp } = RemoteService
        if (deviceIp && !RemoteService.webSocket) {
            // const deviceIp = { AppState }
            // this.eventnotifyUpdate = notifyEvent ? notifyEvent : (event, state) => console.log(`event: ${event} state: ${state}`)
            const wsAddress = `wss://${deviceIp}${SERVICE_DEFAULT_ROUTE}`
            console.log(`[RemoteService::connect] Connecting to websocket: ${wsAddress} (retry #${RemoteService.retryCounter})`)
            const webSocket = new WebSocket(wsAddress)
            RemoteService.connectionState = ConnectionState.Connecting
            RemoteService.retryCounter++;
            webSocket.onopen = RemoteService.onWsOpen;
            webSocket.onclose = RemoteService.onWsClose;
            webSocket.onerror = RemoteService.onWsError;
            webSocket.onmessage = RemoteService.onWsMessage;
            RemoteService.webSocket = webSocket
        }
    }

    /**
     * pinging server regularly to
     * - check connection state
     * - get latency
     */
    static autoPing = () => {

    }

    /**
     * called on server reply to ping event
     */
    static pong = () => {

    }

    static onWsOpen = (e) => {
        console.log("[RemoteService::connect] Web socket connection success");
        RemoteService.connectionState = ConnectionState.Connected
        RemoteService.retryCounter = 0;
        RemoteService.timeout = 0;
        RemoteService.notifyChange?.()
    }

    static onWsClose = (e) => {
        const { timeout } = RemoteService
        RemoteService.timeout = Math.min(10000, 2 * timeout)
        console.log(`[RemoteService::onWsClose] Connection lost, reconnection (next attempt in ${timeout} second)`, e.reason);
        RemoteService.connectionState = ConnectionState.Disconnected
        setTimeout(RemoteService.autoconnect, timeout);
        // setTimeout(initWebSocket, 2000);
        RemoteService.webSocket = null
        RemoteService.notifyChange?.()
    }

    static onWsError = (err) => {
        console.error(`[RemoteService::onWsError] connection failed with error: `, err.message, `(${RemoteService.retryCounter} failed attempts)`);
        RemoteService.webSocket.close();
    }

    // routing message to corresponding service
    static onWsMessage = (evt: MessageEvent<any>) => {
        RemoteService.stats.packets.lastReceivedTime = Date.now()
        const { lastReceivedTime, lastSentTime } = RemoteService.stats.packets
        RemoteService.stats.ping.latest = lastReceivedTime - lastSentTime
        RemoteService.stats.packets.received++
        const incomingMsg = evt.data
        const parsedMsg = JSON.parse(incomingMsg)
        const { serviceId, output } = parsedMsg
        const service: RemoteService = RemoteService.registeredServices[serviceId]
        if (service) {
            console.log(`[RemoteService::onWsMessage] message received from ${serviceId} service `, parsedMsg)
            service.onReceivedMessage(output)
        } else {
            console.warn(`[RemoteService::onWsMessage] no matching service ${serviceId} to handle message received: `, incomingMsg)
        }
        // const eventType = ServiceEvent.Message
        // this.eventNotifyCallback?.(eventType, { msg: evt.data })
        // this.onMsgCallback(evt.data)
        // WebSocketClientService.msgData = evt.data;
        // WebSocketClientService.msgCount++;
        // console.log(this.msgData);
        RemoteService.notifyChange?.()
    }

    notifyStateChange() {

    }

    onSuspend() {
        //TO BE IMPLEMENTED IN CHILD CLASS
    }

    onResume() {
        //TO BE IMPLEMENTED IN CHILD CLASS
    }

    onReceivedMessage(incomingMsg) {
        //TO BE IMPLEMENTED IN CHILD CLASS
        console.log(incomingMsg)
    }

    /**
     * Send data to websocket server
     */
    sendMsg(data) {
        if (RemoteService.connectionState === ConnectionState.Connected) {
            const { serviceId } = this
            const payload = {
                serviceId,
                ...data
            }
            const outgoingMsg = JSON.stringify(payload);
            try {
                console.log(`[RemoteService::sendMsg] message sent to ${serviceId} service`, payload)
                if (!RemoteService.stats.packets.lastReceivedTime) {
                    console.warn(`[RemoteService::sendMsg] previous packet was lost`)
                }
                RemoteService.webSocket.send(outgoingMsg); //send msg to device
                RemoteService.stats.packets.lastSentTime = Date.now()
                RemoteService.stats.packets.sent++
                RemoteService.stats.packets.lastReceivedTime = 0
            } catch (error) {
                console.log(error); // catch error
            }
        }
    }
}