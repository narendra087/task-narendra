<template>
  <div class="pg-dashboard p-5">
    <b-card class="user-card" header="User Data">
      <div v-if="isLoading" class="wrapper-user">
        <b-skeleton animation="wave" width="35%"></b-skeleton>
        <b-skeleton animation="wave" width="50%"></b-skeleton>
      </div>
      <div v-else class="wrapper-user">
        <p class="user-info name m-0">Name: {{user.name || '-'}}</p>
        <p class="user-info name m-0">Role: {{user.role || '-'}}</p>
      </div>
    </b-card>
    <br>
    <b-card class="user-card" header="Article Data">
      <p v-if="!articles || !articles.length" class="loading-user mb-3">No Article Found</p>
      <div v-else class="wrapper-article">
        <b-table striped hover :items="articles">
          <template #cell(action)="row">
            <b-button @click="$router.push(`/article/${row.item.id}`)" variant="dark" class="mr-2">
              View Article
            </b-button>
            <b-button @click="handleEdit(row.item)" variant="primary" class="mr-2">
              Edit Article
            </b-button>
            <b-button @click="handleDelete(row.item)" variant="danger" class="mr-2">
              Delete Article
            </b-button>
          </template>
        </b-table>
      </div>
      <div class="wrapper-action article-action">
        <b-button v-if="!openForm" @click="toggleForm('Add')" type="submit" variant="success">Add Article</b-button>
      </div>
    </b-card>
    <br>
    <b-card v-if="openForm" class="user-card" :header="`${openForm} Article Form`">
      <Form @toggle-form=toggleForm :editedData=editedData :openForm="openForm" />
    </b-card>
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getUser } from '@/services/index.js'
import Form from '@/components/Form'

export default {
  name: 'pg-dashboard',
  head() {
    return {
      title: 'Dashboard Article'
    }
  },
  components: {
    Form,
  },
  data() {
    return {
      isLoading: true,
      openForm: '',
      editedData: null,
    }
  },
  computed: {
    ...mapGetters({
      token: "auth/token",
      user: "auth/user",
      articles: "article/articles"
    })
  },
  mounted(){
    if (!this.token && (localStorage && !localStorage.token)) {
      this.$router.push('/')
    }
    this.handleUser()
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser',
      removeArticle: 'article/removeArticle',
    }),
    async handleUser(){
      this.isLoading = true
      const res = await getUser(this.token)
      if (res) {
        this.setUser(res.data.data)
      }
      this.isLoading = false
    },
    toggleForm(val){
      this.openForm = val;
      if (!val) {
        this.editedData = null;
      }
    },
    handleEdit(data){
      this.toggleForm('Edit')
      this.editedData = data
    },
    handleDelete(data){
      this.removeArticle(data)

      this.flashMessage.error({
        title: 'Article Deleted',
        message: `Article ${data.title} has been deleted`
      });
    }
  }
}
</script>
