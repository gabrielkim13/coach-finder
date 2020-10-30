import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import CoachesList from "@/views/coaches/CoachesList.vue";
import CoachDetails from "@/views/coaches/CoachDetails.vue";
import ContactCoach from "@/views/requests/ContactCoach.vue";
import RequestsList from "@/views/requests/RequestsList.vue";

import store from "@/store";

// Async components for routes that are used at most once.
const CoachRegister = defineAsyncComponent(() =>
  import("@/views/coaches/CoachRegister.vue")
);
const UserAuth = defineAsyncComponent(() => import("@/views/UserAuth.vue"));
const NotFound = defineAsyncComponent(() => import("@/views/NotFound.vue"));

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/coaches"
  },
  {
    path: "/coaches",
    name: "CoachesList",
    component: CoachesList
  },
  {
    path: "/coaches/:id",
    name: "CoachDetails",
    component: CoachDetails,
    props: true,
    children: [
      {
        path: "contact",
        name: "ContactCoach",
        component: ContactCoach
      }
    ]
  },
  {
    path: "/register",
    name: "CoachRegister",
    component: CoachRegister,
    meta: { requiresAuth: true }
  },
  {
    path: "/requests",
    name: "RequestsList",
    component: RequestsList,
    meta: { requiresAuth: true }
  },
  {
    path: "/auth",
    name: "UserAuth",
    component: UserAuth,
    meta: { requiresNotAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"])
    return next("/auth");

  if (to.meta.requiresNotAuth && store.getters["auth/isAuthenticated"])
    return next("/coaches");

  return next();
});

export default router;
