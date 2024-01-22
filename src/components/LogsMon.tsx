// import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useRef } from "react";
import { LogRemoteService } from "../services/LogRemoteService";
import { ConnectionState, RemoteService } from "../services/RemoteService";

const DEFAULT_POLLING_RATE = 5000

export const LogsMonitor = () => {
    const status = RemoteService.connectionState

    const pollingRateRef = useRef(DEFAULT_POLLING_RATE)
    const pollingIntervalIdRef = useRef()
    const lastPollingRef = useRef()
    const pollingBufferRef = useRef([])

    const onPollingResume = () => {
        console.log(`[LogsMonitor::onResume]`)
        const { current: pollingRate } = pollingRateRef
        if (!pollingIntervalIdRef.current) {
            pollingIntervalIdRef.current = setInterval(LogRemoteService.singleton.requestLogs, pollingRate)
            console.log(`[LogsMonitor::onPollingResume] start/resume polling with ID ${pollingIntervalIdRef.current}`)
        } else {
            console.log(`[LogsMonitor::onPollingResume] polling ${pollingIntervalIdRef.current} already pending`)
        }
    }

    const onPollingSuspend = () => {
        const { current: pollingIntervalId } = pollingIntervalIdRef
        if (pollingIntervalId) {
            console.log(`[LogsMonitor::onPollingSuspend] suspend current polling`)
            clearInterval(pollingIntervalId)
            pollingIntervalIdRef.current = null
        } else {
            console.log(`[LogsMonitor::onPollingSuspend] no pending polling`)
        }
    }
    useEffect(() => {
        switch (status) {
            case ConnectionState.Connected:
                onPollingResume()
                break
            case ConnectionState.Connecting:
            case ConnectionState.Disconnected:
                onPollingSuspend()
                break
        }
    }, [status])
    const { lastPolling } = LogRemoteService.singleton
    if (lastPolling?.timestamp !== lastPollingRef.current?.timestamp) {
        // console.log(`[LogsMonitor] new logs detected received at ${lastPolling.timestamp}`)
        lastPollingRef.current = lastPolling
        pollingBufferRef.current.push(lastPolling.logs)
    }
    const logsBuffer = pollingBufferRef.current.flat()
    return (<>
        {/* <LogsConsole logs={logsBuffer} /> */}
            <LogsDisplay logs={logsBuffer} />
    </>)
}

const LogsDisplay = ({ logs }) => {
    return (<div
        style={{
            fontSize: "small",
            fontFamily: "monospace",
            height: "80vh",
            width: "50%",
            margin: "20px",
            overflowY: "scroll",
            backgroundColor: "#1e1e1e",
            color: "wheat",
            paddingLeft: "5px"
        }}>
        {logs.map(log => <div>{log}</div>)}
    </div>)
}

const LogsConsole = ({ logs }) => {
    const logsFormatted = logs.length ? logs.reduce((acc, log) => acc + '\n' + log) : ""

    const clearConsole = () => {
        console.log("[LogsConsole::clearConsole]")
    }

    const watchLogs = () => {
        console.log("[LogsConsole::watchLogs]")
    }

    const dumpArchive = () => {
        console.log("[LogsConsole::dumpArchive]")
    }

    return (<>
        <form>
            <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <Textarea
                    id="logsConsole"
                    placeholder="Press watch to start monitoring..."
                    required
                    value={logsFormatted}
                    rows={10}
                    // class="w-full"
                    style={{ fontSize: 'small', fontFamily: 'monospace' }}
                />
                {/* <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label for="comment" class="sr-only">Write your message</label>
                    <textarea id="comment" rows="8" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write your message" required></textarea>
                </div> */}
                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <div class="flex pl-0 space-x-1 sm:pl-2">
                        <Button onClick={watchLogs} size="xs">
                            Watch
                        </Button>
                        <Button onClick={dumpArchive} size="xs">
                            Dump
                        </Button>
                    </div>
                    <div class="flex pl-0 space-x-1 sm:pl-2">
                        <Button onClick={clearConsole} size="xs">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                            Clear
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    </>)
}