<template>
  <router-view></router-view>
  <Notification />
</template>

<script setup>
import Notification from './components/Notification.vue';
import Pusher from "pusher-js"


</script>
