<template>
  <div class="pg-dashboard">
    <b-card class="user-card" header="User Data">
      <p v-if="isLoading" class="loading-user">Fetching Data...</p>
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
            <b-button @click="handleEdit(row.item)" class="mr-2">
              Edit Article
            </b-button>
            <b-button @click="handleDelete(row.item)" class="mr-2">
              Delete Article
            </b-button>
          </template>
        </b-table>
      </div>
      <div class="wrapper-action article-action">
        <b-button v-if="!openForm" @click="handleAdd" type="submit" variant="primary">Add</b-button>
      </div>
    </b-card>
    <br>
    <b-card v-if="openForm" class="user-card" :header="`Article Form (${status})`">
      <Form @toggle-form=toggleForm @remove-data="removeData" :editedData=editedData :status="status" />
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
      openForm: false,
      status: 'add',
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
    },
    handleAdd(){
      this.toggleForm(true)
      this.status = 'add'
    },
    handleEdit(data){
      this.toggleForm(true)
      this.status = 'edit'
      this.editedData = data
    },
    removeData(){
      this.editedData = null
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
<style scoped>
  .pg-dashboard {
    padding: 50px;
  }
</style>
