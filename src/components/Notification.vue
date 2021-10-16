
<template>
<NotificationGroup group="success">
  <div
    class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none"
  >
    <div class="w-full max-w-sm">
      <Notification
        v-slot="{ notifications, close }"
        enter="transform ease-out duration-300 transition"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="transition duration-500"
        move-delay="delay-300"
      >
        <div
          class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
          v-for="notification in notifications"
          :key="notification.id"
        >
        <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                    {{ notification.title }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                    {{ notification.text }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button  @click="close(notification.id)" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Notification>
    </div>
  </div>
</NotificationGroup>

<NotificationGroup group="error">
  <div
    class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none"
  >
    <div class="w-full max-w-sm">
      <Notification
        v-slot="{ notifications, close }"
        enter="transform ease-out duration-300 transition"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="transition duration-500"
        move-delay="delay-300"
      >
        <div
          class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
          v-for="notification in notifications"
          :key="notification.id"
        >
        <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <ExclamationCircleIcon class="h-6 w-6 text-red-600" aria-hidden="true"/>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                    {{ notification.title }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                    {{ notification.text }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button  @click="close(notification.id)" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Notification>
    </div>
  </div>
</NotificationGroup>

</template>

<script setup>
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
</script>
