<template>
<div class="border p-3 rounded flex flex-col h-full max-h-96 md:max-h-full" v-if="talkTo" >
    <h2 class="text-lg border-b pb-2">Chat with {{ talkTo }}</h2>
    <div class="overflow-y-scroll p-3 mt-3 flex flex-col-reverse h-full flex-auto" style="height: 600px; ">
        <div v-if="talks.length > 0">
            <div v-for="message in talks" :key="message.id" :class="['flex my-3 items-top space-x-2', message.mine ? 'flex-row-reverse space-x-reverse' : 'justify-start']" >
                <img class="h-8 w-8 rounded-full" :src="message.mine ? avatars[0] : avatars[1]" alt="" />
                <div>
                    <div class="text-sm bg-blue-300 rounded-lg px-2 py-1 text-white max-w-xs">
                        {{ message.message }}
                    </div>
                    <p class="text-gray-300 text-xs" :class="message.mine ? 'text-right': ''">{{ message.created_at }}</p>
                </div>
            </div>
        </div>
        <div v-else class="text-center mt-20 text-gray-400 text-xl">
            no messages
        </div>
    </div>

    <div class="relative flex items-center mt-3">
      <input v-on:keyup.enter="handleSent" autofocus v-model="current_message" placeholder="write message here" type="text" name="search" id="search" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md" />
      <div @click="handleSent" class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 cursor-pointer">
        <div v-if="loading" class="text-gray-900 flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        <kbd v-else class="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400 bg-gray-200">
           Send
        </kbd>
      </div>
    </div>
</div>
<div v-else class="text-center mt-20 text-gray-400 text-xl">
    pick a {{ another.role }} to have a chat
</div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from '@vue/runtime-core'
import { watch } from '@vue/runtime-core'
import http from '../http'
import {useStore} from 'vuex'
const avatars = [
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
]
export default {
    props: {
        talkTo: {
            type: String,
            required: true
        },
        me: {
            type: Object,
            required: true
        },
        another: {
            type: Object,
            required: true
        },
    },
    setup(props) {
        const store = useStore()
        const talks = ref([]);
        const current_message = ref('')
        const loading = ref(false)
        watch(() => store.getters.newMessage, ({message}) => {
            if (!message) return
            if (message.from_id === +props.another.id) {
                talks.value.push({
                    id: message.id,
                    message: message.message,
                    mine: false,
                    created_at: message.created_at
                })
                http.put('/message/' + props.me.role + '/' +  message.id + '/read').then(() => {
                    console.log('message ' + message.id + ' seen')
                })
            }
        })
        const getMessageHistory = () => {
            if (!props.another.id) return
            store.commit('talkingTo', props.another.id)
            http.get('/messages/' + props.me.role + '/' + props.another.id).then(data => {
                talks.value = data.map((item) => {
                    return {
                        id: item.id,
                        message: item.message,
                        mine: item.from_id === props.me.id && item.from_type === props.me.role,
                        created_at: item.created_at
                    }            
                })
            })
        }
        onMounted(() => {
            getMessageHistory()
        })
        watch(() => props.another.id, () => {
            getMessageHistory()
        })
        return {
            avatars,
            talks,
            current_message,
            loading,
            handleSent() {
                if (!current_message.value || loading.value) return;
                loading.value = true
                http.post('messages/' + props.me.role, {
                    toId: props.another.id,
                    message: current_message.value
                }).then(({data}) => {
                    current_message.value = ''
                    talks.value.push({
                        id: data.id,
                        message: data.message,
                        mine: true,
                        created_at: data.created_at
                    })
                }).finally(() => loading.value = false)

            }
        }
    }
}
</script>