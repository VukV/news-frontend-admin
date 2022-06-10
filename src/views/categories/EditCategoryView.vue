<template>
  <div>
    <TitleComponent title="Edit Category"></TitleComponent>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input v-model="name" type="text" class="form-control" id="name" name="name" placeholder="Name">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input v-model="description" type="text" class="form-control" id="description" name="description" placeholder="Description">
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
  name: "EditCategoryView",
  components: {
    TitleComponent
  },
  data() {
    return {
      id: Number,
      name: String,
      description: String
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.name = this.$route.query.n;
    this.description = this.$route.query.d;
  },
  methods:{
    saveCategory() {
      if(this.name && this.description){
        this.$axios.put('/api/categories/content', {
          id: this.id,
          name: this.name,
          description: this.description
        }).then(() => {
          router.push({path: '/categories'});
        });
      }
      else {
        alert("Fields can't be empty");
      }
    },

    cancel() {
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