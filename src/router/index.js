import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/art/:id',
		name: 'ArtDisplay',
		component: Home,
		props: {
			artDisplay: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Home,
		props: {
			registerModal: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
