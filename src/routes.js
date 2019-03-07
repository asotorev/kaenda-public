import Vue from 'vue';
import VueRouter from 'vue-router';

import { store } from './store/index';

import Home from './components/Home.vue';
import Calendar from './components/Calendar/Calendar.vue';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';

Vue.use(VueRouter)

export const routes = [
    {
        path: '/', 
        component: Home,
    },
    {path: '/signup', component: SignUp },
    {path: '/login', component: Login },
    {   
        path: '/calendar', 
        component: Calendar, 
        beforeEnter (to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next ('/login');
            }
        }
    },
];

export default new VueRouter({mode: 'history', routes});