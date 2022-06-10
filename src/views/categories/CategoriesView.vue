<template>
  <div>
    <TitleComponent title="Categories" description="Create, Edit, Delete"></TitleComponent>

    <button type="button" class="btn btn-primary" @click="openAddCategoryView">Add New Category</button>

    <div v-if="categories.length !== 0">
      <div class="row">
        <div class="col-4">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td @click="openArticlesView(category.id)">{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td> <button type="button" class="btn btn-primary" @click="openEditView(category.id)">Edit</button> </td>
              <td> <button type="button" class="btn btn-danger" @click="deleteCategory(category.id)">Delete</button> </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <NotFoundComponent message="There are no categories..."></NotFoundComponent>
    </div>

    <div>
      <span>
        <button type="button" class="btn btn-outline-primary fw-bold" @click="pageBefore">&lt;&lt;</button>
        <button type="button" class="btn btn-outline-primary fw-bold" @click="pageAfter">&gt;&gt;</button>
      </span>
    </div>

  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent";
import NotFoundComponent from "@/components/NotFoundComponent";
import router from "@/router";

export default {
  name: "CategoriesView",
  components: {
    NotFoundComponent,
    TitleComponent
  },
  data() {
    return {
      categories: [],
      page: 1
    }
  },
  created() {
    this.getCategories();
  },
  methods:{
    getCategories(){
      this.$axios.get('/api/categories/content', {params: {page: this.page}})
          .then(response => {
            this.categories = response.data;
          });
    },

    openArticlesView(categoryId){
      console.log(categoryId);
      //todo
    },

    openEditView(categoryId){
      router.push({name: 'Edit Category', params: {id: categoryId}});
    },

    deleteCategory(categoryId){
      this.$axios.delete('/api/categories/content/' + categoryId)
          .then(() => {
            for(let c = 0; c < this.categories.length; c++){
              if(this.categories[c].id === categoryId){
                this.categories.splice(c, 1);
                break;
              }
            }
          });
    },

    openAddCategoryView(){
      router.push({path: '/categories/add'});
    },

    pageBefore(){
      if(this.page > 1){
        this.page -= 1;
        this.getCategories();
      }
    },

    pageAfter(){
      this.page += 1;
      this.getCategories();
    }
  }
}
</script>

<style scoped>

  .btn-outline-primary{
    margin: 10px;
  }

</style>