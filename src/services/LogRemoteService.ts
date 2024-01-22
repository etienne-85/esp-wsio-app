import { RemoteService } from "./RemoteService";

const DEFAULT_POLLING_RATE = 5000

enum LogType {
    LogArchive = "logArchive",
    LogBuffer = "logBuffer"
}

export class LogRemoteService extends RemoteService {
    static instance: LogRemoteService
    static get singleton() {
        LogRemoteService.instance = LogRemoteService.instance || new LogRemoteService("logs")
        return LogRemoteService.instance
    }
    logsPolling = []
    lastPolling
    pollingIntervalId

    // OVERRIDE 
    onReceivedMessage(receivedData) {
        receivedData.timestamp = Date.now()
        this.lastPolling = receivedData
        this.logsPolling.push(receivedData)
        // console.log(`[LogRemoteService::onReceivedMessage] timestamp ${this.lastPolling.timestamp} logs: `, this.lastPolling.logs)
    }

    startPolling(pollingRate = DEFAULT_POLLING_RATE) {
        this.pollingIntervalId = setInterval(this.requestLogs, pollingRate)
    }

    stopPolling() {
        clearInterval(this.pollingIntervalId)
    }

    requestLogs = () => {
        const cmd = LogType.LogBuffer
        const data = {
            cmd
        }
        this.sendMsg(data)
    }
}