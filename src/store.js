import { createStore } from 'vuex'
import http from './http.js'
import router from './router/index.js'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      errors: {}
    }
  },
  getters: {
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
    }
  },
  mutations: {
    setAuth (state, {token, role}) {
        state.token = token
        state.role = role
    },
    setErrors(state, errors) {
      state.errors = errors
    }
  },
  actions: {
      login({ commit }, form) {
        http.post('login', form).then(({data}) => {
            const token = data.auth.access_token 
            const role = data.role
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
            commit('setAuth', { token, role })
            router.replace(`/${role}/home`)
        })
      },
      logout({ commit }) {
          localStorage.removeItem('token')
          localStorage.removeItem('role')
          commit('setAuth', {token: null, role: null})
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