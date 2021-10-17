import store from './store'
import Echo from "laravel-echo"

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

export function registerEcho() {

    const identity = store.state.role === Role.Student ? 'student' : 'teacher'
    const EchoInstance = new Echo({
        broadcaster: 'pusher',
        key: '46d8134de723d77a6256',
        disableStats: true,
        authEndpoint: `http://edu.test/api/broadcast/auth/${identity}`,
        auth: {
          headers: {
            Authorization: "Bearer " + store.getters.token,
          }
        }
      });

    EchoInstance.private(`chat.${identity}${store.state.user.id}`)
      .listen('Chat', (e) => {
        store.dispatch('messageReceived', e)
    })
}