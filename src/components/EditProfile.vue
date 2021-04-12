<template>
	<div>
		<Modal
			v-model="data"
			@close="$emit('close')">
			<Header
				class="header" />
			
			<Photo
				class="positionPicture"
				link-photo="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg"
				:max-heigth="80"
				:max-width="80"
				forme="forme-profile" />
			<v-container class="pa-0">
				<v-row class="d-flex justify-start pa-0 ma-0 mt-3">
					<MediaInput 
						v-model="pic"
						:round="mi" 
						class="positionMediaInput" />
				</v-row>
				<v-row class="pa-0 px-3 ma-0 mt-3" />
				<v-row class="pa-0 px-3 ma-0 mt-3" />
				<v-row class="pa-0 px-3 ma-0 mt-3" />
				<v-row class="pa-0 px-3 ma-0 mt-3">
					<TextArea
						v-model="description"
						placeholder="myprofile.description"
						:rows="descRows"
						:counter="descLimit" />
				</v-row>
				<v-row class="pa-0 px-3 ma-0 mt-3 align-center d-flex justify-space-between">
					<p>{{ this.$t("myprofile.favoris") }}</p>
					<CheckBoxInput
						v-model="fav"
						class="pt-0 pb-1" />
				</v-row>
			</v-container>
			<v-container
				class="buttons">
				<v-divider />
				<v-row
					class="footer justify-space-around">
					<Button
						:width="155"
						text-button="myprofile.cancel"
						:outlined="true"
						@click="$emit('close')" />
					<Button
						v-if="!addArt && !changeArtAdmin"
						text-button="myprofile.confirm"
						:outlined="false"
						:width="155"
						@click="sendContrib" />
					<Button
						v-if="addArt"
						text-button="myprofile.confirm"
						:outlined="false"
						:width="155"
						@click="addingArt" />
					<Button
						v-if="changeArtAdmin"
						text-button="myprofile.confirm"
						:outlined="false"
						:width="155"
						@click="changingProfile" />
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
import CheckBoxInput from '../components/CheckBoxInput.vue';
import Photo from '../components/Photo.vue';
import TextArea from '../components/TextArea.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';
import MediaInput from '../components/MediaInput.vue';
import LocationPicker from '../components/LocationPicker.vue';
import axios from 'axios';
import router from '../router';
import mobileDetection from './mixins/mobileDetection';


export default {
	name: 'Contribution',
	components: {
		CheckBoxInput,
		Photo,
		TextArea,
		Button,
		Modal,
		Header,
		MediaInput,
		LocationPicker
	},
	mixins: [ mobileDetection ],
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
		}
	},
	data() {
		return {
			descLimit: 160,
			descRows: 8,
			name: '',
			artist: '',
			description: '',
			latlng: [],
			pic1: '',
			pic2: '',
			pic3: '',
			locationPickerModal: false,
			mi:true
		};
	},
	watch: {
		data() {
			if (this.$route.params.id !== undefined)
				axios
					.get('/api/art/' + this.$route.params.id)
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
	methods : {
		sendContrib() {
			axios
				.post('/api/contrib', {
					name: this.name,
					description: this.description,
					picture1: this.pic1,
					picture2: this.pic2,
					picture3: this.pic3,
					author: this.artist,
					latitude: this.latlng[0],
					longitude: this.latlng[1]
				})
				.then((response) => {
					router.push('/');
					router.go();
				})
				.catch((error) => console.error(error));
		},
		changingProfile() {
			axios
				.patch('/api/user/profile', {
					newDesc: this.description,
					newProfilePic:this.pic,
					newIsPublic:this.fav  

				})
				.then((response) => {
					router.push('/');
					router.go();
				})
				.catch((error) => console.error(error));
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
	left:0%;
	padding-bottom:0%;
}

.v-bottom-sheet .buttons {
	bottom: 10px;
}

.positionPicture{
	position: absolute;
	left:40%;
	top: 60px;
	border: 4px solid  #00BAAF;
	filter: brightness(50%);
}
 .positionMediaInput{
	position: absolute;
	left:40%;
	top: 60px;
}

</style>
