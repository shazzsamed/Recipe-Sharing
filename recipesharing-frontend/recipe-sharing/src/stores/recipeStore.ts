import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useRecipeStore = defineStore("recipeStore", () => {
  const recipes = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchRecipes = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/recipes`
      );
      recipes.value = response.data;
    } catch (err) {
      error.value = err.message || "Failed to fetch recipes";
    } finally {
      loading.value = false;
    }
  };

  const fetchRecipeById = async (recipeId: any) => {
    loading.value = true;
    error.value = null;
    try {
      console.log(`${import.meta.env.VITE_APP_URL}/recipes/${recipeId}`);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/recipes/${recipeId}`
      );
      return response.data;
    } catch (err) {
      error.value = err.message || "Failed to fetch recipes";
    } finally {
      loading.value = false;
    }
  };

  const createRecipe = async (recipe) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/recipes`,
        recipe
      );
      recipes.value.push(response.data);
    } catch (err) {
      error.value = err.message || "Failed to create recipe";
    } finally {
      loading.value = false;
    }
  };

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    createRecipe,
    fetchRecipeById,
  };
});
