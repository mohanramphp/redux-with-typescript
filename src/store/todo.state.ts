import { Todo } from './todo.model';

export interface TodoState {
    todos: Array<Todo>;
}

/*
structure of todostate
{
    todos: [
        {
            id: 1,
            todo: "sample todo",
            isComplete: false
        }
    ]
} */


export const initialState = { todos: [] };
