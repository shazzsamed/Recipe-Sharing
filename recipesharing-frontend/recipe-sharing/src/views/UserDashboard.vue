<template>
  <v-app>
    <NavBar />
    <div v-if="recipeStore.loading">Loading...</div>
    <div v-else class="maincontent">
      <SearchBar />
      <v-col cols="10" md="10">
        <div class="mb-4">
          <v-card
            v-for="recipe in recipeStore.recipes"
            :key="recipe.id"
            variant="elevated"
            min-height="140"
            image="https://c8.alamy.com/comp/MC2J3P/cooking-background-herbs-salt-spices-olive-oil-white-background-copy-space-top-view-MC2J3P.jpg"
          >
            <v-card-title>{{ recipe.title }}</v-card-title>
            <v-card-subtitle>User ID: {{ recipe.userId }}</v-card-subtitle>
            <v-card-text>{{ recipe.description }}</v-card-text>
            <v-card-actions>
              <v-btn @click="openRecipe(recipe.id)">Open</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </div>
  </v-app>
  <button @click="createNewRecipe" class="bottom-right-btn">
    Create Recipe
  </button>
</template>

<script setup>
import HomeView from "@/components/HomeView.vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import { useRecipeStore } from "@/stores/recipeStore";
import { onMounted, defineProps } from "vue";
import SearchBar from "@/components/SearchBar.vue";

const recipeStore = useRecipeStore();

const props = defineProps({
  view: {
    type: String,
  },
});

onMounted(async () => {
  if (props.view == "Personal") {
    await recipeStore.fetchRecipes();
  } else {
    await recipeStore.fetchRecipes();
  }
});

const openRecipe = (id) => {
  router.push(`/recipe/:${id}`);
  console.log("openRecipe");
};

const createNewRecipe = () => {
  router.push("/create");
};
</script>

<style>
.bottom-right-btn {
  position: absolute;
  bottom: 10%;
  right: 10%;
}
</style>
