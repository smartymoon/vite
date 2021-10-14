<template>
<div>
  <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">
      Pricing schools
    </RadioGroupLabel>
    <div class="relative bg-white rounded-md -space-y-px">
      <RadioGroupOption as="template" v-for="(school, schoolIdx) in schools" :key="school.name" :value="school" v-slot="{ checked, active }" :disabled="! (school.if_approve)">
        <div :class="[schoolIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', schoolIdx === schools.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200', 'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none']">
          <div class="flex items-center text-sm">
            <span :class="[checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-indigo-500' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']" aria-hidden="true">
              <span class="rounded-full bg-white w-1.5 h-1.5" />
            </span>
            <RadioGroupLabel as="span" :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'ml-3 font-medium']">{{ school.name }}</RadioGroupLabel>
          </div>
          <RadioGroupDescription class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
            {{ school['created_at'] }}
          </RadioGroupDescription>
          <RadioGroupDescription :class="[checked ? 'text-indigo-700' : 'text-gray-500', 'flex justify-end gap-2 ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right']">
            {{ school.if_approve ? 'approved' : 'approving'}}
            <svg v-if="school.if_approve" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </RadioGroupDescription>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</div>
</template>

<script>
import { ref, watch } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

export default {
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
  },
  props: {
    schools: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const selected = ref(props.schools[0])
    watch(selected, (school) => {
      emit('change', school)
    })

    return {
      selected,
    }
  },
}
</script>