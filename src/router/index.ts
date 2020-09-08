import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import Home from '../views/Home.vue';
import TaskBoard from '../components/TaskBoard.vue';

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home,
    // },
    {
        path: '/task_chute',
        name: 'TaskBoard',
        component: TaskBoard,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
