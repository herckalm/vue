import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import About from "@/views/About.vue";
import EventDetails from "@/views/EventDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: (route) => ({
        page: parseInt(route.query.page) || 1,
      }),
    },
    {
      path: "/event/:id",
      name: "event-details",
      props: true,
      component: EventDetails,
    },
    {
      path: "/about",
      name: "about",
      component: About,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/About.vue'),
    },
  ],
});

export default router;
