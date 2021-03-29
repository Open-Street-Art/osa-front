import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		props: true,
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
		path: '/contrib',
		name: 'Contribution',
		component: Home,
		props: {
			contributionDisplay: true
		}
	},
	{
		path: '/addart',
		name: 'AddArt',
		component: Home,
		props: {
			addArtModal: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Home,
		props: {
			registerModal: true
		},
	},
	{
		path: '/authenticate',
		name: 'Authenticate',
		component: Home,
		props: {
			authenticateDisplay: true
		}
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import(/* webpackChunkName: "about" */ '../components/Profile.vue')
		
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
