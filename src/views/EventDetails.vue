<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService.js'

const props = defineProps({
  id: {
    required: true,
  },
})

const event = ref(null)

onMounted(async () => {
  try {
    const response = await EventService.getEvent(props.id)
    console.log(response)
    event.value = response.data
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
