<template>
	<v-card
		class="mx-auto rounded-xl"
		max-width="300"
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
};
</script>

<style lang="scss">
.v-list {
  padding: 0px !important
}

</style>
