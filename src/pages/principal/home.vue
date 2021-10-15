<template>
<div class="grid grid-cols-5 gap-4">
    <div class="col-span-3">
        <school-list class="mb-4" v-if="schools.length > 0" :schools="schools" @change="handleSchoolChange" />
        <people-list  :people="people" />
    </div>
    <div class="col-span-2">
        <school-form  class="mb-6" @created="handleSchoolCreated" />
        <student-form class="mb-6" @created="handleStudentCreated" v-if="current_school" :school="current_school" />
        <invite-form  v-if="current_school" :school="current_school" />
    </div>
</div>
</template>

<script>
import SchoolForm from './components/SchoolForm.vue'
import StudentForm from './components/StudentForm.vue'
import InviteForm from './components/InviteForm.vue'
import SchoolList from './components/SchoolList.vue'
import PeopleList from '../../components/PeopleList.vue'
import http from '../../http'
import { ref, onMounted } from 'vue'
export default {
    components: {
        InviteForm,
        SchoolForm,
        StudentForm,
        SchoolList,
        PeopleList
    },
    setup() {
        const people = ref([])
        const schools = ref([])
        const current_school = ref(null)
        onMounted(() => {
            http.get('schools').then(data => {
                schools.value = data
                if (data.length > 0) {
                    current_school.value = data[0]
                    http.get(`/schools/${data[0].id}/students`).then(students => {
                        people.value = students
                    })
                }
                
            })
        })
        return {
            people,
            schools,
            current_school,
            handleSchoolChange(school) {
                current_school.value = school
                http.get(`/schools/${school.id}/students`).then(students => {
                    people.value = students
                })
            },
            handleSchoolCreated(school) {
                schools.value.push(school)
                current_school.value = school
            },
            handleStudentCreated(student) {
                people.value.unshift(student)
            }
        }
    }
}
</script>
