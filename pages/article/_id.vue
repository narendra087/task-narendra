<template>
  <div class="pg-detailarticle p-5">
    <h6 @click="$router.push('/dashboard')" class="back-to w-50 mx-auto mb-2 pointer">Back to dashboard</h6>
    <b-card class="article-card w-50 mx-auto" header="Article Data">
      <div v-if="!articleData" class="wrapper-article">
        <b-skeleton animation="wave" width="300px"></b-skeleton>
        <b-skeleton animation="wave" width="100px" class="mb-5"></b-skeleton>
        <b-skeleton animation="wave" width="50%" height="30px" class="mx-auto mb-2"></b-skeleton>
        <b-skeleton animation="wave" width="100%"></b-skeleton>
        <b-skeleton animation="wave" width="100%"></b-skeleton>
        <b-skeleton animation="wave" width="100%"></b-skeleton>
        <b-skeleton animation="wave" width="100%"></b-skeleton>
        <b-skeleton animation="wave" width="70%"></b-skeleton>
      </div>
      <div v-else class="wrapper-article">
        <p class="article-date">{{formatDate(articleData.id)}}</p>
        <p class="article-date mb-5">{{articleData.created_by}}</p>
        <h3 class="article-title mb-2 text-center">{{articleData.title}}</h3>
        <p class="article-content">{{articleData.content}}</p>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'ArticlePage',
  head() {
    return {
      title: `Article${this.articleData ? ' - ' + this.articleData.title : ''}`
    }
  },
  data(){
    return {
      articleData: null,
    }
  },
  computed: {
    ...mapGetters({
      articles: "article/articles"
    })
  },
  mounted(){
    if (this.$route.params.id) {
      const id = this.$route.params.id
      this.getArticle(id)
    } else {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    getArticle(id) {
      const obj = this.articles.find(x => x.id === Number(id))
      if (!obj) {
        this.flashMessage.error({
          title: 'Article Not Found',
          message: `Article with ID ${id} not found`
        });
        return this.$router.push('/dashboard')
      }
      this.articleData = obj

      console.log(this.articleData)
    },
    formatDate(dt){
      const date = new Date(dt)
      return date.toLocaleString()
    }
  },
}
</script>
<style scoped>
  /* .back-to {
    font-size: 14px;
  } */
</style>
