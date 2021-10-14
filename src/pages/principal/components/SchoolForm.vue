<template>
<div class="border rounded bg-gray-50 p-4">
  <h2 class="mb-4">Create School</h2>
  <lee-input label="School Name" placeholder="Input School Name" name="school_name" v-model="school_name" />
  <div class="flex justify-end">
    <button @click="handleSubmit" type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Apply
    </button>
  </div>
</div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import LeeInput from '../../../components/LeeInput.vue'
import http from '../../../http'
export default {
    components: {
      ExclamationCircleIcon,
      LeeInput
    },
    setup(props, {emit}) {
        const store = useStore()
        const school_name = ref('')
        const errors = computed(() => store.getters.getErrors)
        return {
            school_name,
            errors,
            handleSubmit () {
                http.post('/schools', {school_name: school_name.value}).then(({data}) => {
                  emit('created', data)
                })
            }
        }
    }

}
</script>
