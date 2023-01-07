export function TodoPreview({ todo }) {
    return <article>
        <h4>{todo.title}</h4>
        <ul>
            {todo.todoList.map(todo => <li key={todo._id}>
                {todo.task} <span>{(todo.isDone)? 'Done':'Not Done'}</span> 
            </li>)}
        </ul>
    </article>

}