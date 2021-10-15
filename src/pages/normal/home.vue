<template>
<div class="grid grid-cols-4 gap-4">
    <div class="col-span-2">
        <people-list  :people="people" />
    </div>
    <div class="col-span-2">
        chat here
    </div>
</div>
</template>

<script>
import PeopleList from '../../components/PeopleList.vue'
import http from '../../http'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        PeopleList
    },
    setup() {
        const people = ref([])
        const store = useStore()
        const school_id = store.state.user.school_id
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
