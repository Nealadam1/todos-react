
import { todoService } from "../services/todo.service.js";
import { ADD_TODOS, REMOVE_TODOS, SET_TODOS, store, UPDATE_TODOS } from "./store.js";

export function loadTodos() {
    return todoService.query()
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('Could not load todos', err)
            throw err
        })
}

export function loadTodo(todoId){
    return todoService.getById(todoId)
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODOS, todoId})
        })
        .catch(err => {
            console.log('Could not remove todos', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = (todo._id) ? UPDATE_TODOS : ADD_TODOS
    return todoService.save(todo)
    .then(savedTodo => {
        store.dispatch({type, todo : savedTodo})
        return savedTodo
    })
    .catch(err => {
        console.log('Cannot save Todo', err)
        throw err 
    })
}