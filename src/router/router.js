import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'explorer',
            component: () => import('@/views/Explorer')
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('@/views/Detail')
        },
        {
            path: '/tools',
            name: 'tools',
            component: () => import('@/views/Tools')
        },
        {
            path: '/api',
            name: 'api',
            component: () => import('@/views/Api')
        }
    ]
});
