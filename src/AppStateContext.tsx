import { createContext, useContext, useReducer } from 'react';
import { AppState } from './AppState';
import { DEFAULT_DEVICE_IP } from './config';
import { ServiceEventType, ServiceState } from './services/WebSocketLayer';

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
 *  Services states
 */

// { available: false }
const servicesInitialState = {
    gpio: {
        status: ServiceState.Disconnected
    }, logs: {
        status: ServiceState.Disconnected
    }
}

const ServicesContext = createContext(false);
const ServicesDispatchContext = createContext(null);

function connectionStateReducer(service, stateData) {
    switch (service) {
        case 'gpio': {
            return ({ 'gpio': { status: stateData.status } });
        }
        case 'logs': {
            return ({ 'logs': { status: stateData.status } });
        }
        default: {
            throw Error('Unknown service: ' + stateData.service);
        }
    }
}

function servicesStateReducer(servicesState, srvState) {
    const { service, event, data } = srvState
    switch (event) {
        case ServiceEventType.ConnectionState:
            const connectionState = connectionStateReducer(service, data)
            return ({ ...servicesState, ...connectionState })
            break;
    }

}


export function ServicesProvider({ children }) {
    const [gpioService, dispatch] = useReducer(servicesStateReducer, servicesInitialState);

    return (
        <ServicesContext.Provider value={gpioService}>
            <ServicesDispatchContext.Provider value={dispatch}>
                {children}
            </ServicesDispatchContext.Provider>
        </ServicesContext.Provider>
    );
}

export function useServices() {
    return useContext(ServicesContext);
}

export function useServicesDispatch() {
    return useContext(ServicesDispatchContext);
}
