// import { Store } from './redux/redux-observable';
import { Store } from './redux/redux';
import * as nanoid from 'nanoid';

// Planning redux app with following steps
// 1. Define the structure of our application state
import { Todo } from './store/todo.model';
import { TodoState, initialState } from './store/todo.state';

// 2. Define actions that will change that state
import { AddTodoAction, RemoveTodoAction, ToggleTodoAction } from './store/todo.action';

// 3. Define a reducer that takes the old state and an action and returns a new state.
import { todoReducer } from './store/todo.reducer';

// 4. create store by passing reducer and intial state
const todoStore: Store<TodoState> = new Store<TodoState>(todoReducer, initialState);

// DOM selector declaration + event handler
const todoListElem = document.querySelector('.todo-list') as HTMLUListElement;
const addButtonElem = document.querySelector('.add-button') as HTMLButtonElement;
const todoInputElem = document.querySelector('.todo-input') as HTMLInputElement;

// handling the rendering part
todoStore.subscribe((/* { todos } */) => {
    const { todos } = todoStore.getState();
    todoListElem.innerHTML = !!todos.length ?
        todos.map(
            ({ id, todo, isComplete }) => `<li id="${id}" class="${isComplete ? 'strike-out' : ''}">
                                                ${todo} | <a id="${id}" href="javascript:void(0)">delete</a>
                                            </li>`
        ).join('') :
        `<li>No todos found</li>`
});



// listener to handle todo removal and toggle
todoListElem.addEventListener('click', ({ target }: MouseEvent) => {
    const elem = target as HTMLElement;
    switch (elem.tagName.toLowerCase()) {
        case 'li': {
            const id = elem.getAttribute('id');
            todoStore.dispatch(new ToggleTodoAction({ id }));
            break;
        }
        case 'a': {
            const id = elem.getAttribute('id');
            todoStore.dispatch(new RemoveTodoAction({ id }));
            break;
        }
    }
    return;
}, false);

// listener to add input
addButtonElem.addEventListener('click', (e) => {
    const text = todoInputElem.value.trim();
    if (text) {
        const todo: Partial<Todo> = {
            id: nanoid(),
            todo: text
        };
        todoStore.dispatch(new AddTodoAction(todo));
        todoInputElem.value = '';
    }
    return;
});
