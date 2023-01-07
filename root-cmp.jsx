const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { Provider } = ReactRedux

import { AppHeader } from "./cmps/app-header.jsx"
import { store } from "./store/store.js"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { TodoEdit } from "./views/todo-edit.jsx"
import { TodoApp } from "./views/TodoApp.jsx"



export function App() {
    return <Provider store={store}>
    <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/todo" element={<TodoApp />} />
                <Route path="/todo/edit" element={<TodoEdit />} />
                <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
            </Routes>
        </section>
    </Router>
    </Provider>
}
