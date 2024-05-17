


import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Pages/Home.vue'
import Form from '../components/Pages/Form.vue'
import Activity from '../components/Pages/Activity.vue'
import Admin_Dashboard from '../components/Pages/Admin/Admin_Dashboard.vue'
import Appointment from '@/components/Pages/Appointment.vue'
import Register from '../components/Pages/Register.vue'
import Show_projects from '../components/Pages/Admin/Show_projects.vue'
    const routes = [
        {
            name: 'Login',
            component: () => import('../components/Pages/Login.vue'),
            path: '/'
        },
        {
            name: 'Home',
            component: () => Home,
            meta: { requiresAuth: true },
            requiresActivation: true,

            path: '/home'
        },
        {
            name: 'Tac_Form',
            component: () => Form,
            meta: { requiresAuth: true },
            path: '/form'
        },
        {
            name: 'Acivity_table',
            component: () => Activity,
            meta: { requiresAuth: true },
            path: '/activity'
        },

        {
            name: 'Admin Dashboard',
            component: () => Admin_Dashboard,
            meta: { requiresAuth: true },
            path: '/admin_dashboard'
        },
        {
            name: 'Appointment Booking',
            component: () => Appointment,
            meta: { requiresAuth: true },

            path: '/appointment'
        },
        {
            name: 'Register',
            component: () => Register,
            path: '/register'
        },
        {
            name: 'Admin Projects',
            component: () => Show_projects,
            path: '/show_projects'
        }
    
    ];
    
    const router = createRouter({
        history: createWebHistory(),
        routes
    })
    
    export default router