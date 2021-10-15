import { createStore } from 'vuex'
import http from './http.js'
import router from './router/index.js'
import { Role } from './utils.js'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      normal_teacher_school_id: localStorage.getItem('normal_teacher_school_id'),
      errors: {}
    }
  },
  getters: {
    getErrors(state) {
      return state.errors
    },
    getNormalTeacherSchoolId(state) {
      return state.normal_teacher_school_id
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
    setAuth (state, {token, role, normal_teacher_school_id}) {
        state.token = token
        state.role = role
        state.normal_teacher_school_id = normal_teacher_school_id
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
            const normal_teacher_school_id = data.normal_teacher_school_id
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
            localStorage.setItem('normal_teacher_school_id', normal_teacher_school_id)
            commit('setAuth', { token, role, normal_teacher_school_id })
            router.push(`/${role}/home`)
        })
      },
      normalTeacherLogin({ commit }, form) {
        http.post('normal_teacher', form).then(({data}) => {
            const token = data.auth.accessToken 
            const role = Role.Normal
            const normal_teacher_school_id = data.normal_teacher_school_id
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
            localStorage.setItem('normal_teacher_school_id', normal_teacher_school_id)
            debugger
            commit('setAuth', { token, role, normal_teacher_school_id })
            router.push(`/${role}/home`)
        })
      },
      logout({ commit }) {
          localStorage.removeItem('token')
          localStorage.removeItem('role')
          localStorage.removeItem('normal_teacher_school_id')
          commit('setAuth', {token: null, role: null, normal_teacher_school_id: null})
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