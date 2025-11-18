import { createApp } from 'vue'
  import { createRouter, createWebHistory } from 'vue-router'
  import './style.css'
  import App from './App.vue'
  import AuditView from './pages/AuditView.vue'

  const router = createRouter({
    history: createWebHistory(),
    routes: [
       { path: '/', component: AuditView },
    ]
  })

  const app = createApp(App)
  app.use(router)
  app.mount('#app')