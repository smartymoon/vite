<!-- This example requires Tailwind CSS v2.0+ -->
<!-- This example requires Tailwind CSS v2.0+ -->


<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
    <div class="max-w-lg mx-auto">
        <template v-if="bindUsers.length > 0">
            <h2 class="mb-4">Pick an account to login</h2>
            <div class="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" class="divide-y divide-gray-200">
                <li v-for="bindUser in bindUsers" :key="bindUser.id">
                    <div @click="handleLogin(bindUser)" class="block hover:bg-gray-50">
                    <div class="flex items-center px-4 py-4 sm:px-6">
                        <div class="min-w-0 flex-1 flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-12 w-12 rounded-full" :src="avatars[Math.floor(Math.random() * 4)]" alt="" />
                        </div>
                        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                            <p class="text-sm font-medium text-indigo-600 truncate">{{ bindUser.name }} {{ bindUser.role === 'teacher' ? ' (teacher)' : '' }}</p>
                            <p class="mt-2 flex items-center text-sm text-gray-500">
                                <MailIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span >{{ bindUser.email }}</span>
                            </p>
                            </div>
                        </div>
                        </div>
                        <div>
                        <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                    </div>
                    </div>
                </li>
                </ul>
            </div>
            <h2 class="mt-20 mb-4">Or bind an existing account</h2>
        </template>
        <h2 v-else class="mb-4">Bind an existing account</h2>
        <form  @submit.prevent class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div class="mt-1">
                  <input v-model="form.email" id="email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div class="mt-1">
                  <input v-model="form.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <button @click="handleBind" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Bind and Sign in
                </button>
              </div>
        </form>

        <div class="flex flex-col items-center justify-center">
          <img src="https://qr-official.line.me/sid/L/112bpgph.png" alt="">
          <div class="text-gray-800">
            <p class="px-10 text-center">scan QR code to add bot as your friend, 
            then you could get message from administrator</p>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/vue/solid'

/*
const bindUsers = [
  {
    applicant: {
      name: 'Ricardo Cooper',
      email: 'ricardo.cooper@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
  {
    applicant: {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
  {
    applicant: {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
]
*/

import { reactive, toRaw } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import http from '../http'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'

const avatars = [
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
]

export default {
  components: {
    CheckCircleIcon,
    ChevronRightIcon,
    MailIcon,
  },
  setup() {

    const route = useRoute()
    const store = useStore()
    const official_id = route.query.official_id

    const form = reactive({
        // email: 'susan@edu.com',
        email: 'student@student.com',
        password: '123456',
    })

    const bindUsers = ref([])
    onMounted(() => {
        http.get('/line/' + official_id + '/users').then(users => {
            console.log(bindUsers)
            bindUsers.value = users
        })
    })

    return {
      form,
      avatars,
      bindUsers,
      handleBind() {
          store.dispatch('lineBind', { official_id, form: toRaw(form) })
      },
      handleLogin(user) {
          store.dispatch('lineLogin', {
              type: user.role,
              user_id: user.id,
              official_id: official_id  
          })
      }
    }
  },
}
</script>