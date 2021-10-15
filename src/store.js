import { createStore } from 'vuex'
import http from './http.js'
import router from './router/index.js'
import { Role } from './utils.js'

const dealAuth = (commit, data) => {
    const token = data.auth.accessToken 
    const role = data.role

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
      errors: {}
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
    }
  },
  actions: {
      login({ commit }, form) {
        http.post('login', form).then(({data}) => {
          dealAuth(commit, data)
        })
      },
      normalTeacherLogin({ commit }, form) {
        http.post('normal_teacher', form).then(({data}) => {
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
      }
  }
})


export default store