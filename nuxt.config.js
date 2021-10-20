export default {
  head: {
    title: 'Article',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/css/global.css',
  ],
  plugins: [
    { src: '~/plugins/persistedState.client.js'},
    { src: '~/plugins/flash-message.js', mode: 'client' }
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  axios: {
    BaseURL: 'http://45.77.45.245:8021/api/v1'
  },
  build: {
  }
}
