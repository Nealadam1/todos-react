import { taskDone } from "../store/todo.action.js"

const { useSelector, useDispatch } = ReactRedux
export function TodoPreview({ todo }) {
    const tasks = useSelector((storeState) => storeState.todoModule.todos.todoList)
    const dispatch = useDispatch()

    function ontaskDone(ev) {
        const { id } = ev.target
        ev.stopPropagation()

        console.log(id)
        taskDone(todo,id)
    }


    return <article className="todo-preview">
        <h4>{todo.title}</h4>
        <ul>
            {todo.todoList.map(todo => <li key={todo._id}>
                <input type="checkbox"
                    defaultChecked={todo.isDone ? true : false}
                    name='isDone'
                    id={todo._id}
                    onChange={ontaskDone} />

                {todo.task} <span>{(todo.isDone) ? 'Done' : 'Not Done'}</span>
            </li>)}
        </ul>
    </article>

}