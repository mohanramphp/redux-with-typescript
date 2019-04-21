import { Action, Reducer, CallbackFn } from './types';

// Store - which manages the state of the application
export class Store<T> {

    private state: T;
    private listeners: Array<CallbackFn> = [];

    constructor(
        private reducer: Reducer<T>,
        initialState: T
    ) {
        this.state = initialState;
    }

    // method to return the current state of the application
    getState(): T {
        return this.state;
    }

    // method handles the action dispatched to the store
    dispatch(action: Action): void {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach((listener: CallbackFn) => listener());
    }

    // method to subscribe to the state changes
    subscribe(listener: CallbackFn): CallbackFn {
        this.listeners.push(listener);
        // returning function to unsubscribe from the observer
        return () => this.listeners.filter(l => l !== listener);
    }

}
