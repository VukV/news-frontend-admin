<template>
  <div>
    <TitleComponent title="Categories" description="Create, Edit, Delete"></TitleComponent>

    <button type="button" class="btn btn-primary" @click="openAddCategoryView">Add New Category</button>

    <div v-if="categories.length !== 0">
      <div class="row justify-content-center">
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
              <td @click="openArticlesView(category.id)" class="category-name">{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td> <button type="button" class="btn btn-outline-primary" @click="openEditView(category.id, category.name, category.description)">Edit</button> </td>
              <td> <button type="button" class="btn btn-outline-danger" @click="deleteCategory(category.id)">Delete</button> </td>
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
  mounted() {
    this.getCategories();
  },
  methods:{
    getCategories(){
      this.$axios.get('/api/categories/content', {params: {page: this.page}
      })
      .then(response => {
        this.categories = response.data;
      });
    },

    openArticlesView(categoryId){
      router.push({name: 'Articles', query: {category: categoryId}})
    },

    openEditView(categoryId, name, desc){
      router.push({name: 'Edit Category', params: {id: categoryId}, query: {n: name, d: desc}});
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

  .bop{
    margin: 10px;
  }

  .category-name{
    color: blue;
    font-weight: bold;
  }

  .category-name:hover{
    cursor: pointer;
  }

</style>