<template>
  <v-app>
    <NavBar />
    <div class="maincontent">
      <h1 style="margin-bottom: 25px">
        {{ isEdit ? "Update Your Recipe" : "Submit Your Recipe" }} &#128522;
      </h1>
      <v-form v-model="valid" ref="form">
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
              :rules="[rules.number]"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-col>
              <v-btn @click="submitForm" color="primary">
                {{ isEdit ? "Update" : "Submit" }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
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
    !/^\d+$/.test(value) || "Title must not be purely numeric.",
};

const fetchRecipe = async () => {
  if (isEdit) {
    const id = route.params.id;
    try {
      const responseObject = await store.fetchRecipeById(id);
      recipe.value = responseObject;
      console.log(responseObject);
    } catch (err) {
      console.error("Failed to fetch recipe", err);
    }
  }
};

const submitForm = async () => {
  const isValid = await ref.form.validate();

  if (isValid) {
    if (isEdit) {
      await store.updateRecipe(route.params.id, recipe.value);
    } else {
      await store.createRecipe(recipe.value);
    }
    router.push("/");
  }
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
</style>
