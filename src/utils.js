import store from './store'
export const Role = {
    Principal: 'principal',
    Normal: 'normal',
    Student: 'student',
}

export const middleware = {
    principal() {
        return store.getters.token && (store.getters.role === Role.Principal)
    }, 
    normal() {
        return store.getters.token && (store.getters.role === Role.Normal)
    },
    student() {
        return store.getters.token && (store.getters.role === Role.Student)
    },
    guest() {
        return !store.getters.hasToken
    }
}


export function getErrors () {

}