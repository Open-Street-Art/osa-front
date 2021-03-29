<template>
	<v-app>
		<v-main>
			<router-link to="/profile">
				Profile
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
z-index: 9999 !important;
}

html {
	overflow: hidden !important;
}
</style>
