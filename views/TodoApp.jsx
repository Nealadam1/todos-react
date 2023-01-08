
import { TodoFilter } from "../cmps/todo-filter.jsx"
import { TodoList } from "../cmps/todo-List.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"
import { loadTodos, removeTodo, saveTodo,setFilter } from "../store/todo.action.js"

const { useEffect } = React
const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux



export function TodoApp() {
    const todos = useSelector((storeState) => storeState.todoModule.todos)
    const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)
    const isLoading = useSelector((storeState) => storeState.todoModule.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        loadTodos(filterBy)
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo Removed')
            })
            .catch(err => {
                showErrorMsg('Cannot Remove Todo')

            })
    }
    function setFilterBy(filterBy) {
        setFilter(filterBy)
    }


    return <section>
        <h3>Todo App</h3>
        <TodoFilter setFilterBy={setFilterBy} />
        <main>
        {isLoading && <p>Loading...</p>}
            <Link to="/todo/edit">Add Todo</Link>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />
        </main>
    </section>


}