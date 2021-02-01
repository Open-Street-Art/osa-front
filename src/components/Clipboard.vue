<template>
	<v-card
		class="d-flex justify-space-between"
		outline
		tile>
		<slot />
		<v-btn
			v-clipboard="code"
			small
			color="secondary"
			class="mt-2 mr-2">
			<v-icon>
				mdi-content-copy
			</v-icon>
		</v-btn>
	</v-card>
</template>

<script>

export default {
	name: 'Clipboard',
	props: {
		code: {
			type: String,
			required: true
		}
	}
};
</script>

<style>
.v-card {
	width: 600px;
}
</style>
