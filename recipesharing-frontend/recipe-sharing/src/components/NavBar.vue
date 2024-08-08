<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/lego/8.jpg"
        :title="userName"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home-heart"
        title="Feed "
        value="feed"
        @click="goFeed"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-chef-hat"
        title="Your Recipes"
        value="recipes"
        @click="goMyRecipes"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        value="logout"
        @click="userLogout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import router from "@/router";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

const userName = ref(localStorage.getItem("username"));

const { logout } = useUserStore();

const goFeed = () => {
  router.push("/").then(() => {
    window.location.reload();
  });
};

const goMyRecipes = () => {
  router.push("/myrecipes").then(() => {
    window.location.reload();
  });
};

const userLogout = () => {
  logout();
};
</script>
