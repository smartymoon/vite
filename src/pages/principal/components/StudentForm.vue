<template>
  <form @submit.prevent class="border rounded bg-gray-50 p-4">
    <h2 class="mb-4">Add Student</h2>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700">School (Pick a school on left side)</label>
      <div type="text" readonly class="mt-2 shadow-sm  block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"> {{ school.name }} </div>
    </div>
    <lee-input label="Student Name" placeholder="input student name" name="student_name" v-model="form.student_name" />
    <lee-input label="Email" placeholder="input student email" name="student_email" v-model="form.student_email" />
    <lee-input label="Password" placeholder="Input password" name="password" v-model="form.password" type="password" />
    <lee-input label="Password Confrim" placeholder="input password again" name="password_confirmation" v-model="form.password_confirmation"  type="password" />
    <div class="flex justify-end">
      <lee-button text="Add" @click="handleSubmit" :loading="loading" />
    </div>
  </form>
</template>

<script>
import { reactive, ref, toRaw } from '@vue/reactivity'
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
    setup(props, {emit}) {
        const store = useStore()
        const loading = ref(false)
        const form = reactive({
            school_id: props.school.id,
            student_name: '',
            student_email: '',
            password: '',
            password_confirmation: '',
        })
        return {
            form,
            loading,
            handleSubmit () {
                if(loading.value) return
                loading.value = true
                http.post('/students', toRaw(form)).then(({data}) => {
                  emit('created', data)
                }).finally(() => loading.value = false)
            }
        }
    }
}
</script>
