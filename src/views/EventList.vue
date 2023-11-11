<script setup>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
import { ref, onMounted, computed, watchEffect } from "vue";

//const events = ref(null);
const props = defineProps(["page"]);
const events = ref("");
const page = computed(() => {
  return props.page;
});
const eventsNumber = ref(0);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(eventsNumber.value / 3);
  return page.value < totalPages;
});

onMounted(() => {
  watchEffect(async () => {
    events.value = "";
    try {
      const response = await EventService.getEvents(3, page.value);
      events.value = response.data;
      eventsNumber.value = response.headers["x-total-count"];
    } catch (err) {
      console.log(err);
    }
  });
});
</script>

<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Previous
      </RouterLink>

      <RouterLink
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next &#62;
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
  margin-top: 20px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
