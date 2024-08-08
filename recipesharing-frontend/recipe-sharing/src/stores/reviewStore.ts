import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useReviewStore = defineStore("reviewStore", () => {
  const reviews = ref([]);

  const fetchReviews = async (recipeId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/reviews/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      reviews.value = response.data;
    } catch (err: any) {
      console.log(err.messages);
    }
  };

  const fetchAverage = async (recipeId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/rating/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(response.data.avg);
      return response.data.avg;
    } catch (err: any) {
      console.log(err.messages);
    }
  };

  const createReview = async (review: {
    rating: number;
    comment: string;
    username: string;
    date: string;
    recipeId: string;
  }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/reviews`,
        review,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      reviews.value.push(response.data);
      return response.data;
    } catch (err: any) {
      return err.response.data.message.errors[0].message;
    }
  };

  return {
    reviews,
    fetchReviews,
    createReview,
    fetchAverage,
  };
});
