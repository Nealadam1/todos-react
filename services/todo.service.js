
import { asyncStorageService } from "./async-storage.service.js"
import { storageService } from "./storage.service.js"
import { utilService } from "./util.service.js"

const TODO_KEY = 'todoDB'
createDemoData()

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter

}

function query(filterBy = getDefaultFilter()) {
  return asyncStorageService.query(TODO_KEY).then((todos) => {
    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      todos = todos.filter((todo) => regex.test(todo.title))
    }
    if (filterBy.isComplete) {
      todos = todos.filter((todo) => todo.isComplete === filterBy.isComplete)
    }
    return todos
  })
}
function getById(todoId) {
    return asyncStorageService.get(TODO_KEY, todoId)
}

function remove(todoId) {
    return asyncStorageService.remove(TODO_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return asyncStorageService.put(TODO_KEY, todo)
    } else {
        // todo.owner = userService.getLoggedinUser()
        return asyncStorageService.post(TODO_KEY, todo)
    }
}

function getEmptyTodo() {
    return {
        title: '',
        todoList: [{ _id: utilService.makeId() ,task: '', isDone: false }],
        isComplete: 'false'
    }
}
function getDefaultFilter() {
    return { isComplete: '', title: '' }
  }

function createDemoData() {

    let todoDemo = storageService.loadFromStorage(TODO_KEY)
    console.log(todoDemo)
    if (!todoDemo||!todoDemo.length) {
        todoDemo = [
            {
                _id: 'Tdtsa',
                title: 'server todos',
                todoList: [{ _id: 'dsad', task: 'build service', isDone: false }, { _id: 'eqrw', task: 'build server', isDone: false }],
                isComplete: 'false'
            },
            {
                _id: 'dsaha',
                title: 'front todos',
                todoList: [{ _id: 'qrga', task: 'build store', isDone: false }, { _id: 'ngfj', task: 'build cmps', isDone: false }, { _id: 'dsadad', task: 'build users', isDone: false }],
                isComplete: 'false'
            },
            {
                _id: 'kjytkgj',
                title: 'css todos',
                todoList: [{ _id: 'teapa', task: 'design basic css', isDone: false }],
                isComplete: 'false'
            }
        ]

        storageService.saveToStorage(TODO_KEY, todoDemo)
    }
}