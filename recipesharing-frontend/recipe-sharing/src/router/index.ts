import NotFound from "@/components/NotFound.vue";
import CreateView from "@/views/CreateView.vue";
import LoginPage from "@/views/LoginPage.vue";
import RecipeView from "@/views/RecipeView.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import UserDashboard from "@/views/UserDashboard.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: UserDashboard,
    props: { view: "Home" },
  },
  {
    path: "/myrecipes",
    name: "PersonalDashboard",
    component: UserDashboard,
    props: { view: "Personal" },
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
  {
    path: "/update/:id",
    name: "UpdateRecipe",
    component: CreateView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("authToken");

  const authRequiredRoutes = ["Dashboard", "Create", "Recipe"];

  if (authRequiredRoutes.includes(to.name) && !token) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
