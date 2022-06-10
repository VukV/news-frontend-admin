<template>
  <div>
    <TitleComponent title="Users" description="Create, Edit, Deactivate"></TitleComponent>

    <button type="button" class="btn btn-primary" @click="openAddUserView">Add New User</button>

    <div v-if="users.length !== 0">
      <div class="row justify-content-center">
        <div class="col-6">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Edit</th>
              <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td >{{ user.name }}</td>
              <td>{{ user.surname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.type }}</td>
              <td> <button type="button" class="btn btn-outline-primary" @click="openEditView(user.id)">Edit</button> </td>
              <td v-if="user.type === 'Admin'" class="fw-bold">/</td>
              <td v-else-if="user.active === true"> <button type="button" class="btn btn-outline-danger" @click="changeStatus(user.id, user.active)">Deactivate</button> </td>
              <td v-else> <button type="button" class="btn btn-outline-success" @click="changeStatus(user.id, user.active)">Activate</button> </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <NotFoundComponent message="There are no users..."></NotFoundComponent>
    </div>

    <div>
      <span>
        <button type="button" class="btn btn-outline-primary fw-bold bop" @click="pageBefore">&lt;&lt;</button>
        <button type="button" class="btn btn-outline-primary fw-bold bop" @click="pageAfter">&gt;&gt;</button>
      </span>
    </div>

  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent";
import NotFoundComponent from "@/components/NotFoundComponent";
import router from "@/router";

export default {
  name: "UsersView",
  components: {
    TitleComponent,
    NotFoundComponent
  },
  data() {
    return {
      users: [],
      page: 1
    }
  },
  created() {
    this.getUsers();
  },
  methods:{
    openAddUserView(){
      router.push({path: '/users/add'});
    },

    changeStatus(id, status){
      this.$axios.put('/api/users/admin/status', {
        userId: id,
        status: status
      })
          .then(() => {
            for(let i = 0; i < this.users.length; i++){
              if(this.users[i].id === id){
                this.users[i].active = !status;
                break;
              }
            }
          });
    },

    getUsers(){
      this.$axios.get('/api/users/admin',
          {params: {page: this.page}
          })
          .then(response => {
            this.users = response.data;
          });
    },

    pageBefore(){
      if(this.page > 1){
        this.page -= 1;
        this.getUsers();
      }
    },

    pageAfter(){
      this.page += 1;
      this.getUsers();
    },

    openEditView(userId){
      router.push({name: 'Edit User', params: {id: userId}});
    },


  }
}
</script>

<style scoped>
  .bop{
    margin: 10px;
  }
</style>