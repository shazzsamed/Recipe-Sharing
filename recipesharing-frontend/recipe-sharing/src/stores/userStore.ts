import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useUserStore = defineStore("user", () => {
  const error = ref(null);

  async function register(name, email, password) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/users`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      error.value = null;
      router.push("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      error.value = err.response?.data?.message || "Registration failed";
      return err.response.data;
    }
  }

  async function login(email, password) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/users/login`,
        {
          email: email,
          password: password,
        }
      );
      error.value = null;
      localStorage.setItem("authToken", response.data.token.token);
      localStorage.setItem("username", response.data.name);
      router.push("/dashb");
    } catch (err) {
      console.error("Error during login:", err);
      error.value = err.response?.data?.message || "Login failed";
      return err.response.data.message;
    }
  }

  return { error, register, login };
});
