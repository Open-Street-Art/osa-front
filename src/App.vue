<template>
	<v-app>
		<v-main>
			<v-app-bar v-if="!isProduction">
				<v-btn @click="$router.push({ path: '/' })">
					Open Street Art
				</v-btn>
				<v-btn @click="$router.push({ path: '/toolbox' })">
					Toolbox
				</v-btn>
			</v-app-bar>
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
