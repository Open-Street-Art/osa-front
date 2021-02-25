<template>
	<v-list-item @click="$emit('click', $event)">
		<v-list-item-icon>
			<v-icon>{{ icon }}</v-icon>
		</v-list-item-icon>
		<v-list-item-content>
			<v-list-item-title class="grey-emphase">
				{{ content }}
			</v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</template>

<script>
export default {
	name: 'ActionsMenu',
	props: {
		icon: {
			type: String,
			default: 'mdi-camera'
		},
		content: {
			type: String,
			default: 'default label'
		}
	}
};
</script>

<style lang="scss">
	@import "../assets/styles/text.scss";

  .v-list-item__icon {
    margin-right:10px !important
  }

  .v-list-item {
    height: 60px !important;
    margin-bottom:0px !important;
  }
</style>
