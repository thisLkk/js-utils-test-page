import { createRouter, createWebHistory, Router } from 'vue-router'
import routes from './router'

const routers: Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHistory('/m/js-utils-page/'),
    routes
})
export default routers