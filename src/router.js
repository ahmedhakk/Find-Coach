import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from "vue-router";

// components
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';

// import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import NotFound from './pages/NotFound.vue';

import UserAuth from './pages/auth/UserAuth.vue';

// import store
import store from './store/index.js';

const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration.vue'));
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'));
const NotFound = defineAsyncComponent(() => import('./pages/NotFound.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true, // it prop the dynamic id as a prop to the loaded component
            children: [
                { path: 'contact', component: ContactCoach }, //  /coaches/coachId/contact
            ]
        },

        { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

// Navigation Guards
router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated)
        next('/auth'); // reditect
    else if (to.meta.requiresUnAuth && store.getters.isAuthenticated)
        next('/coaches');
    else
        next();
});

export default router;