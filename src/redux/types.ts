// Action signature
export interface Action {
    type: symbol | string;
    payload?: any;
}

// Reducer signature
export interface Reducer<T> {
    (state: T, action: Action): T;
}

// Callback function signature
export interface CallbackFn {
    (): void
}
