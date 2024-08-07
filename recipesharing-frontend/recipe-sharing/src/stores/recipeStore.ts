import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useRecipeStore = defineStore("recipeStore", () => {
  const recipes = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchQuery = ref("");

  const filteredRecipes = computed(() => {
    return recipes.value.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const fetchRecipes = async (view) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/recipes`
      );
      const allRecipes = response.data;

      if (view === "Personal") {
        const userId = localStorage.getItem("userId");
        recipes.value = allRecipes.filter((recipe) => recipe.user_id == userId);
      } else {
        recipes.value = allRecipes;
      }
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
      console.log("update response", response.data);
      return response.data;
    } catch (err) {
      error.value = err.message || "Failed to fetch recipes";
    } finally {
      loading.value = false;
    }
  };

  const createRecipe = async (recipe: any) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/recipes`,
        recipe,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      recipes.value.push(response.data);
    } catch (err) {
      error.value = err.message || "Failed to create recipe";
    } finally {
      loading.value = false;
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_URL}/recipes/${id}`,
        updatedRecipe
      );
      return response.data;
    } catch (error) {
      console.error("Error updating recipe:", error);
      throw error;
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_URL}/recipes/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting recipe:", error);
      throw error;
    }
  };

  return {
    recipes,
    loading,
    error,
    searchQuery,
    filteredRecipes,
    fetchRecipes,
    createRecipe,
    fetchRecipeById,
    updateRecipe,
    deleteRecipe,
  };
});
