import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'explorer',
            component: () => import('@/views/Explorer')
        },
        {
            path: '/detail/:param?',
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
        },
        {
            path: '*',
            component: () => import('@/views/NotFound')
        }
    ]
});
