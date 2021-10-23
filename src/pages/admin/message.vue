<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col" v-if="data.length > 0">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div class="md:hidden divide-y" >
            <div v-for="(item, dataIdx) in data" :key="item.id" class="py-2">
              <div class="flex justify-between text-gray-500 text-sm">
                <div>{{ item.id }}. </div>
                <div>{{ item.created_at }}</div>
              </div>
              <div class="text-sm mt-1 text-gray-800">
                {{ item.message }}
              </div>
            </div>
          </div>
          <table class="hidden md:table min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="w-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                </th>
                <th scope="col" class="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created at
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, dataIdx) in data" :key="item.id" :class="dataIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.message }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.created_at }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-10">
    no message from admin for now
  </div>
</template>

<script>import http from "../../http"
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'


export default {
  setup() {
    const data = ref([]) 
    const store = useStore()
    const type = store.state.role === 'student' ? 'student' : 'teacher';
    http.get(`/${type}/admin-messages`).then( list => {
      console.log(list)
      data.value = list
      store.commit('setUnreadAdmin', 0)
    })
    return {
      data
    }
  },
}
</script>