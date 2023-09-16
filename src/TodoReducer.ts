export enum ActionType {
    ADD = 'add',
    REMOVE = 'remove',
    DONE = 'done',
    EDIT = 'edit',
    SET_TODOS = 'set_todos'
}

export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

export type Action =
    | { type: ActionType.ADD; payload: string }
    | { type: ActionType.REMOVE; payload: number }
    | { type: ActionType.DONE; payload: number }
    | { type: ActionType.EDIT; payload: { id: number, todo: string } }
    | { type: ActionType.SET_TODOS; payload: Todo[] };


const TodoReducer = (state: Todo[], action: Action) => {
    switch (action.type) {
        case ActionType.ADD:
            return [
                ...state,
                {
                    id: Date.now(),
                    todo: action.payload,
                    isDone: false,
                },
            ];
        case ActionType.REMOVE:
            return state.filter((todo) => todo.id !== action.payload);
        case ActionType.DONE:
            return state.map((todo) =>
                todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
            );
        case ActionType.EDIT:
            return state.map((todo) =>
                todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo
            );
        case ActionType.SET_TODOS:
            return action.payload    
        default:
            return state;
    }
};

export default TodoReducer;
