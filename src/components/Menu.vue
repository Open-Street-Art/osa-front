<template>
	<v-navigation-drawer
		:value="value"
		:absolute="absolute"
		:app="app"
		width="323"
		temporary
		@input="$emit('update', $event)">
		<slot />
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'Menu',
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		absolute: {
			type: Boolean,
			default: false
		},
		app: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="scss">
	@import "../assets/styles/text.scss";
</style>
