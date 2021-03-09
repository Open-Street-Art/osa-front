<template>
	<v-app>
		<v-main>
			<router-link to="/">
				Home
			</router-link>
			<router-link to="/register">
				Register
			</router-link>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			isProduction: process.env.NODE_ENV === 'production',
		};
	},
};
</script>

<style>
.v-navigation-drawer {
z-index: 999999 !important;
}

html {
	overflow: hidden !important;
}
</style>
