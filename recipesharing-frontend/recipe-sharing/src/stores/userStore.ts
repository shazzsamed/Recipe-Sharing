import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useUserStore = defineStore("user", () => {
  const error = ref(null);

  async function register(name: String, email: String, password: String) {
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
    } catch (err: any) {
      console.error("Error during registration:", err);
      error.value = err.response?.data?.message || "Registration failed";
      return err.response.data;
    }
  }

  async function login(email: String, password: String) {
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
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("username", response.data.name);
      router.push("/");
    } catch (err: any) {
      console.error("Error during login:", err);
      error.value = err.response?.data?.message || "Login failed";
      return err.response.data.message;
    }
  }

  async function logout() {
    try {
      await axios.post(`${import.meta.env.VITE_APP_URL}/logout`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      error.value = null;
      router.push("/login");
    } catch (err: any) {
      console.error("Error during logout:", err);
      error.value = err.response?.data?.message || "Logout failed";
    }
  }

  return { error, register, login, logout };
});
