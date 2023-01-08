import { storageServiceAsync } from './async-storage.service.js'
import { storageService} from './storage.service.js'

const USER_KEY = 'userDB'
const USER_SESSION_KEY = 'loggedinUser'


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    update,
    remove,
    getEmptyCredentials
}
_createDemoUsers()

function getById(userId) {
    return storageServiceAsync.get(USER_KEY, userId)
}

function update(user) {
    return storageServiceAsync.put(USER_KEY, user).then(user => {
        _setLoggedinUser(user)
        return user
    })
}
function remove(userId) {
    return storageServiceAsync.remove(USER_KEY, userId)
}

function login(credentials) {
    return storageServiceAsync.query(USER_KEY).then((users) => {
        const user = users.find((u) => u.username === credentials.username)
        if (!user) return Promise.reject('Login failed')
        _setLoggedinUser(user)
        return user
    })
}

function signup(credentials) {
    return storageServiceAsync.post(USER_KEY, credentials).then((user) => {
        _setLoggedinUser(user)
        return user
    })
}

function getEmptyCredentials(
    fullname = '',
    username = '',
    password = 'secret',

) {
    return {
        fullname,
        username,
        password,
        activities: [],
    }
}

function logout() {
    sessionStorage.removeItem(USER_SESSION_KEY)
    return Promise.resolve()
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(USER_SESSION_KEY) || null)
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function _createDemoUsers() {
    let userDemo = storageService.loadFromStorage(USER_KEY)
    console.log(userDemo)
    if (!userDemo || !userDemo.length) {
        userDemo = [
            {
                _id: 'teata',
                fullname: 'Neal Adam',
                username: 'neals',
                password: 'secret'
            },
            {
                _id: 'gasdgh',
                fullname: 'dill Adam',
                username: 'dill',
                password: 'secret'
            },
            {
                _id: 'teata',
                fullname: 'reek meek',
                username: 'reek',
                password: 'secret'
            },

        ]
    }

    storageService.saveToStorage(USER_KEY,userDemo)
}


