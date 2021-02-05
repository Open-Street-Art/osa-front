<template>
	<v-container>
		<p :class="textClass">
			Sample Text
		</p>
		<p>
			class =  {{ textClass }}
		</p>
	</v-container>
</template>

<script>
export default {
	name: 'Sample',
	props: {
		textClass: {
			default: 'base',
			type: String
		}
	},
	watch: {
      	textClass: function(newVal, oldVal) { // watch it
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		}
	}
};
</script>

<style lang="scss">
  @import "../assets/styles/text.scss";
</style>
