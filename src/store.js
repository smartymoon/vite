import { createStore } from 'vuex'
import http from './http.js'
import notify from './notify.js'
import router from './router/index.js'
import { Role } from './utils.js'

const dealAuth = (commit, data) => {
    const token = data.auth.accessToken 
    const role = data.role

    const identity = role === Role.Student ? 'student' : 'teacher'


    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('user', JSON.stringify(data.user))

    commit('setAuth', { token, role })
    commit('setUser', data.user)

    router.push(`/${role}/home`)
}

// Create a new store instance.
const store = createStore({
  state () {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      user: JSON.parse(localStorage.getItem('user')),
      people: [],
      errors: {},
      newMessage: {
        message: null,
        fromName: ''
      },
      talkingWith: null,
      unreadAdmin: 0,
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getErrors(state) {
      return state.errors
    },
    token(state) {
        return state.token
    },
    role(state) {
        return state.role
    },
    hasToken(state) {
        return Boolean (state.token)
    },
    newMessage(state) {
      return state.newMessage
    }
  },
  mutations: {
    setAuth (state, {token, role }) {
        state.token = token
        state.role = role
    },
    setUser(state, user) {
      state.user = user
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    setNewMessage(state, message) {
      state.newMessage = message
    },
    clearNewMessage(state, last_message_id)
    {
      if (state.newMessage.message && last_message_id === state.newMessage.message.id) {
        state.newMessage = {
          message: null,
          fromName: ''
        }
      }
    },
    talkingTo(state, user_id) {
      state.talkingWith = +user_id
    },
    leaveTalk(state) {
      state.talkingWith = null
    },
    setPeople(state, people) {
      state.people = people
    },
    pushStudent(state, student) {
      state.people.unshift(student)
    },
    setUnreadAdmin(state, count) {
      state.unreadAdmin = count
    },
  },
  actions: {
      async login({ commit }, form) {
        await http.post('login', form).then(({data}) => {
          dealAuth(commit, data)
        })
      },
      async normalTeacherLogin({ commit }, form) {
        await http.post('normal_teacher', form).then(({data}) => {
          dealAuth(commit, data)
        })
      },
      lineBind({commit}, {official_id, form}) {
        http.post('/line/' + official_id + '/users', form).then(({data}) => {
          dealAuth(commit, data)
        })
      },
      lineLogin({commit}, form) {
          http.post('/line/login', form).then(({data}) => {
            dealAuth(commit, data)
          })
      },
      logout({ commit }) {
          localStorage.removeItem('token')
          localStorage.removeItem('role')
          localStorage.removeItem('user')
          commit('setAuth', {token: null, role: null })
          commit('setUser', null)
          router.push('/login')
      },
      setErrors({ commit }, errors) {
        commit('setErrors', errors)
      },
      clearErrors({ commit }) {
        commit('setErrors', {})
      },
      messageReceived({commit, state}, data) {
        if (data.message.from_id !== state.talkingWith) {
          // find person set him unread
          state.people.find(person => person.id === +data.message.from_id).unread = true
          notify.success('new message from ' + data.fromName, data.message.message, 10000)
        }
        commit('setNewMessage', data)
      },
      getStudentsOfSchool({commit, state}, id = null) {
          let school_id = id || state.user.school_id;
          http.get(`/schools/${school_id}/students`).then(students => {
            commit('setPeople', students)
          })
      },
      getTeachersOfSchool({commit, state}) {
          http.get(`/students/teachers`).then(teachers => {
            commit('setPeople', teachers)
          })
      },
      checkAdminMessages({commit, state}) {
          const type = state.role === 'student' ? 'student' : 'teacher'
          http.get(`/${type}/admin-messages/check`).then(({ data }) => {
            commit('setUnreadAdmin', data)
          })
      },
      async register({commit}, form) {
          await http.post('/register', form).then(({data}) => {
            dealAuth(commit, data)
          })
      } 
  }
})


export default store