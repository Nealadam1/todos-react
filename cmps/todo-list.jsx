
const {Link} = ReactRouterDOM
import { TodoPreview } from "./todo-preview.jsx";


export function TodoList({ todos, onRemoveTodo }) {
    return <ul className="todo-list">
        {todos.map(todo => <li className="todo-preview" key={todo._id}>
            <TodoPreview todo={todo} />
            <div>
                <button onClick={() => onRemoveTodo(todo._id)} >X</button>
                <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
            </div>
        </li>)}
    </ul>
}