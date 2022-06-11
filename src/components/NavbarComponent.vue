<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">94/20RN</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/categories" tag="a" class="nav-link">Categories</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/articles" tag="a" class="nav-link">Articles</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" tag="a" class="nav-link">Users</router-link>
          </li>
        </ul>
        <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
          <h6 id="user">{{ getName }}</h6>
          <button class="btn btn-outline-dark" type="submit">Logout</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  computed:{
    canLogout() {
      return this.$route.name !== 'Login';
    },
    getName(){
      let token = localStorage.getItem("jwt");
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload).sub;
    }
  },
  methods:{
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push({name: 'Login'});
    }
  }
}
</script>

<style scoped>
  #user{
    margin: auto 10px auto auto;
  }
</style>