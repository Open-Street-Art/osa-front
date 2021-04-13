<template>
	<v-switch
		v-model="switched"
		color="primary"
		inset
		@change="$emit('update', $event)" />
</template>

<script>
export default {
	name: 'CheckBoxInput',
	props: {
		switched: {
			default: false,
			type: Boolean
		}
	},
};
</script>

<style lang="scss">
@import "../assets/styles/text.scss";
      .v-input--switch__track {
        color: $light-color;
        opacity: 1 !important;
      }

      .theme--light.v-input--switch .v-input--switch__track {
          color: $light-color;
      }

      .v-input--switch__thumb {
        background-color: $white-color !important;
      }
</style>
