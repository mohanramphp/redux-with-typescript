import { Action } from '../redux/types';
import { Todo } from './todo.model';

export enum TodoActionEnum {
    AddTodo = '[todos] add todo',
    RemoveTodo = '[todos] remove todo',
    ToggleTodo = '[todos] toggle todo'
}

// add todo
export class AddTodoAction implements Action {

    readonly type = TodoActionEnum.AddTodo;
    payload: Todo = {
        id: null,
        todo: null,
        isComplete: false
    };

    constructor(payload: Partial<Todo>) {
        this.payload = { ...this.payload, ...payload };
    }
}

// remove todo
export class RemoveTodoAction implements Action {

    readonly type = TodoActionEnum.RemoveTodo;

    constructor(public payload: { id: string }) { }
}


// toggle todo incomplete/complete
export class ToggleTodoAction implements Action {

    readonly type = TodoActionEnum.ToggleTodo;

    constructor(public payload: { id: string }) { }
}

export type TodoAction = AddTodoAction | RemoveTodoAction | ToggleTodoAction;
