<template>
  <div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
    <div class="relative max-w-xl mx-auto">
      <svg class="absolute left-full transform translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
        <defs>
          <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <svg class="absolute right-full bottom-0 transform -translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
        <defs>
          <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <div class="text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to {{ school }}
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">
          I am principal of {{ school }}, welcome to our school
        </p>
      </div>
      <div class="mt-12">
        <form @submit.prevent class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input id="email" disabled name="email" type="email" autocomplete="email" class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" :value="email" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <div class="mt-1">
              <input type="text" name="name" id="company" autocomplete="organization" 
                v-model="form.name"  
                placeholder="please input your real name"
                class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
            </div>
            <template v-if="errors['name']">
                <p v-for="(error, k) in errors.name" :key="k" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ error }}
                </p>
            </template>
          </div>
          <div class="sm:col-span-2">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input id="password" v-model="form.password" name="password" type="password"  class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
            </div>
            <template v-if="errors['password']">
                <p v-for="(error, k) in errors.password" :key="k" class="mt-2 text-sm text-red-600" id="email-error">
                    {{ error }}
                </p>
            </template>
          </div>
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Password Confirmation</label>
            <div class="mt-1">
              <input id="password_confirmation" v-model="form.password_confirmation" name="password_confirmation" type="password"  class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <lee-button text="Join Us" @click="handleSubmit" :loading="loading" class="w-full" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRaw, computed } from 'vue'
import http from '../../http'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import LeeButton from '../../components/LeeButton.vue'

export default {
  components: {
    LeeButton
  },
  setup() {
    const slug = useRoute().query.slug
    const school = ref('')
    const email = ref('')
    const store = useStore()
    const loading = ref(false)

    const errors = computed(() => {
        return store.getters.getErrors || []
    })

    const form = reactive({
        slug,  
        name: '',
        password: '',
        password_confirmation: '',
    })  
    onMounted(() => {
        http.get('invitations/' + slug).then(data => {
            school.value = data.school.name
            email.value = data.email
        })
    })  
    return {
        school,
        loading,
        email,
        form,
        errors,
        handleSubmit() {
            if(loading.value) return
            loading.value = true
            store.dispatch('normalTeacherLogin', toRaw(form)).finally(() => loading.value = false)
        }
    }
  },
}
</script>