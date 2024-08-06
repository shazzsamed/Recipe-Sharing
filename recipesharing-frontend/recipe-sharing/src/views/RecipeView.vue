<template>
  <v-app>
    <NavBar />
    <div class="maincontent">
      <v-card class="recipe-card" max-width="600" centered>
        <v-card-title class="headline">{{ recipe.title }}</v-card-title>

        <v-card-subtitle>User ID: {{ recipe.user_id }}</v-card-subtitle>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-subheader>Description</v-subheader>
              <v-card-text>{{ recipe.description }}</v-card-text>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-subheader>Ingredients</v-subheader>
              <v-card-text>{{ recipe.ingredients }}</v-card-text>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-subheader>Instructions</v-subheader>
              <v-card-text>{{ recipe.instructions }}</v-card-text>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-subheader>Cooking Time</v-subheader>
              <v-card-text>{{ recipe.cooking_time }} minutes</v-card-text>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="goBack">Go Back</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { useRecipeStore } from "@/stores/recipeStore";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const recipeStore = useRecipeStore();
const recipe = ref({});

onMounted(async () => {
  let recipeId = route.params.id;
  recipe.value = await recipeStore.fetchRecipeById(recipeId.slice(1));
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.maincontent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}

.recipe-card {
  padding: 20px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recipe-card .headline {
  font-size: 24px;
  font-weight: bold;
}

.recipe-card .v-subheader {
  font-weight: bold;
  margin-top: 16px;
}

.v-card-text {
  margin-bottom: 16px;
}
</style>
