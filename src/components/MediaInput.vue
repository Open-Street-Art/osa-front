<template>
	<span
		class="fInput"
		:value="imageData">
		<input
			ref="fileIpt"
			type="file"
			accept="image/*"
			style="display: none"
			@change="previewImage">
		<v-btn
			:class="round ? 'rounded-circle' : ''"
			elevation="0"
			outlined
			height="80"
			width="80"
			:style="imageStyle"
			@click="$refs.fileIpt.click()">
			<v-icon large>
				mdi-camera-plus
			</v-icon>
		</v-btn>
	</span>
</template>

<script>
export default {
	name: 'MediaInput',
	model: {
		prop: 'imageDataProp',
		event: 'onFileInput'
	},
	props: {
		round: {
			default: false,
			type: Boolean
		},
		imageDataProp: {
			default: '',
			type: String
		}
	},
	data: function() {
		return {
			imageStyle: '',
			imageData: ''
		};
	},
	watch: {
		imageDataProp() {
			if(this.imageDataProp != '') {
				this.imageStyle = 'background: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("' + this.imageDataProp + '")';
			}
		}
	},
	methods: {
		previewImage(event) {
			var input = event.target;
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					this.imageData = e.target.result;
					this.imageStyle = 'background: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("' + this.imageData + '")';
					this.$emit('onFileInput',e.target.result);
				};
				reader.readAsDataURL(input.files[0]);
			}
		}
	}
};
</script>

<style scoped lang="scss">
			@import "../assets/styles/text.scss";

			.v-btn {
				color: $light-color !important;
				border-radius: 20px !important;
				background-size: cover !important;
			}
</style>
