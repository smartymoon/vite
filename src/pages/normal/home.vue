<template>
<div class="md:grid grid-cols-4 gap-4">
    <div class="col-span-2">
        <people-list :people="people" @chat="handleChat" />
    </div>
    <div class="mt-3 md:mt-0 col-span-2">
        <Chat :talk-to="chat_name" :me="{id: $store.state.user.id, role:'teacher'}"  :another="{id: another_id, role:'student'}"/>
    </div>
</div>
</template>

<script>
import PeopleList from '../../components/PeopleList.vue'
import Chat from '../../components/Chat.vue'
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router' 
import { useStore  } from 'vuex'
export default {
    props: {
        chat_user_id: {
            type: String,
            required: false
        },
        chat_user_name: {
            type: String,
            required: false
        }
    },
    components: {
        PeopleList,
        Chat
    },
    setup(props) {
        const store = useStore()
        const another_id = ref(props.chat_user_id || null)
        const chat_name = ref(props.chat_user_name || '')
        const router = useRouter()

        store.dispatch('getStudentsOfSchool')
        store.commit('talkingTo', +props.chat_user_id)
        watch(() => props.chat_user_id, (id) => {
            another_id.value = +id
        })
        watch(() => props.chat_user_name, (name) => {
            chat_name.value = name
        })
        return {
            another_id,
            chat_name,
            people: computed(() => store.state.people),
            handleChat(user_id, user_name) {
                router.replace({ path: '/normal/home', query: {
                    chat_user_id: user_id,
                    chat_user_name: user_name
                }})
            }
        }
    }
}
</script>
