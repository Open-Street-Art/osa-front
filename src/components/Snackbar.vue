<template>
	<v-snackbar
		:value="value"
		:timeout="timeout"
		:color="color"
		rounded="pill"
		@input="$emit('update', $event)">
		{{ content }}
	</v-snackbar>
</template>

<script>
export default {
	name: 'Snackbar',
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		content: {
			type: String,
			default: 'default'
		},
		color: {
			type: String,
			default: 'success'
		},
		timeout: {
			type: Number,
			default: 2000
		},
		value: {
			type: Boolean,
			default: false
		}
	},
};
</script>

<style lang="scss">
			@import "../assets/styles/text.scss";

</style>
