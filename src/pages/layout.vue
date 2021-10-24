<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="min-h-screen bg-white">
    <Disclosure as="nav" class="bg-white border-b border-gray-200" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.href === $route.path ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
                {{ item.name }}
              </router-link>
              <a href="http://edu.test/api/line/login" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">bind-line</a>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center ">
            <a type="button" class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative cursor-pointer" @click="toAdminMessages">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
                <div class="w-5 h-5 text-white bg-red-700 rounded-full text-xs flex justify-center items-center absolute top-0 right-0 -m-1" v-if="unreadAdmin">
                    {{ unreadAdmin }}
                </div>
            </a>


            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem  v-slot="{ active }">
                    <div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                      {{ email }}
                    </div>
                  </MenuItem>
                  <MenuItem  v-slot="{ active }">
                    <a @click="handleLogout" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                        logout
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800', 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">
            {{ item.name }}
          </router-link>
          <a href="http://edu.test/api/line/login" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              bind-line
          </a>
          <a class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" @click="handleLogout">
              logout
          </a>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ email }}</div>
            </div>
            <button type="button" class="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative" @click="toAdminMessages">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
              <div class="w-5 h-5 text-white bg-red-700 rounded-full text-xs flex justify-center items-center absolute top-0 right-0 -m-1" v-if="unreadAdmin">
                  {{ unreadAdmin }}
              </div>
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <router-link v-for="item in userNavigation" :key="item.name" :to="item.href" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <div class="py-10">
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 class="text-xl font-bold capitalize ml-4">{{ role }}</h1>
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg p-5" >
                <router-view />
            </div>
          </div>
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { useStore } from 'vuex'
import Notification from '../components/Notification.vue'
import { registerEcho } from '../utils'
import { computed, ref } from '@vue/reactivity'
import { Role } from '../utils'
import http from '../http'
import { useRouter } from 'vue-router'


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'home', href: '/student/home', current: true },
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const store = useStore()

    const navigation = ref([]);
    const router = useRouter()
    const role = store.state.role
    const type = role === 'student' ? 'student' : 'teacher'
    if (role === Role.Student) {
        navigation.value = [
            { name: 'home', href: '/student/home' },
            { name: 'admin-message', href: '/student/admin-message' }
        ]
    } else if (role === Role.Principal) {
        navigation.value = [
            { name: 'home', href: '/principal/home'},
            { name: 'invitations', href: '/principal/invitations'},
            { name: 'admin-message', href: '/principal/admin-message' }
        ]
    } else if (role === Role.Normal) {
        navigation.value = [
            { name: 'home', href: '/normal/home', current: true },
            { name: 'admin-message', href: '/normal/admin-message' }
        ]
    }

    registerEcho()

    // check admin message

    store.dispatch('checkAdminMessages')

    


    return {
      user,
      role,
      unreadAdmin: computed(() => store.state.unreadAdmin),
      email: store.state.user.email,
      name: store.state.user.name,
      navigation,
      handleLogout() {
          store.dispatch('logout')
      },
      toAdminMessages() {
          router.push(`/${role}/admin-message`)
      }
    }
  },
}
</script>