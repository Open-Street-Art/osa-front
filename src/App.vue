<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
		<Snackbar
			v-model="snackbar"
			class="snackbar"
			:timeout="2000"
			:content="snackbarMsg"
			:color="snackbarColor" />
	</v-app>
</template>

<script>
import { EventBus } from '@/event-bus';
import Snackbar from './components/Snackbar.vue';

export default {
	name: 'App',
	components: {
		Snackbar
	},
	data() {
		return {
			isProduction: process.env.NODE_ENV === 'production',
			snackbar: false,
			snackbarMsg: '',
			snackbarColor: 'success'
		};
	},
	mounted () {
		EventBus.$on('error', this.triggerSnackError);
		EventBus.$on('success', this.triggerSnackSuccess);
	},
	methods: {
		triggerSnackError(message) {
			this.snackbarMsg = message;
			this.snackbarColor = 'error';
			this.snackbar = true;
		},
		triggerSnackSuccess(message) {
			this.snackbarMsg = message;
			this.snackbarColor = 'success';
			this.snackbar = true;
		}
	},
};
</script>

<style>
.v-navigation-drawer {
	z-index: 9999 !important;
}

html {
	overflow: hidden !important;
}
</style>
