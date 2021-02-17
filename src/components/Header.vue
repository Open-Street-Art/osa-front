<template>
	<div :class="'header ' + (bigHeader?'header-big':'header-small')">
		<slot name="left" />
		<div class="header-title titles">
			{{ title }}
		</div>
		<slot name="right" />
	</div>
</template>

<script>
export default {
	name: 'Header',
	props: {
		bigHeader: {
			default: false,
			type: Boolean
		},
		title: {
			default: '',
			type: String
		}
	},
	watch: {
		bigHeader: function(newVal, oldVal) {
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		},
		title: function(newVal, oldVal) {
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		}
	}
};
</script>

<style lang="scss">
@import "../assets/styles/text.scss";

.header {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  overflow: hidden;

  transition: height 0.12s ease;

  background-color: $main-color;
}

.header-big {
  height: 100px;
}

.header-small {
  height: 60px;
}

.header-title {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

</style>