<template>
  <div class="unauthorized">
    <h1>403 - Unauthorized Access</h1>
    <p>You do not have permission to view this page.</p>
    <router-link to="/">Go Back Home</router-link>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>

<style scoped>
.unauthorized {
  text-align: center;
  margin-top: 100px;
}

.unauthorized a {
  color: #d9534f;
  text-decoration: none;
  font-weight: bolder;
}

.unauthorized a:hover {
  text-decoration: underline;
}
</style>
