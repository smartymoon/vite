import store from './store'
export const Role = {
    Principal: 'principal',
    Normal: 'normal',
    Student: 'student',
}

export const middleware = {
    principal() {

    }, 
    normal() {

    },
    student() {

    },
    guest() {
        return !store.getters.hasToken
    }
}


export function getErrors () {

}