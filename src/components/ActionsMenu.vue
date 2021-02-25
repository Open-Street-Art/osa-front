<template>
	<v-card
		class="mx-auto rounded-xl"
		max-width="300"
		:outlined="outlined"
		style="overflow: hidden">
		<v-list>
			<v-list-item-group
				color="primary">
				<slot />
			</v-list-item-group>
		</v-list>
	</v-card>
</template>

<script>
export default {
	name: 'ActionsMenu',
	props: {
		outlined: {
			default: false,
			type: Boolean
		}
	}
};
</script>

<style lang="scss">
@import "../assets/styles/text.scss";

.v-list {
	border-color: $light-color !important;
  padding: 0px !important
}

</style>
