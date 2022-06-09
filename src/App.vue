<template>
  <div id="app">
    <NavbarComponent></NavbarComponent>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";

export default {
  components:{
    NavbarComponent
  }
}
</script>

<style>
#app {
  text-align: center;
}

</style>
