<template>
<div class="border rounded bg-gray-50 p-4">
  <h2 class="mb-4">Create School</h2>
  <lee-input label="School Name" placeholder="Input School Name" name="school_name" v-model="school_name" />
  <div class="flex justify-end">
    <LeeButton text="Apply" @click="handleSubmit" :loading="loading" />
  </div>
</div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
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
    setup(props, {emit}) {
        const loading = ref(false)
        const store = useStore()
        const school_name = ref('')
        const errors = computed(() => store.getters.getErrors)
        return {
            school_name,
            errors,
            loading,
            handleSubmit () {
                if (loading.value) return
                loading.value = true
                http.post('/schools', {school_name: school_name.value}).then(({data}) => {
                  emit('created', data)
                }).finally(() => loading.value = false)
            }
        }
    }

}
</script>
