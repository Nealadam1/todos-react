import { todoService } from "../services/todo.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function TodoFilter({ setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(todoService.getDefaultFilter())
    setFilterBy = useRef(utilService.debounce(setFilterBy))

    useEffect(() => {
        setFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section className='todo-filter'>
          <select
            onChange={handleChange}
            defaultValue={filterByToEdit.isComplete}
            name='isComplete'
            id='isComplete'>
            <option value=''>All</option>
            <option value='false'>Active</option>
            <option value='true'>Done</option>
          </select>
          <input
            onChange={handleChange}
            value={filterByToEdit.title}
            type='text'
            name='title'
            id='title'
            placeholder='Search todo...'
          />
        </section>
      )

}