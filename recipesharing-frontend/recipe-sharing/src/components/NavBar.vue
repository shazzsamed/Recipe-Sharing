<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/lego/8.jpg"
        title="name"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-folder"
        title="Feed "
        value="feed"
        @click="goFeed"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Your Recipes"
        value="recipes"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="Logout"
        value="logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import router from "@/router";

const goFeed = () => {
  router.push("/");
};
</script>
