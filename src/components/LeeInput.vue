<template>
    <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <div class="mt-1 relative">
            <input 
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                :type="type"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                :placeholder="placeholder" 
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                v-if="errors.length > 0">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
        </div>
        <template v-if="errors.length > 0">
            <p v-for="(error, k) in errors" :key="k" class="mt-2 text-sm text-red-600" id="email-error">
                {{ error }}
            </p>
        </template>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    components: {
        ExclamationCircleIcon,
    },
    setup(props) {
        const store = useStore()
        return {
            errors: computed(() => {
                return store.getters.getErrors[props.name] || []
            })
        }
    }
}
</script>