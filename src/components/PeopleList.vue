<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="pb-4 border rounded" v-if="people.length > 0">
    <div class="flow-root mt-6">
      <ul role="list" class="-my-5 divide-y divide-gray-200">
        <li v-for="person in people"  class="py-4 px-2 mx-2" :class="$store.state.talkingWith === person.id ? 'bg-blue-100 rounded overflow-hidden' : ''">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0 relative">
              <img class="h-8 w-8 rounded-full" :src="avatars[Math.floor(Math.random() * 4)]" alt="" />
              <div class="absolute right-0 bottom-0" v-if="person.unread">
                <div class="rounded-full h-3 w-3 bg-red-400"></div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ person.name }}
              </p>
              <p class="text-xs text-gray-500">{{ person.email }}</p>
            </div>
            <div class="flex gap-1">
              <a @click="handleClick(person)" :class="(person.unread) ? 'text-red-400 border-red-300' : ''" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                {{ (person.unread ) ? 'UnRead' : 'Chat' }}
              </a>
              <Follow :canEdit="canEdit" :person="person" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="my-8">
       no people or now, {{ $store.state.role === 'principal' ? 'you can add student after school appreoved' : '' }} 
  </div>
</template>

<script>
const avatars = [
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
]

import { Role } from '../utils'
import Follow from '../components/Follow.vue'
import { useStore } from 'vuex'
export default {
  props: {
    people: {
      type: Array,
      required: true
    },
  },
  components: {
    Follow
  },
  setup(props, {emit}) {
    const store = useStore()
    return {
        avatars,
        canEdit:  store.getters.role === Role.Student,
        handleClick(person) {
          emit('chat', person.id, person.name)
          person.unread = false
        }
    }
  },
}
</script>