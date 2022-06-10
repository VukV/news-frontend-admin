<template>
  <div>
    <TitleComponent title="Add New Category"></TitleComponent>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="text" class="form-control" id="name" name="name" placeholder="Name">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="text" class="form-control" id="description" name="description" placeholder="Description">
        </div>
      </div>
    </div>

    <br>
    <span class="add-category-buttons">
      <button type="button" class="btn btn-primary" @click="saveCategory">Save</button>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
    </span>

  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent";
import router from "@/router";
export default {
  name: "AddCategoryView",
  components: {
    TitleComponent
  },
  methods:{
    saveCategory(){
      let name = document.getElementById('name').value;
      let description = document.getElementById('description').value;

      if(name && description){
        this.$axios.post('/api/categories/content', {
          name: name,
          description: description
        }).then(() => {
          router.push({path: '/categories'})
        });
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

  .add-category-buttons > *{
    margin: 10px;
  }

</style>