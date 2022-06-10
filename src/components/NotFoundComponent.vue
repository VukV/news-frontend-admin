<template>
  <div>
    <p class="nothing-found"> {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "NotFoundComponent",
  props:{
    message: String
  }
}
</script>

<style scoped>

  .nothing-found{
    margin-top: 20px;
  }
</style>