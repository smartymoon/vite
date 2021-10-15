<template>
<div class="grid grid-cols-4 gap-4">
    <div class="col-span-2">
        <people-list :people="people" />
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
export default {
    components: {
        PeopleList
    },
    setup() {
        const people = ref([])
        onMounted(() => {
            http.get('students/teachers').then(teachers => {
                people.value = teachers
            })
        })
        return {
            people,
        }
    }
}
</script>
