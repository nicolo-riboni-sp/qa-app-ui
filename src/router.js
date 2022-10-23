import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/users",
    name: "users",
    component: () => import("./components/UsersList.vue")
  },
  {
    path: "/users/:id",
    name: "user-details",
    component: () => import("./components/UserDetail.vue")
  },
  {
    path: "/create",
    name: "create",
    component: () => import("./components/CreateUser.vue")
  },
  {
    path: "/transfer/:id",
    name: "make-transfer",
    component: () => import("./components/MakeTransfer.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;