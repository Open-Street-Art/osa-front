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
	name: 'Texts',
	props: {
		textClass: {
			default: 'base',
			type: String
		}
	}
};
</script>

<style lang="scss">
  @import "../assets/styles/text.scss";
</style>
