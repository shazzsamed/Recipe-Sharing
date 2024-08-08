import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useRecipeStore = defineStore("recipeStore", () => {
  const recipes = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchQuery = ref("");

  const searchRecipes = async (query) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/search`,
        {
          params: { q: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      recipes.value = response.data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchRecipes = async (view: String) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/recipes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const allRecipes = response.data;

      if (view === "Personal") {
        const userId = localStorage.getItem("userId");
        recipes.value = allRecipes.filter((recipe) => recipe.user_id == userId);
      } else {
        recipes.value = allRecipes;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch recipes";
    } finally {
      loading.value = false;
    }
  };

  const fetchRecipeById = async (recipeId: String) => {
    loading.value = true;
    error.value = null;
    try {
      console.log(`${import.meta.env.VITE_APP_URL}/recipes/${recipeId}`);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/recipes/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("update response", response.data);
      return response.data;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch recipes";
    } finally {
      loading.value = false;
    }
  };

  const createRecipe = async (recipe: any) => {
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
      return response.data;
    } catch (err: any) {
      error.value = err.message || "Failed to create recipe";
    } finally {
      loading.value = false;
    }
  };

  const updateRecipe = async (id: String, updatedRecipe: Object) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_URL}/recipes/${id}`,
        updatedRecipe,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating recipe:", error);
      throw error;
    }
  };

  const deleteRecipe = async (id: String) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_URL}/recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
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
    searchRecipes,
    fetchRecipes,
    createRecipe,
    fetchRecipeById,
    updateRecipe,
    deleteRecipe,
  };
});
