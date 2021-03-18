<template>
	<Modal
		v-model="data"
		@close="$emit('close')">
		<Header
			class="header">
			<h1 class="header-center header-title">
				{{ this.$t("contribution.title") }}
			</h1>
		</Header>
		<v-container class="pa-0 contrib-container">
			<v-row class="d-flex justify-start pa-0 ma-0 mt-3">
				<MediaInput
					v-model="pic1"
					class="ml-3" />
				<MediaInput
					v-model="pic2"
					class="ml-3" />
				<MediaInput
					v-model="pic3"
					class="ml-3" />
			</v-row>
			<v-row class="pa-0 px-3 ma-0 mt-3">
				<TextInput
					v-model="name"
					class="contrib-input"
					label-string="contribution.artName"
					show
					:input-rules="[null]" />
			</v-row>
			<v-row class="pa-0 px-3 ma-0 mt-3">
				<TextInput
					v-model="artist"
					class="contrib-input"
					label-string="contribution.artist"
					show
					:input-rules="[null]" />
			</v-row>
			<v-row>
				<v-divider class="mb-3" />
			</v-row>
			<v-row class="pa-0 px-3 ma-0 mt-3">
				<TextArea
					v-model="description"
					placeholder="contribution.artDescription"
					show
					rows="8"
					counter="160"
					:input-rules="[null]" />
			</v-row>
			<v-row class="pa-0 px-3 ma-0 mt-3">
				<Button
					text-button="contribution.artLocalisation"
					:outlined="false"
					class="place-button"
					@click="locationPickerModal = true" />
			</v-row>
			<v-row class="contrib-footer ma-0">
				<v-container class="ma-0 pa-0">
					<v-divider class="mb-3" />
				</v-container>
				<v-container class="pa-0 px-3 ma-0 d-flex justify-space-between">
					<Button
						text-button="contribution.cancel"
						:outlined="true"
						class="footer-button" />
					<Button
						text-button="contribution.confirm"
						:outlined="false"
						class="footer-button"
						@click="sendContrib" />
				</v-container>
			</v-row>
		</v-container>
		<LocationPicker
			:data="locationPickerModal"
			@coordupdate="data => coordUpdated(data)"
			@close="locationPickerClosed" />
	</Modal>
</template>

<script>
import TextInput from '../components/TextInput.vue';
import TextArea from '../components/TextArea.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';
import MediaInput from '../components/MediaInput.vue';
import LocationPicker from '../components/LocationPicker.vue';


export default {
	name: 'Contribution',
	components: {
		TextInput,
		TextArea,
		Button,
		Modal,
		Header,
		MediaInput,
		LocationPicker
	},
	model: {
		prop: 'contributionModel',
		event: 'update'
	},
	props: {
		data: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			name: '',
			artist: '',
			description: '',
			latlng: [],
			pic1: '',
			pic2: '',
			pic3: '',
			locationPickerModal: false
		};
	},
	methods : {
		sendContrib() {

		},
		locationPickerClosed() {
			this.locationPickerModal = false;
		},
		coordUpdated(coord) {
			this.latlng = coord;
			console.log(coord);
		},
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/input.scss";
@import "../assets/styles/text.scss";

.header {
	min-height: 100px;
}

.header-center {
	margin-top: 58px;
	text-align: center;
}

.contrib-container {
	position: relative;
	height: calc(100vh - 122px);
}

.contrib-input {
	height: 40px;
}

.place-button {
	width: 100%;
}

.contrib-footer {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
}

.footer-button {
	width: 48%;
}
</style>
