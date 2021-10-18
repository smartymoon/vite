<!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div class="min-h-screen bg-white flex">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>

        <form @submit.prevent class="mt-8">
          <div class="mt-6">
            <div class="space-y-6">

              <LeeInput name="name" label="User Name" v-model="form.name" />
              <LeeInput name="email" label="Email" v-model="form.email" />
              <LeeInput name="password" label="Password" v-model="form.password"  type="password" />
              <LeeInput name="password_confirmation" label="Password Confirmation" v-model="form.password_confirmation" type="password" />

              <div class="flex flex-row-reverse items-center justify-between">
                <div class="text-sm">
                  <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                    login
                  </router-link>
                </div>
              </div>

              <div>
                <button @click="handleSubmit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Register
                </button>
              </div>
              <p class="text-gray-700">default password 123456</p>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
    </div>
  </div>
</template>

<script>
import { reactive, toRaw } from 'vue'
import LeeInput from '../components/LeeInput.vue'
import { useStore } from 'vuex'

export default {
  components: {
    LeeInput
  },
  setup(props) {
    const store = useStore()
    const form = reactive({
              name: '',
              email: '',
              password: '123456',
              password_confirmation: '123456'
    })
    return {
      form,
      handleSubmit() {
          // into store
          /*
          http.post('/register', form)
              .then(({accessToken}) => {
                setToken(accessToken)
                Inertia.get('/', {}, bearerHeader())
              })
              .catch(error => {
                checkValidate(error, errors => validations.value = errors)
              }
          );
          */
          store.dispatch('register', toRaw(form))
      }
    }
  }
}
</script>
