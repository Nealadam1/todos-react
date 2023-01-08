
import { showErrorMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"
import { utilService } from "../services/util.service.js"
import { loadTodo, loadTodos, saveTodo } from "../store/todo.action.js"

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoEdit() {
    const { todoId } = useParams()
    const navigate = useNavigate()
    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())

    useEffect(() => {
        if (!todoId) return
        loadTodo()

    }, [todoId])

    function loadTodo() {
        todoService.getById(todoId)
            .then(todo => setTodoToEdit(todo))
            .catch(err => {
                showErrorMsg('had issue in todo detail')
                navigate('/todo')
            })
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit).then(todo => {
            console.log('todo saved', todo)
            navigate('/todo')
        })


    }

    function handleChange({ target }) {
        let { id, value, type, name: field } = target
        value = (type === 'number' || type === 'range') ? +value : value
        if (field === 'task') {
            let idx = todoToEdit.todoList.findIndex(todo => todo._id === id)
            todoToEdit.todoList[idx].task = value
            const todoJson = JSON.stringify(todoToEdit)
            const todoParse = JSON.parse(todoJson)
            setTodoToEdit((prevTodo) => todoParse)
        } else {
            setTodoToEdit((prevTodo) => ({ ...prevTodo, [field]: value }))
        }
    }

    function addTask() {
        const newTask = { _id: utilService.makeId(), task: '', isDone: false }
        todoToEdit.todoList.push(newTask)
        const todoJson = JSON.stringify(todoToEdit)
        const todoParse = JSON.parse(todoJson)
        setTodoToEdit((prevTodo) => todoParse)
    }

    console.log(todoToEdit)

    return <section className="Todo-edit">
        <h2>{todoToEdit._id ? 'Edit this Todo' : 'Add a new Todo'}</h2>

        <form onSubmit={onSaveTodo}>
            <label htmlFor="title">Title:</label>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter title"
                value={todoToEdit.title}
                onChange={handleChange}
            />
            <ul>
                {todoToEdit.todoList.map(todo => <li key={todo._id}>
                    <label htmlFor="task">Task:</label>
                    <input type="text"
                        name="task"
                        id={todo._id}
                        placeholder="Enter task"
                        value={todo.task}
                        onChange={handleChange}
                    />
                </li>)}
            </ul>
            <div>
                <button>{todoToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/todo">Back</Link>

            </div>
        </form>
        <button onClick={addTask}>Add Task</button>


    </section>

}