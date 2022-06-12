<template>
  <div>
    <TitleComponent title="Edit Article"></TitleComponent>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-2">
          <select v-model="selectedId" class="form-select" name="categories" id="categories">
            <option v-for="c in categories" :key="c.id" :value=c.id>{{ c.name }}</option>
          </select>
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input v-model="article.title" type="text" class="form-control" id="title" name="title" placeholder="Title">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <textarea v-model="article.content" class="form-control" rows="7" id="content" name="content" placeholder="Content"></textarea>
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input v-model="tags" type="text" class="form-control" id="tags" name="tags" placeholder="Tags (separated by space)">
        </div>
      </div>
    </div>

    <br>
    <span class="edit-article-buttons">
      <button type="button" class="btn btn-primary" @click="saveArticle">Save</button>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
    </span>
  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent";
import router from "@/router";

export default {
  name: "EditArticleView",
  components: {
    TitleComponent
  },
  data() {
    return {
      article: Object,
      tags: String,
      categories: [],
      selectedId: Number
    }
  },
  created() {
    this.$axios.get('/api/articles/article/' + this.$route.params.id)
        .then(response => {
          this.article = response.data;

          this.$axios.get('/api/tags/' + this.article.id)
              .then(response => {
                let tagArray = response.data;
                let tags = '';

                for(let i = 0; i < tagArray.length; i++){
                  tags += tagArray[i].name + ' ';
                }
                this.tags = tags;
              });

          this.$axios.get('/api/categories')
              .then(response => {
                this.categories = response.data;
                this.selectedId = this.article.categoryId;
              });
        });


  },
  methods:{
    saveArticle() {
      if(this.article.title && this.article.content && this.tags){
        this.$axios.put('/api/articles/content', {
          id: this.article.id,
          categoryId: this.selectedId,
          title: this.article.title,
          content: this.article.content,
          tags: this.tags
        }).then(() => {
          router.go(-1);
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
  .edit-article-buttons > *{
    margin: 10px;
  }
</style>