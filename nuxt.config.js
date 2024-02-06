module.exports = {
  telemetry: false,
  ssr: false,
  server: {
    host: process.env.BASE_URL || '0.0.0.0',
    port: process.env.PORT || 8085
  },
  head: {
    title: 'Activity Tracker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Activity Tracker for Delivery Team Reporting'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap' }
    ]
  },
  loading: {
    color: '#7898ad',
    failedColor: '#ff0033',
    continuous: true,
    throttle: 300,
    duration: 2000,
    height: '4px'
  },
  loadingIndicator: '@/static/loading.html',
  css: [
    '@/assets/theme.scss',
    '@/assets/hamburger.scss',
    '@/assets/transitions.scss'
  ],
  plugins: [
    '@/plugins/vue-scroll-to.js',
    { src: '@/plugins/apex-charts', mode: 'client' },
    { src: '@/plugins/vue-multiselect', mode: 'client' },
    { src: '@/plugins/vue-clipboard2', mode: 'client' }
  ],
  components: true,
  modules: [
    'vue-scrollto/nuxt',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },
  router: {
    middleware: ['user']
  },
  axios: {
    browserBaseURL: process.env.BROWSER_URL
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_URL
    }
  }
}
