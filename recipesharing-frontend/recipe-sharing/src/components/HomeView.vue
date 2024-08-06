<template>
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
</template>

<script setup>

</script>

<style>
.maincontent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}

v-row {
  display: flex;
  justify-content: center;
}

.mb-4 {
  margin-bottom: 10px;
}
</style>
