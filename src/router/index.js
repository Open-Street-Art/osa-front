import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Administration from '../views/Administration.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		props: true,
	},
	{
		path: '/settings',
		name: 'SettingsMenu',
		component: Home,
		props: {
			settingsDisplay: true
		}
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
		path: '/art/:id/change',
		name: 'ChangeArt',
		component: Home,
		props: {
			changeArtAdminDisplay: true
		}
	},
	{
		path: '/city/:id',
		name: 'CityDisplay',
		component: Home,
		props: {
			cityDisplay: true
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
		path: '/admin',
		name: 'Admin',
		component: Administration,
		props: true 
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile
	},
	{
		path: '/profile/:id',
		name: 'UserProfile',
		component: Profile,

	},
	{
		path: '/editprofile',
		name: 'EditProfile',
		component: Profile,
		props: {
			editProfileDisplay: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
