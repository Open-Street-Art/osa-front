<template>
	<v-dialog
		transition="dialog-bottom-transition"
		:value="value">
		<v-card class="content rounded-t-xl">
			<svg
				class="modal-arrow"
				width="52"
				height="16"
				viewBox="0 0 52 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				@click="$emit('close')">
				<path
					d="M2.47214 0C0.361689 0 -0.309935 2.84503 1.57771 3.78885L25.1056 15.5528C25.6686 15.8343 26.3314 15.8343 26.8944 15.5528L50.4223 3.78885C52.3099 2.84503 51.6383 0 49.5279 0H2.47214Z"
					fill="#FAFAFA" />
			</svg>
			<slot />
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	name: 'Modal',
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		value: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/_variables.scss";
.content {
    position: absolute;
    background-color: $white-color;
    width: 90%;
    height: 98%;
    bottom: 0;
    left: 0px;
    right: 0px;
    margin: auto;
    overflow: hidden;
}

.modal-arrow {
    position: absolute;
    z-index: 100;
    top: 13px;
    left: 50%;
    transform: translateX(-50%);
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
}
</style>
