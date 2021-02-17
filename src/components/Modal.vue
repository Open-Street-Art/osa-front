<template>
	<div
		ref="blur"
		class="blur"
		@click="closeModal"
		@mouseup="hideModal"
		@mousemove="moveModal">
		<div class="modal modal-mobile">
			<svg
				class="modal-arrow"
				width="52"
				height="16"
				viewBox="0 0 52 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				@mousedown="selectArrow">
				<path
					d="M2.47214 0C0.361689 0 -0.309935 2.84503 1.57771 3.78885L25.1056 15.5528C25.6686 15.8343 26.3314 15.8343 26.8944 15.5528L50.4223 3.78885C52.3099 2.84503 51.6383 0 49.5279 0H2.47214Z"
					fill="#FAFAFA" />
			</svg>
			<slot name="header" />
			<slot name="content" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Modal',
	data: function() {
		return {
			arrowDown: false,
		};
	},
	methods: {
		closeModal: function(event) {
			if(event.target == this.$refs.blur)
				console.log('click on blur !');
		},
		selectArrow: function(event) {
			this.arrowDown = true;
			console.log('arrow grabbed');
		},
		moveModal: function(event) {
			if(this.arrowDown) console.log('moving modal');
		},
		hideModal: function(event) {
			if(this.arrowDown) {
				this.arrowDown = false;
				console.log('trying to hide modal');
			}
		}
	}
};
</script>

<style lang="scss">
@import "../assets/styles/text.scss";

.blur {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  height: 100%;
  width: 100%;

  background-color: rgba(0,0,0,0.5);
}

.modal {
  position: absolute;
  background-color: $white-color;
  overflow: hidden;
}

.modal-mobile {
  top: 13px;
  left: 13px;
  border-radius: 20px 20px 0 0;
  height: calc(100% - 13px);
  width: calc(100% - 26px);

}

.modal-arrow {
  position: absolute;
  z-index: 100;
  top: 13px;
  left: 50%;
  transform: translateX(-50%);
}

</style>