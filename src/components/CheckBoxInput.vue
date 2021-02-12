<template>
	<v-switch
		color="primary"
		inset
		:value="value"
		@change="$emit('update', $event)" />
</template>

<script>
export default {
	name: 'CheckBoxInput',
	model: {
		prop: 'value',
		event: 'update'
	},
	data: function() {
		return {
			value: ''
		};
	}
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
