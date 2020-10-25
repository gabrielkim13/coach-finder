import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import CoachesList from "@/views/coaches/CoachesList.vue";
import CoachDetails from "@/views/coaches/CoachDetails.vue";
import CoachRegister from "@/views/coaches/CoachRegister.vue";
import ContactCoach from "@/views/requests/ContactCoach.vue";
import RequestsList from "@/views/requests/RequestsList.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/coaches"
  },
  {
    path: "/coaches",
    name: "CoachesList",
    component: CoachesList,
    children: [
      {
        path: "/register",
        name: "CoachRegister",
        component: CoachRegister
      }
    ]
  },
  {
    path: "/coaches/:id",
    name: "CoachDetails",
    component: CoachDetails,
    children: [
      {
        path: "/contact",
        name: "ContactCoach",
        component: ContactCoach
      }
    ]
  },
  {
    path: "/requests",
    name: "RequestsList",
    component: RequestsList
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
