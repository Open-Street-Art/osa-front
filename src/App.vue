<template>
	<v-app>
		<v-main>
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
