export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODOS = 'REMOVE_TODOS'
export const ADD_TODOS = 'ADD_TODOS'
export const UPDATE_TODOS = 'UPDATE_TODOS'
export const SET_FILTER = 'SET_FILTER'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: [],
    isLoading: false
}

export function todoReducer(state = initialState, action) {
    let todos
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODOS:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }
        case ADD_TODOS:
            todos = [...state.todos, action.todo]
            return { ...state, todos }
        case UPDATE_TODOS:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }


        default:
            return { ...state }
    }
}