<template>
  <div class="wrapper-form">
    <b-form @submit="handleSubmit" @reset="handleReset">
      <b-form-group
        id="input-title"
        label="Article Title:"
        label-for="input-title"
      >
        <b-form-input
          id="title"
          v-model="form.title"
          placeholder="Input Title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-content"
        label="Article Content:"
        label-for="input-content"
      >
        <b-form-textarea
          id="content"
          v-model="form.content"
          placeholder="Input content..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-button @click="handleCancel" variant="secondary" class="single-button mt-2">Cancel</b-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        id: 0,
        title: '',
        content: '',
        created_by: '',
        action: '',
      },
    }
  },
  props: {
    editedData: Object,
    openForm: String,
  },
  computed: {
    ...mapGetters({
      token: "auth/token",
      user: "auth/user",
      articles: "article/articles"
    })
  },
  mounted(){
    if (this.editedData) {
      Object.assign(this.form, this.editedData)
    } else {
      this.handleReset()
    }
  },
  watch: {
    editedData(val){
      if (val) {
        Object.assign(this.form, this.editedData)
      }
    }
  },
  methods: {
    ...mapActions({
      addArticle: 'article/addArticle',
      editArticle: 'article/editArticle',
    }),
    handleReset(e){
      if (e) {
        e.preventDefault()
      }
      this.form.id = 0;
      this.form.title = '';
      this.form.created_by = '';
      this.form.content = '';
    },
    handleSubmit(e){
      e.preventDefault()
      if (this.openForm === 'Add') {
        const d = new Date()
        this.form.id = d.getTime()
        this.form.created_by = this.user.name;

        this.addArticle(this.form)

        this.flashMessage.success({
          title: 'Article Added',
          message: `Article '${this.form.title}' successfully added`
        });
      } else {
        this.editArticle(this.form)

        this.flashMessage.info({
          title: 'Article Updated',
          message: `Article with ID ${this.form.id} updated`
        });
      }

      this.handleCancel()
    },
    handleCancel(){
      this.$emit('toggle-form', '')
    }
  }
}
</script>
<style scoped>
  button.single-button {

  }
</style>
