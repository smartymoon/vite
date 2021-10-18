<template>
<div class="grid grid-cols-5 gap-4">
    <div class="col-span-3">
        <school-list class="mb-4" v-if="schools.length > 0" :schools="schools" @change="handleSchoolChange" />
        <div v-else>
            You don't have a school, create one first
        </div>
        <people-list @chat="handleChat" :people="people" v-if="schools.length > 0" />
    </div>
    <div class="col-span-2">
        <school-form  class="mb-6" @created="handleSchoolCreated" />
        <student-form class="mb-6" @created="handleStudentCreated" v-if="current_school" :school="current_school" />
        <invite-form  v-if="current_school" :school="current_school" />
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >

            <div
              class="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl border"
            >
            <div class="flex justify-between">
                <div>Chat</div>
                <div @click="closeModal" class="mb-3 text-gray-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
                <Chat :talk-to="talk_to_name" :me="{id: $store.state.user.id, role: 'teacher'}" :another="{id: talk_to_id, role: 'student'}" />  
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</div>
</template>

<script>
import SchoolForm from './components/SchoolForm.vue'
import StudentForm from './components/StudentForm.vue'
import InviteForm from './components/InviteForm.vue'
import SchoolList from './components/SchoolList.vue'
import PeopleList from '../../components/PeopleList.vue'
import http from '../../http'
import { ref, onMounted, computed } from 'vue'
import Chat from '../../components/Chat.vue'
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
} from "@headlessui/vue";
import store from '../../store'
export default {
    components: {
        InviteForm,
        SchoolForm,
        StudentForm,
        SchoolList,
        PeopleList,
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionRoot,
        TransitionChild,
        Chat,
    },
    setup() {
        const schools = ref([])
        const current_school = ref(null)
        const isOpen = ref(false);
        const talk_to_id = ref(null)
        const talk_to_name = ref(null)
        onMounted(() => {
            http.get('schools').then(data => {
                schools.value = data
                if (data.length > 0 && data[0].if_approve) {
                    current_school.value = data[0]
                    store.dispatch('getStudentsOfSchool', data[0].id)
                }
                
            })
        })
        return {
            schools,
            people: computed(() => store.state.people),
            current_school,
            isOpen,
            talk_to_id,
            talk_to_name,
            closeModal() {
                isOpen.value = false
            },
            openModal() {
                isOpen.value = true
            },
            handleSchoolChange(school) {
                current_school.value = school
                store.dispatch('getStudentsOfSchool', school.id)
            },
            handleSchoolCreated(school) {
                schools.value.push(school)
            },
            handleStudentCreated(student) {
                store.commit('pushStudent', student)
            },
            handleChat(user_id, user_name) {
                talk_to_id.value = user_id 
                talk_to_name.value = user_name
                isOpen.value = true
            }
        }
    }
}
</script>
