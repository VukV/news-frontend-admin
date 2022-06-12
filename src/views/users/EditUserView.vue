<template>
  <div>
    <TitleComponent title="Edit User"></TitleComponent>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-2">
          <select v-model="user.type" class="form-select" name="type" id="type">
            <option value="Creator">Creator</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input v-model="user.name" type="text" class="form-control" id="name" name="name" placeholder="Name">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input v-model="user.surname" type="text" class="form-control" id="surname" name="surname" placeholder="Surname">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input v-model="user.email" type="email" class="form-control" id="email" name="email" placeholder="Email">
        </div>
      </div>
    </div>

    <br>
    <span class="edit-user-buttons">
      <button type="button" class="btn btn-primary" @click="saveUser">Save</button>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
    </span>

  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent";
import router from "@/router";
export default {
  name: "EditUserView",
  components: {
    TitleComponent
  },
  data() {
    return {
      user: Object
    }
  },
  created() {
    this.$axios.get('/api/users/admin/' + this.$route.params.email)
        .then(response => {
          this.user = response.data;
        });
  },
  methods:{
    cancel(){
      router.go(-1);
    },

    saveUser(){
      if(this.user.type && this.user.name && this.user.surname && this.user.email){
        this.$axios.put('/api/users/admin', {
          id: this.user.id,
          email: this.user.email,
          name: this.user.name,
          surname: this.user.surname,
          type: this.user.type
        }).then(() => {
          router.go(-1);
        });
      }
      else {
        alert("Fields can't be empty");
      }
    }
  }
}
</script>

<style scoped>
  .edit-user-buttons > *{
    margin: 10px;
  }
</style>