<template>
  <v-app>
    <NavBar />
    <div
      v-if="recipeStore.loading"
      style="display: flex; justify-content: center"
    >
      <h1>Loading...</h1>
    </div>
    <div v-else class="maincontent">
      <v-text-field
        v-model="recipeStore.searchQuery"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        width="80%"
        @input="recipeStore.searchRecipes(recipeStore.searchQuery, props.view)"
      ></v-text-field>
      <v-col cols="10" md="10">
        <div class="mb-4">
          <v-empty-state
            v-if="recipeStore.recipes.length === 0"
            :icon="props.view == 'Home' ? 'mdi-magnify' : 'mdi-chef-hat'"
            :text="
              props.view == 'Home'
                ? 'Try adjusting your search terms or filters.'
                : ''
            "
            :title="
              props.view == 'Home'
                ? 'We could not find a match.'
                : 'Oops !!! Can\'t find anything'
            "
          ></v-empty-state>
          <v-card
            class="mb-4"
            v-for="recipe in recipeStore.recipes"
            :key="recipe.id"
            variant="elevated"
            min-height="140"
            image="https://c8.alamy.com/comp/MC2J3P/cooking-background-herbs-salt-spices-olive-oil-white-background-copy-space-top-view-MC2J3P.jpg"
          >
            <v-card-title>{{ recipe.title }}</v-card-title>
            <v-card-subtitle>By: {{ recipe.user_name }}</v-card-subtitle>
            <v-card-text>{{ recipe.description }}</v-card-text>
            <v-rating
              :model-value="parseFloat(recipe.average_rating)"
              max="5"
              class="ml-3"
              color="success"
              :half-increments="true"
              readonly
              density="compact"
            ></v-rating>
            <v-chip size="x-small" class="mb-4" color="primary"
              >({{ parseFloat(recipe.average_rating).toPrecision(2) }})
            </v-chip>
            <v-card-actions>
              <v-btn @click="openRecipe(recipe.id)">Open</v-btn>
              <v-btn
                v-if="props.view === 'Personal'"
                @click="updateRecipe(recipe.id)"
                color="yellow"
                >Update</v-btn
              >
              <v-btn
                v-if="props.view === 'Personal'"
                @click="deleteRecipe(recipe.id)"
                color="red"
                >Delete</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </div>
    <v-pagination
      v-if="props.view == 'Home' && !recipeStore.searchQuery"
      v-model="page"
      :length="recipeStore.meta.length"
      :total-visible="4"
      @click="paginateRecipes"
    ></v-pagination>
  </v-app>
  <button @click="createNewRecipe" class="bottom-right-btn">
    Create Recipe
  </button>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import { onMounted, defineProps, ref, watch } from "vue";
import { useRecipeStore } from "@/stores/recipeStore";
import { useRoute } from "vue-router";

const recipeStore = useRecipeStore();
const page = ref(1);
const route = useRoute();

const props = defineProps({
  view: {
    type: String,
  },
});

const paginateRecipes = async () => {
  await recipeStore.fetchRecipes(props.view, page.value);
  router.push({ query: { page: page.value } });
};

onMounted(async () => {
  await recipeStore.fetchRecipes(props.view);
});

watch(
  () => route.query.page,
  (newPage) => {
    page.value = parseInt(newPage) || 1;
    paginateRecipes();
  },
  { immediate: true }
);

const openRecipe = (id) => {
  router.push(`/recipe/${id}`);
};

const createNewRecipe = () => {
  router.push("/create");
};

const updateRecipe = async (id) => {
  router.push(`/update/${id}`);
};

const deleteRecipe = async (id) => {
  if (confirm("Are you sure you want to delete this recipe?")) {
    await recipeStore.deleteRecipe(id);
    await recipeStore.fetchRecipes(props.view);
  }
};
</script>

<style>
.bottom-right-btn {
  background-color: #898888;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(255, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  position: fixed;
  bottom: 10%;
  right: 10%;
}

.bottom-right-btn:hover {
  background-color: #aca9aa;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transform: translateY(-3px);
}
</style>
