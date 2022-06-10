<template>
  <div>
    <TitleComponent title="Articles" description="Write, Edit, Delete"></TitleComponent>

    <button type="button" class="btn btn-primary" @click="openAddArticleView">Add New Article</button>

    <div v-if="articles.length !== 0">
      <div class="row justify-content-center">
        <div class="col-4">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td @click="openArticleLink" class="article-title">{{ article.title }}</td>
              <td>{{ article.date | toDate }}</td>
              <td> <button type="button" class="btn btn-outline-primary" @click="openEditView(article.id)">Edit</button> </td>
              <td> <button type="button" class="btn btn-outline-danger" @click="deleteArticle(article.id)">Delete</button> </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <NotFoundComponent message="There are no articles..."></NotFoundComponent>
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
  name: "ArticlesView",
  components:{
    TitleComponent,
    NotFoundComponent
  },
  data() {
    return {
      articles: [],
      category: Boolean,
      categoryId: Number,
      page: 1
    }
  },
  created() {
    if(this.$route.query.category){
      this.category = true;
      this.categoryId = this.$route.query.category;
    }
    else {
      this.category = false;
    }

    this.getArticles();
  },
  methods:{
    getArticles(){
      if(this.category){
        this.$axios.get('/api/articles/category/' + this.categoryId,
            {params: {page: this.page}
            })
            .then(response => {
              this.articles = response.data;
            });
      }
      else {
        this.$axios.get('/api/articles/content',
            {params: {page: this.page}
            })
            .then(response => {
              this.articles = response.data;
            });
      }
    },

    openAddArticleView(){
      router.push({path: '/articles/add'});
    },

    openEditView(articleId){
      router.push({name: 'Edit Article', params: {id: articleId}});
    },

    deleteArticle(articleId){
      this.$axios.delete('/api/articles/content/' + articleId)
          .then(() => {
            for(let a = 0; a < this.articles.length; a++){
              if(this.articles[a].id === articleId){
                this.articles.splice(a, 1);
                break;
              }
            }
          });
    },

    openArticleLink(){
      //todo
    },

    pageBefore(){
      if(this.page > 1){
        this.page -= 1;
        this.getArticles();
      }
    },

    pageAfter() {
      this.page += 1;
      this.getArticles();
    }
  },
  filters:{
    toDate(value){
      let date = new Date(value);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      return day + "/" + month + "/" + year;
    }
  }
}
</script>

<style scoped>
  .bop{
    margin: 10px;
  }

  .article-title{
    color: blue;
    font-weight: bold;
  }

  .article-title:hover{
    cursor: pointer;
  }
</style>