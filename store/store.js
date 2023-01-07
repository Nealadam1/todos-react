export const SET_TODOS='SET_TODOS'
export const REMOVE_TODOS='REMOVE_TODOS'
export const ADD_TODOS='ADD_TODOS'
export const UPDATE_TODOS='UPDATE_TODOS'


const {createStore} = Redux
const initialState={
    todos:[]
}

function appReducter(state = initialState, action){
    let todos
    switch (action.type) {
        case SET_TODOS:
            return {...state, todos: action.todos}
        case REMOVE_TODOS:
            console.log(todos)
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            console.log(todos)
            return {...state, todos}
        case ADD_TODOS:
            todos = [...state.todos, action.todo]
            return {...state, todos}
        case UPDATE_TODOS:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return {...state, todos}
    
        default:
            return {...state}
    }
}

export const store= createStore(appReducter)
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})