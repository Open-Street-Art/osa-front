<template>
	<div class="header">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Header'
};
</script>

<style lang="scss">
@import "../assets/styles/_variables.scss";
.header {
	background-color: $main-color;
	height: 40px;
}
</style>
