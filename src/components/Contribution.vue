<template>
	<div>
		<Modal
			v-model="data"
			@close="$emit('close')">
			<Header
				class="header">
				<h1
					v-if="!addArt && !changeArtAdmin"
					class="header-center header-title">
					{{ this.$t("contribution.title") }}
				</h1>
				<h1
					v-if="addArt"
					class="header-center header-title">
					{{ this.$t("contribution.addArttitle") }}
				</h1>
				<h1
					v-if="changeArtAdmin"
					class="header-center header-title">
					{{ this.$t("contribution.changeArtAdminTitle") }}
				</h1>
			</Header>
			<v-container class="pa-0">
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
						label-string="contribution.artName" />
				</v-row>
				<v-row class="pa-0 px-3 ma-0 mt-3">
					<TextInput
						v-model="artist"
						class="contrib-input"
						label-string="contribution.artist" />
				</v-row>
				<v-row class="pa-0 px-3 ma-0 mt-3">
					<v-divider />
				</v-row>
				<v-row class="pa-0 px-3 ma-0 mt-3">
					<TextArea
						v-model="description"
						placeholder="contribution.artDescription"
						:rows="descRows"
						:counter="descLimit" />
				</v-row>
				<v-row class="pa-0 px-3 ma-0 mt-3">
					<Button
						v-if="!changeArtAdmin && !modifyContrib"
						text-button="contribution.artLocalisation"
						:outlined="false"
						class="place-button"
						@click="locationPickerModal = true" />
				</v-row>
			</v-container>
			<v-container
				class="buttons">
				<v-divider />
				<v-row
					class="footer justify-space-around">
					<Button
						:width="155"
						text-button="contribution.cancel"
						:outlined="true"
						@click="$emit('close')" />
					<Button
						text-button="contribution.confirm"
						:outlined="false"
						:width="155"
						@click="sendContrib" />
				</v-row>
			</v-container>
		</Modal>
		<LocationPicker
			v-model="latlng"
			:data="locationPickerModal"
			@coordupdate="data => coordUpdated(data)"
			@close="locationPickerClosed" />
	</div>
</template>

<script>
import TextInput from '../components/TextInput.vue';
import TextArea from '../components/TextArea.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';
import MediaInput from '../components/MediaInput.vue';
import LocationPicker from '../components/LocationPicker.vue';
import router from '../router';
import mobileDetection from './mixins/mobileDetection';
import axiosArtService from './mixins/axiosArtService';
import axiosContribService from './mixins/axiosContribService';

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
	mixins: [
		mobileDetection,
		axiosArtService,
		axiosContribService
	],
	model: {
		prop: 'contributionModel',
		event: 'update'
	},
	props: {
		data: {
			type: Boolean,
			required: true
		},
		addArt: {
			type: Boolean,
			default: false
		},
		changeArtAdmin: {
			type: Boolean,
			default: false
		},
		modifyContrib: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			descLimit: 300,
			descRows: 8,
			name: '',
			artist: '',
			description: '',
			latlng: [],
			pic1: null,
			pic2: null,
			pic3: null,
			locationPickerModal: false
		};
	},
	watch: {
		data() {
			if (this.$route.params.id !== undefined)
				this.getArt(this.$route.params.id)
					.then((response) => {
						this.name = response.data.data.name;
						this.artist = response.data.data.authorName;
						this.description = response.data.data.description;
						this.pic1 = response.data.data.pictures[0];
						this.pic2 = response.data.data.pictures[1];
						this.pic3 = response.data.data.pictures[2];
						this.latlng[0] = response.data.data.latitude;
						this.latlng[1] = response.data.data.longitude;
					})
					.catch((error) => console.error(error));
		}
	},
	mounted() {
		window.addEventListener('keyup', this.sendContribOnEnter);
	},
	beforeDestroy() {
		window.removeEventListener('keyup', this.sendContribOnEnter);
	},
	methods : {
		sendContrib() {
			if (this.addArt) {
				this.addingArt();
			} else if (this.changeArtAdmin) {
				this.changeArtAdmin();
			} else if (this.modifyContrib) {
				this.sendContribOfArt();
			} else {
				this.postNewContrib(
					this.name, 
					this.description, 
					this.pic1, 
					this.pic2, 
					this.pic3, 
					this.artist, 
					this.latlng[0], 
					this.latlng[1]
				)
					.then((response) => {
						router.push('/');
						router.go();
					})
					.catch((error) => console.error(error));
			}
		},
		addingArt() {
			this.postArt(
				this.name,
				this.description,
				this.pic1,
				this.pic2,
				this.pic3,
				this.artist,
				this.latlng[0],
				this.latlng[1]
			).then((response) => {
				router.push('/');
				router.go();
			}).catch((error) => console.error(error));
		},
		changingArtAdmin() {
			this.patchArt(
				this.$route.params.id,
				this.name,
				this.description,
				this.pic1,
				this.pic2,
				this.pic3,
				this.artist
			).then((response) => {
				router.push('/');
				router.go();
			}).catch((error) => console.error(error));
		},
		locationPickerClosed() {
			this.locationPickerModal = false;
		},
		coordUpdated(coord) {
			this.latlng = coord;
		},
		sendContribOfArt() {
			this.postContrib(
				this.$route.params.id,
				this.name,
				this.description,
				this.pic1,
				this.pic2,
				this.pic3,
				this.artist
			).then((response) => {
				router.push('/');
				router.go();
			}).catch((error) => console.error(error));
		},
		sendContribOnEnter(event) {
			if (event.code == 'Enter' && this.data) {
				this.sendContrib();
			}
		}
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

.contrib-input {
	height: 40px;
}

.place-button {
	width: 100%;
}

.footer {
	margin-top: 12px;
	margin-bottom: 12px;
}

.buttons {
	position: absolute;
	bottom:0%;
	left: 50%;
	transform: translateX(-50%);
	padding-bottom:0%;
}

.v-bottom-sheet .buttons {
	bottom: 10px;
}

</style>
