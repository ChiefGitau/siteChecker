import { createApp } from 'vue'
  import { createRouter, createWebHistory } from 'vue-router'
  import './style.css'
  import App from './App.vue'
  import AuditView from './pages/AuditView.vue'
  import HomeView from './pages/HomeView.vue'
  import NewAuditView from './pages/NewAuditView.vue'

  const router = createRouter({
    history: createWebHistory(),
    routes: [
       { path: '/', component: AuditView },
       { path: '/home', component: HomeView },
       {path: '/new', component: NewAuditView }
    ]
  })

  const app = createApp(App)
  app.use(router)
  app.mount('#app')