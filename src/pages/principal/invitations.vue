<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col" v-if="people.length > 0">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div class="md:hidden divide-y-2">
            <div v-for="person in people" :key="people.email" class="px-1 py-3">
                <div class="font-semibold mb-1" >{{ person.email }}</div>
                <div class="text-sm text-gray-600">{{ person.school.name }}</div>
                <div class="text-sm text-gray-600 mb-2">{{ person.created_at }}</div>
                <div class="flex space-x-4">
                  <div>
                    <span v-if="person.if_register" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                    <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      Wait  
                    </span>
                  </div>
                  <div>
                    <router-link v-if="!person.if_register" :to="'/invitation?slug=' + person.slug" target="_blank" class="text-indigo-600 hover:text-indigo-900">Url</router-link>
                  </div>
                </div>
            </div>
          </div>
          <table class="hidden md:table min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="person in people" :key="person.email">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="">
                      <div class="text-sm text-gray-500">
                        {{ person.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ person.school.name }}</div>
                  <div class="text-sm text-gray-500">join at {{ person.created_at }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Normal Teacher
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="person.if_register" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                  <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                    Wait  
                  </span>

                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <router-link v-if="!person.if_register" :to="'/invitation?slug=' + person.slug" target="_blank" class="text-indigo-600 hover:text-indigo-900">Url</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="py-8 text-center text-gray-800">
      you have not invite any normal teacher
  </div>
</template>

<script>
import { onMounted, ref } from "vue"
import http from "../../http"
export default {
  setup() {
    const people = ref([])
    onMounted(() => {
        http.get('invitations').then(invitations => {
            people.value = invitations
        })
    })
    return {
        people
    }
  },
}
</script>