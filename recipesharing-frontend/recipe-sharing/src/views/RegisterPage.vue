<template>
  <div class="register-container">
    <form @submit.prevent="registerUser" class="register-form">
      <h2 class="form-title">Register</h2>

      <div class="form-group">
        <label for="name">Name</label>
        <v-text-field v-model="name" :type="text" required></v-text-field>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <v-text-field v-model="email" :type="email" required></v-text-field>
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
        >Register</v-btn
      >
      <p class="login-text">Already have an account?</p>
      <button type="button" @click="router.push('/login')" class="login-link">
        Log In
      </button>

      <span class="error">{{ registerError }}</span>
    </form>
  </div>
</template>

<script setup>
import router from "@/router";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
const name = ref("");
const email = ref("");
const password = ref("");
const registerError = ref("");
const showPassword = ref(false);

const store = useUserStore();

const registerUser = async () => {
  const response = await store.register(
    name.value,
    email.value,
    password.value
  );
  if (response == 23505) registerError.value = "User Already Registered";
  name.value = "";
  email.value = "";
  password.value = "";
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
}

.register-form {
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
  margin-bottom: 10px;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
  text-align: center;
}

.login-text {
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.login-link {
  background: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0;
  display: block;
  text-align: center;
  width: 100%;
}
</style>
