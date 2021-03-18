<template>
	<div>
		<v-bottom-sheet
			v-if="isMobile()"
			style="z-index:99999"
			transition="dialog-bottom-transition"
			max-width="98%"
			scrollable
			:value="value"
			@click:outside="$emit('close')">
			<v-card class="mobile-content rounded-t-xl">
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
		</v-bottom-sheet>
		<v-dialog
			v-if="!isMobile()"
			style="z-index:99999"
			transition="dialog-bottom-transition"
			max-width="120vh"
			content-class="rounded-xl"
			scrollable
			:value="value"
			@click:outside="$emit('close')">
			<v-card class="desktop-content rounded-xl">
				<svg
					class="modal-cross"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="white"
					width="18px"
					height="18px"
					@click="$emit('close')">
					<path
						d="M0 0h24v24H0z"
						fill="none" />
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
				</svg>
				<slot />
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import mobileDetection from './mixins/mobileDetection';

export default {
	name: 'Modal',
	mixins: [ mobileDetection ],
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	created() {
		this.isMobile();
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/_variables.scss";
.mobile-content {
	margin-top: 0px;
    background-color: $white-color;
    width: 90%;
    min-height: 100vh;
    overflow: hidden;
	margin-top: -9vh;
}

.desktop-content {
	min-height: 80vh;
	background-color: $white-color;
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

.modal-cross {
	position: absolute;
	z-index: 100;
	top: 20px;
	left: 20px;
}

.round {
  border-radius: 30px;
}
</style>
