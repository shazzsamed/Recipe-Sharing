<template>
  <v-app>
    <NavBar />
    <div class="maincontent">
      <h1 style="margin-bottom: 25px">
        {{ isEdit ? "Update Your Recipe" : "Submit Your Recipe" }} &#128522;
      </h1>
      <v-form v-model="valid" ref="formRef" @submit.prevent="submitForm">
        <v-container>
          <v-row>
            <v-text-field
              v-model="recipe.title"
              width="800"
              label="Title"
              required
              :rules="[rules.required, rules.notPurelyNumeric]"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="recipe.description"
              label="Description"
              required
              :rules="[rules.required]"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-textarea
              v-model="recipe.ingredients"
              label="Ingredients"
              rows="4"
              placeholder="Enter each ingredient on a new line"
              :rules="[rules.required]"
            ></v-textarea>
          </v-row>

          <v-row>
            <v-textarea
              v-model="recipe.instructions"
              label="Instructions"
              rows="6"
              :rules="[rules.required]"
            ></v-textarea>
          </v-row>

          <v-row>
            <v-text-field
              v-model="recipe.cooking_time"
              label="Cooking Time (minutes)"
              type="number"
              required
              :rules="[rules.required, rules.number]"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-col>
              <v-btn type="submit" color="primary">
                {{ isEdit ? "Update" : "Submit" }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <span class="error">{{ createError }} </span>
      </v-form>
    </div>
  </v-app>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { useRecipeStore } from "@/stores/recipeStore";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useRecipeStore();
const route = useRoute();
const router = useRouter();
const createError = ref("");
const formRef = ref(null);

const recipe = ref({
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  cooking_time: null,
  user_id: localStorage.getItem("userId"),
  user_name: localStorage.getItem("username"),
});

const valid = ref(false);
const isEdit = route.params.id !== undefined;

const rules = {
  required: (value) => !!value || "Required.",
  number: (value) => !isNaN(value) || "Must be a number.",
  notPurelyNumeric: (value) =>
    /[a-zA-Z0-9]+/.test(value) || "Title must not be purely numeric.",
};

const fetchRecipe = async () => {
  if (isEdit) {
    const id = route.params.id;
    try {
      const responseObject = await store.fetchRecipeById(id);
      if (responseObject.user_id != localStorage.getItem("userId")) {
        router.push("/403");
        return;
      }
      recipe.value = responseObject;
    } catch (err) {
      console.error("Failed to fetch recipe", err);
      router.push("/");
    }
  }
};

const submitForm = async () => {
  const isValid = await formRef.value.validate();

  if (isValid.valid) {
    if (isEdit) {
      await store.updateRecipe(route.params.id, recipe.value);
    } else {
      await store.createRecipe(recipe.value);
    }
    clearInputs();
    router.push("/").then(() => {
      window.location.reload();
    });
  } else {
    createError.value = "Form validation failed.";
  }
};

const clearInputs = () => {
  recipe.value = {
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cooking_time: null,
  };
};

onMounted(() => {
  fetchRecipe();
});
</script>

<style>
.maincontent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}

.v-textarea {
  resize: vertical;
}

.error {
  color: red;
  font-size: 15px;
  margin-top: 5px;
  display: block;
  text-align: center;
}
</style>
