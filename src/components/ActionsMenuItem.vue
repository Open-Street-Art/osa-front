<template>
	<v-list-item @click="$emit('click', $event)">
		<v-list-item-icon>
			<v-icon color="#C4C4C4">
				{{ icon }}
			</v-icon>
		</v-list-item-icon>
		<v-list-item-content>
			<v-list-item-title class="grey-emphase">
				{{ this.$t(content) }}
			</v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</template>

<script>
export default {
	name: 'ActionsMenuItem',
	props: {
		icon: {
			type: String,
			default: 'mdi-camera'
		},
		content: {
			type: String,
			default: 'defaultLabel'
		}
	}
};
</script>

<style lang="scss">
	@import "../assets/styles/text.scss";

  .v-list-item__icon {
    margin-right:10px !important;
    margin-bottom: 14px !important;
    margin-top: 18px !important;
    color: $light-color !important;
  }

  .v-list-item {
    height: 60px !important;
    margin-bottom:0px !important;
  }
</style>
