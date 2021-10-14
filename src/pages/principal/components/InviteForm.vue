<template>
  <div class="border rounded bg-gray-50 p-4">
    <h2 class="mb-4">Invite Teacher</h2>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700">School (Pick a school on left side)</label>
      <div type="text" readonly class="mt-2 shadow-sm  block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"> {{ school.name }} </div>
    </div>
    <lee-input label="Teacher Email" placeholder="input teacher email" name="teacher_email" v-model="form.teacher_email" />

    <p class="py-2" v-if="invite_url">{{ invite_url }}</p>

    <div class="flex justify-end">
      <button @click="handleSubmit" type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sent Email
      </button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import { reactive, toRaw } from '@vue/reactivity'
import { useStore } from 'vuex'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import LeeInput from '../../../components/LeeInput.vue'
import http from '../../../http'
export default {
    components: {
      ExclamationCircleIcon,
      LeeInput
    },
    props: {
        school: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const store = useStore()
        const invite_url = ref('')
        const form = reactive({
            school_id: props.school.id,
            teacher_email: '',
        })
        return {
            form,
            invite_url,
            handleSubmit () {
                http.post('/invitations', toRaw(form)).then(({data}) => {
                   invite_url.value = data.url 
                })
            }
        }
    }
}
</script>
