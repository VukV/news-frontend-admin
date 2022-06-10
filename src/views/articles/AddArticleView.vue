<template>
  <div>
    <TitleComponent title="Write New Article"></TitleComponent>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-2">
          <select class="form-select" name="categories" id="categories">
            <option v-for="c in categories" :key="c.id" :value=c.id>{{ c.name }}</option>
          </select>
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="text" class="form-control" id="title" name="title" placeholder="Title">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <textarea class="form-control" rows="7" id="content" name="content" placeholder="Content"></textarea>
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-3">
          <input type="text" class="form-control" id="tags" name="tags" placeholder="Tags (separated by space)">
        </div>
      </div>
    </div>

    <br>
    <span class="add-article-buttons">
      <button type="button" class="btn btn-primary" @click="saveArticle">Save</button>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
    </span>

  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent";
import router from "@/router";

export default {
  name: "AddArticleView",
  components: {
    TitleComponent
  },
  data() {
    return {
      categories: []
    }
  },
  created() {
    this.$axios.get('/api/categories')
        .then(response => {
          this.categories = response.data;
        });
  },
  methods:{
    saveArticle(){
      let categoryId = document.getElementById('categories').value;
      let title = document.getElementById('title').value;
      let content = document.getElementById('content').value;
      let tags = document.getElementById('tags').value;

      if(categoryId && title && content && tags){
        this.$axios.post('/api/articles/content', {
          categoryId: categoryId,
          title: title,
          content: content,
          tags: tags
        }).then(() => {
          router.push({path: '/articles'})
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
  .add-article-buttons > *{
    margin: 10px;
  }
</style>