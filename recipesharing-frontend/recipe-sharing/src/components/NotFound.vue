<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">Go Back Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}

.not-found a {
  color: #42b983;
  text-decoration: none;
  font-weight: bolder;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
