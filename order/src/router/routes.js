const LOGIN = ()=>import('../views/login.vue') 
const HOME = ()=>import('../views/home.vue') 

const routes = [
    { path: '/', redirect:'/home' },
    { path: '/home', component: HOME }
]
export default routes;