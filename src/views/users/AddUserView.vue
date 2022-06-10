<template>
  <div>
    <TitleComponent title="Create New User"></TitleComponent>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-2">
          <select class="form-select" name="type" id="type">
            <option value="Creator">Creator</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="text" class="form-control" id="name" name="name" placeholder="Name">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="text" class="form-control" id="surname" name="surname" placeholder="Surname">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="email" class="form-control" id="email" name="email" placeholder="Email">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="password" class="form-control" id="password" name="password" placeholder="Password">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="password" class="form-control" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password">
        </div>
      </div>
    </div>

    <br>
    <span class="add-user-buttons">
      <button type="button" class="btn btn-primary" @click="saveUser">Save</button>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
    </span>

  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent";
import router from "@/router";
export default {
  name: "AddUserView",
  components: {
    TitleComponent
  },
  methods:{
    saveUser(){
      let name = document.getElementById('name').value;
      let surname = document.getElementById('surname').value;
      let email = document.getElementById('email').value;
      let type = document.getElementById('type').value;

      let password = document.getElementById('password').value;
      let passwordConfirm = document.getElementById('passwordConfirm').value;

      if(name && surname && email && type && password && passwordConfirm){
        if (password === passwordConfirm){
          this.$axios.post('/api/users/admin', {
            name: name,
            surname: surname,
            email: email,
            type: type,
            password: password,
            passwordRepeat: passwordConfirm
          }).then(() => {
            router.go(-1);
          });
        }
        else {
          alert("Invalid password");
        }
      }
      else {
        alert("Fields can't be empty");
      }
    },

    cancel(){
      router.go(-1);
    }
  }
}
</script>

<style scoped>
  .add-user-buttons > *{
    margin: 10px;
  }
</style>