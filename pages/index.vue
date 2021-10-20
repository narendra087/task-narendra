<template>
  <div class="pg-login vh-100">
    <b-card class="login-card w-50 mx-auto" header="Login">
      <b-form @submit="handleSubmit" @reset="handleReset">
        <b-form-group
          id="input-username"
          label="Username:"
          label-for="input-username"
        >
          <b-form-input
            id="username"
            v-model="form.username"
            placeholder="Enter username"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-password" label="Password:" label-for="input-password">
          <b-form-input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>

    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { authLogin } from '@/services/index.js'
export default {
  name: 'LoginPage',
  head() {
    return {
      title: 'Login Dashboard'
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      apiPath: 'http://45.77.45.245:8021/api/v1',
    }
  },
  mounted(){
    if (this.token || localStorage && localStorage.token) {
      this.$router.push('/dashboard')
    }
  },
  computed: {
    ...mapGetters({
      token: "auth/token",
    })
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser',
      setToken: 'auth/setToken'
    }),
    async handleSubmit(e){
      e.preventDefault()
      const res = await authLogin(this.form)
      if (res) {
        this.setToken(res.data.data.token)
        this.flashMessage.success({
          title: 'Login Successfully',
          message: 'Welcome to Article Dashboard'
        });
        this.$router.push('/dashboard')
      } else {
        this.flashMessage.error({
          title: 'Failed Login',
          message: 'Wrong Username or Password'
        });
      }
      // await this.$axios.$post(`${this.apiPath}/auths/login`, {
      //   ...this.form
      // }).then(response => {
      //   console.log(response)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    handleReset(e){
      e.preventDefault()
      this.form.username = '';
      this.form.password = '';
    },
  },

}
</script>
<style scoped>
  .pg-login {
    height: 100vh;
  }
  .login-card {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
