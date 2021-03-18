<template>
	<v-snackbar
		:value="value"
		:timeout="timeout"
		:color="color"
		rounded="pill"
		@input="$emit('update', $event)">
		{{ this.$t(content) }}
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
			default: 'defaultLabel'
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

<style scoped lang="scss">
	@import "../assets/styles/text.scss";

	.v-snack__content {
		text-align: center;
	}
</style>
