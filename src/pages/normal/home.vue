<template>
<div class="grid grid-cols-4 gap-4">
    <div class="col-span-2">
        <student-list  :people="people" />
    </div>
    <div class="col-span-2">
        chat here
    </div>
</div>
</template>

<script>
import StudentList from '../../components/StudentList.vue'
import http from '../../http'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        StudentList
    },
    setup() {
        const people = ref([])
        const store = useStore()
        const school_id = store.getters.getNormalTeacherSchoolId
        onMounted(() => {
            http.get(`/schools/${school_id}/students`).then(students => {
                people.value = students
            })
        })
        return {
            people,
        }
    }
}
</script>
