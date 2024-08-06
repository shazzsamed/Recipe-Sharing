<template>
  <v-app>
    <NavBar />
    <div class="maincontent">
      <h1 style="margin-bottom: 25px">Submit Your Recipe &#128522;</h1>
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-row>
            <v-text-field
              v-model="recipe.title"
              width="800"
              label="Title"
              required
              :rules="[rules.required]"
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
              v-model="recipe.cookingTime"
              label="Cooking Time (minutes)"
              type="number"
              required
              :rules="[rules.number]"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-col>
              <v-btn @click="submitForm" color="primary">Submit</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-app>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { onMounted } from "vue";
import { ref } from "vue";

const recipe = ref({
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  cookingTime: null,
});

const valid = ref(false);

const rules = {
  required: (value) => !!value || "Required.",
  number: (value) => !isNaN(value) || "Must be a number.",
};

const submitForm = () => {
  if (valid.value) {
    console.log("Form submitted:", recipe.value);
  }
};
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
