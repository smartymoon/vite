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
      <lee-button text="Send Email" @click="handleSubmit" :loading="loading" />
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import { reactive, toRaw } from '@vue/reactivity'
import { useStore } from 'vuex'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import LeeInput from '../../../components/LeeInput.vue'
import LeeButton from '../../../components/LeeButton.vue'
import http from '../../../http'
export default {
    components: {
      ExclamationCircleIcon,
      LeeInput,
      LeeButton
    },
    props: {
        school: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const store = useStore()
        const loading = ref(false)
        const invite_url = ref('')
        const form = reactive({
            school_id: props.school.id,
            teacher_email: '',
        })
        return {
            loading,
            form,
            invite_url,
            handleSubmit () {
                if(loading.value) return
                loading.value = true
                http.post('/invitations', toRaw(form)).then(({data}) => {
                   invite_url.value = data.url 
                }).finally(() => loading.value = false)
            }
        }
    }
}
</script>
