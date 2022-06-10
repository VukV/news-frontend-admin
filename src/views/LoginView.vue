<template>
  <div>
    <TitleComponent title="Login" description="Login is required to gain access to the application"></TitleComponent>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="text" class="form-control" id="email" name="email" placeholder="Email">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="password" class="form-control" id="password" name="password" placeholder="Password">
        </div>
      </div>
    </div>

    <br>
    <button type="button" class="btn btn-primary" @click="login">Login</button>

  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent";

export default {
  name: "LoginView",
  components: {
    TitleComponent
  },
  methods:{
    login(){
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;

      this.$axios.post('/api/users/login', {
        email: email,
        password: password,
      }).then(response => {
        localStorage.setItem('jwt', response.data.jwt)
        this.$router.push({name: 'Categories'});
      });
    }
  }
}
</script>

<style scoped>

</style>