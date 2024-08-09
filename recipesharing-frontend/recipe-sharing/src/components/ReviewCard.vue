<template>
  <v-card min-width="800" class="pa-4">
    <v-card-title>Reviews & Comments</v-card-title>
    <v-divider></v-divider>

    <v-card-subtitle v-if="store.reviews.length === 0">
      No reviews yet.
    </v-card-subtitle>

    <v-card class="mt-10 pa-4" max-height="1000" style="overflow: auto">
      <v-card-title>Add Review</v-card-title>
      <v-form @submit.prevent="submitReview">
        <v-text-field
          v-model="newReview.comment"
          label="Your Comment"
          required
        ></v-text-field>

        <v-rating
          v-model="newReview.rating"
          color="yellow"
          label="Your Rating"
          dense
          required
          :hover="true"
        ></v-rating>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary">Submit Review</v-btn>
      </v-form>
      <span class="error">{{ reviewError }} </span>

      <v-card
        v-for="review in store.reviews"
        :key="review.id"
        class="my-4 pa-4"
      >
        <v-card-title>
          <span>{{ review.user_name }}</span>
          <v-spacer></v-spacer>
          <v-rating
            v-model="review.rating"
            max="5"
            color="success"
            half-increments="true"
            readonly
            density="compact"
          ></v-rating>
        </v-card-title>
        <v-card-subtitle>{{
          new Date(review.created_at).toLocaleString()
        }}</v-card-subtitle>
        <v-card-text>{{ review.comment }}</v-card-text>
      </v-card>
    </v-card>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useReviewStore } from "@/stores/reviewStore";

const route = useRoute();
const store = useReviewStore();
const reviewError = ref("");

const newReview = ref({
  comment: "",
  rating: 1,
});

const fetchReviews = async () => {
  const recipeId = route.params.id;
  await store.fetchReviews(recipeId);
};

const submitReview = async () => {
  if (newReview.value.comment) {
    const recipeId = route.params.id;
    const response = await store.createReview({
      ...newReview.value,
      recipe_id: Number(recipeId),
      user_id: Number(localStorage.getItem("userId")),
      user_name: localStorage.getItem("username"),
    });
    newReview.value = { comment: "", rating: null };
    await fetchReviews();
  } else {
    reviewError.value = "Fill Review Properly";
  }
};

onMounted(fetchReviews);
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}

.error {
  color: red;
  font-size: 15px;
  margin-top: 5px;
  display: block;
  text-align: center;
}
</style>
