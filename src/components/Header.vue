<template>
	<div :class="'header ' + (bigHeader?'header-big':'header-small')">
		<slot name="left" />
		<svg
			text
			class="modal-arrow"
			width="52"
			height="16"
			viewBox="0 0 52 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			@click="href = false">
			<path
				d="M2.47214 0C0.361689 0 -0.309935 2.84503 1.57771 3.78885L25.1056 15.5528C25.6686 15.8343 26.3314 15.8343 26.8944 15.5528L50.4223 3.78885C52.3099 2.84503 51.6383 0 49.5279 0H2.47214Z"
				fill="#FAFAFA" />
		</svg>
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
			default: 'Titre du header',
			type: String
		}
	},
	watch: {
		bigHeader: function(newVal, oldVal) {
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
.modal-arrow{
 position: absolute;
  z-index: 100;
  top: 13px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
