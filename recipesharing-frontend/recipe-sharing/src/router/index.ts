import CreateView from "@/views/CreateView.vue";
import RecipeView from "@/views/RecipeView.vue";
import UserDashboard from "@/views/UserDashboard.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: UserDashboard,
  },
  {
    path: "/create",
    name: "Create",
    component: CreateView,
  },
  {
    path: "/recipe/:id",
    name: "Recipe",
    component: RecipeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
