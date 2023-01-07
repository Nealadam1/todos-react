
import { TodoList } from "../cmps/todo-List.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"
import { loadTodos, removeTodo, saveTodo } from "../store/todo.action.js"

const { useEffect } = React
const {Link}=ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux



export function TodoApp() {
    const todos = useSelector((storeState) => storeState.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        loadTodos()
    }, [])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo Removed')
            })
            .catch(err => {
                showErrorMsg('Cannot Remove Todo')

            })
    }

    function onAddTodo() {
        const todoToSave = todoService.getEmptyTodo()
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo Added (id: ${savedTodo._id}`)
            })
            .catch(err => {
                showErrorMsg('Cannot Add Todo')
            })
    }

    return <section>
        <h3>Todo App</h3>
        <main>
            <Link to="/todo/edit">Add Todo</Link>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />
        </main>
    </section>


}