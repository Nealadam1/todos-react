
import { todoService } from "../services/todo.service.js";
import { store } from "./store.js";
import { ADD_TODOS, REMOVE_TODOS, SET_FILTER, SET_IS_LOADING, SET_TODOS, UPDATE_TODOS } from "./todo.reducer.js";

export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('Could not load todos', err)
            throw err
        })
        .finally(()=>{
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODOS, todoId })
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
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('Cannot save Todo', err)
            throw err
        })
}

export function taskDone(todo, taskId) {
    console.log(todo)
    const taskIdx = todo.todoList.findIndex(task => task._id === taskId)
    if (taskIdx < 0) return
    todo.todoList[taskIdx].isDone = todo.todoList[taskIdx].isDone ? false : true
    saveTodo(todo)
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
  }