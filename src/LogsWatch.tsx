import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react"
import { useServices } from "./AppStateContext";
import { Panel, SubTitle } from "./components/Common";
import { FsService } from "./services/FsService";
import { LogService } from "./services/LogService";

export const LogsWatch = () => {
    const [refresh, setRefresh] = useState(false)
    const services: any = useServices();

    useEffect(() => {
        // console.log(services.logs)
    }, [services])

    const dumpLogs = () => {
        console.log("dump logs")
        LogService.dumpLogs()
        setRefresh(current => !current)
    }

    const readPreviousLogs = () => {
        console.log("read previous logs")
        // FsService.readFile() 
        LogService.dumpPrevLogs()
        setRefresh(current => !current)
    }

    const logService = services.logs
    const fsService = services.fs
    // console.log(`[LogsMonitor] ${logService.status}`)

    return (
        <Panel title={"Logs monitoring"} subtitle={""}>
            <LogsConsole />
        </Panel>
    )
}

const LogsConsole = () => {
    const [refresh, setRefresh] = useState(false)
    const [logs, setLogs] = useState(false)

    const watchLogs = () => {
        console.log("dump logs")
        LogService.dumpLogs()
        setRefresh(current => !current)
    }
    const dumpLogs = () => {
        console.log("read archived logs")
        // FsService.readFile() 
        LogService.dumpPrevLogs()
        setRefresh(current => !current)
    }
    const clearConsole = () => {
        console.log("clear console")
    }

    return (<>
        <form>
            <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <Textarea
                    id="logsConsole"
                    placeholder="Press watch to start monitoring..."
                    required
                    value={"value test"}
                    rows={10}
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
                        <Button onClick={dumpLogs} size="xs">
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