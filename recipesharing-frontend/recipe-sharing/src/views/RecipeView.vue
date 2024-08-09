<template>
  <v-app>
    <NavBar />
    <div class="maincontent">
      <v-card class="recipe-card" width="900" max-height="1000" centered>
        <v-card-title class="headline">{{ recipe.title }}</v-card-title>

        <v-card-subtitle>By: {{ recipe.user_name }}</v-card-subtitle>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-subheader class="text-h7 font-weight-bold mb-2"
                >Description</v-subheader
              >
              <v-card-text>{{ recipe.description }}</v-card-text>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-subheader class="text-h7 font-weight-bold mb-2"
                >Ingredients</v-subheader
              >
              <v-card-text>{{ recipe.ingredients }}</v-card-text>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-subheader class="text-h7 font-weight-bold mb-2"
                >Instructions</v-subheader
              >
              <v-card-text>{{ recipe.instructions }}</v-card-text>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-subheader class="text-h7 font-weight-bold mb-2"
                >Cooking Time</v-subheader
              >
              <v-card-text>{{ recipe.cooking_time }} minutes</v-card-text>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="router.go(-1)">Go Back</v-btn>
        </v-card-actions>
      </v-card>
      <ReviewCard />
    </div>
  </v-app>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import ReviewCard from "@/components/ReviewCard.vue";
import { useRecipeStore } from "@/stores/recipeStore";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const recipeStore = useRecipeStore();
const recipe = ref({});

onMounted(async () => {
  recipe.value = await recipeStore.fetchRecipeById(route.params.id);
});
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
  overflow-y: auto;
  margin-bottom: 20px;
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
