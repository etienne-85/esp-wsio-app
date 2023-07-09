import { createContext, useContext, useReducer } from 'react';
import { AppState } from './AppState';
import { DEFAULT_DEVICE_IP } from './config';
import { ServiceState } from './services/WebSocketLayer';

/**
 * Device setup
 */

const deviceInitialState = { ip: DEFAULT_DEVICE_IP, ready: false }

const DeviceContext = createContext(null);
const DeviceDispatchContext = createContext(null);

function deviceStateReducer(deviceState, action) {
    switch (action.type) {
        case 'setup': {
            console.log(deviceState)
            console.log(action)
            // TODO check if AppState could be merge here
            AppState.deviceIp = action.ip
            return ({ ...deviceState, ip: action.ip, ready: true });
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export function DeviceProvider({ children }) {
    const [deviceState, dispatch] = useReducer(deviceStateReducer, deviceInitialState);

    return (
        <DeviceContext.Provider value={deviceState}>
            <DeviceDispatchContext.Provider value={dispatch}>
                {children}
            </DeviceDispatchContext.Provider>
        </DeviceContext.Provider>
    );
}

export function useDevice() {
    return useContext(DeviceContext);
}

export function useDeviceDispatch() {
    return useContext(DeviceDispatchContext);
}

/**
 *  GPIO wether available or not
 */

// { available: false }
const gpioInitialState = { status: ServiceState.Disconnected }

const GpioContext = createContext(false);
const GpioDispatchContext = createContext(null);

function gpioStateReducer(gpioState, action) {
    switch (action.type) {
        case 'status': {
            // TODO set ready
            return ({ ...gpioState, status: action.status });
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export function GpioProvider({ children }) {
    const [gpioService, dispatch] = useReducer(gpioStateReducer, gpioInitialState);

    return (
        <GpioContext.Provider value={gpioService}>
            <GpioDispatchContext.Provider value={dispatch}>
                {children}
            </GpioDispatchContext.Provider>
        </GpioContext.Provider>
    );
}

export function useGpio() {
    return useContext(GpioContext);
}

export function useGpioDispatch() {
    return useContext(GpioDispatchContext);
}
