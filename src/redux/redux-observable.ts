import { Action, Reducer, CallbackFn } from './types';
import { BehaviorSubject, Subject } from 'rxjs';

import { scan } from 'rxjs/operators';

// Store - which manages the state of the application
export class Store<T> extends BehaviorSubject<T> {

    private dispatcher: Subject<Action> = new Subject<Action>();

    constructor(
        private reducer: Reducer<T>,
        initialState: T
    ) {
        super(initialState);
        this.dispatcher.pipe(
            scan(
                (state: T, action: Action) => this.reducer(state, action), initialState
            )
        ).subscribe(state => super.next(state));
    }

    // method to return the current state of the application
    getState(): T {
        return this.value;
    }

    // method handles the action dispatched to the store
    dispatch(action: Action): void {
        this.dispatcher.next(action);
    }

}
