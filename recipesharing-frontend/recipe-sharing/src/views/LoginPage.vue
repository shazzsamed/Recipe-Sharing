<template>
  <div class="login-container">
    <form @submit.prevent="loginUser" class="login-form">
      <h2 class="form-title">Login</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <v-text-field v-model="email" type="email" required></v-text-field>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showPassword = !showPassword"
          required
        ></v-text-field>
      </div>

      <v-btn
        type="submit"
        variant="plain"
        density="comfortable"
        block
        rounded="xs"
        style="margin-bottom: 10px"
        >Login</v-btn
      >

      <p class="signup-text">Don't have an account?</p>
      <button
        type="button"
        @click="router.push('/register')"
        class="signup-link"
      >
        Sign Up
      </button>

      <span class="error">{{ loginError }} </span>
    </form>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const email = ref("");
const password = ref("");
const loginError = ref("");
const showPassword = ref(false);

const store = useUserStore();

const loginUser = async () => {
  const login = await store.login(email.value, password.value);
  if (login) loginError.value = login + " ⓘ";
  password.value = "";
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  text-align: center;
}

label {
  text-align: left;
}

.login-form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(35, 2, 2, 0.699);
  max-width: 400px;
  width: 100%;
}

.form-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333333;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  margin-bottom: 10px;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  font-size: 15px;
  margin-top: 5px;
  display: block;
  text-align: center;
}

.signup-text {
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
}

.signup-link {
  background: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0;
}
</style>
