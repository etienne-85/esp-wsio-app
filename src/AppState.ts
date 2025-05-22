import { DEFAULT_DEVICE_IP } from "./config"

/**
 * App global shared state
 */
export class AppState {
    static device = { ip: DEFAULT_DEVICE_IP }
    static state: any = {}
    static get initState() {
        console.log(`[AppState] init state: ${AppState.state.init} `)
        return AppState.state.init
    }
    static set initState(val: Boolean) {
        AppState.state.init = val
        console.log(`[AppState] init: ${AppState.state.init} `)
    }

    static get deviceIp() {
        const val = AppState.device.ip
        console.log(`[AppState] device IP: ${val} `)
        return val
    }

    static set deviceIp(val: string) {
        console.log(`[AppState] set device IP: ${val} `)
        AppState.device.ip = val
    }

}