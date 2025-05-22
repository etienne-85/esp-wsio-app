import React from "react"
import { ConnectionState, RemoteService } from "../services/RemoteService"
// import { useRemoteService } from "./hooks"
const statusColorMapping = {}
statusColorMapping[ConnectionState.Connected] = "#16825d"
statusColorMapping[ConnectionState.Disconnected] = "#c72e0f"
statusColorMapping[ConnectionState.Connecting] = "#7a6400"

export const StatusBar = () => {
    // const [status] = useRemoteService()
    const status = RemoteService.connectionState || ConnectionState.Disconnected
    const { packets, ping } = RemoteService.stats

    return (<div
        style={{
            backgroundColor: statusColorMapping[status],
            color: "white",
            position: "absolute",
            bottom: "0px",
            left: "0px",
            padding: "2px",
            paddingRight: "5px",
            paddingLeft: "5px",
        }}>
        <span>Status: </span>
        <span>{status}</span>
        <span> | </span>
        <span>WS: </span>
        <span> Rx </span>
        <span> Tx </span>
        <span> | </span>
        <span>Packets: </span>
        <span>sent {packets.sent} </span>
        <span>received {packets.received}</span>
        <span> | </span>
        <span>Ping: </span>
        <span>{ping.latest}ms</span>
    </div>)
}