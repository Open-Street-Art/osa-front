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
						text-button="myprofile.confirm"
						:outlined="false"
						:width="155"
						@click="changingProfile" />
				</v-row>
			</v-container>
		</Modal>
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
import axios from 'axios';
import router from '../router';
import mobileDetection from './mixins/mobileDetection';


export default {
	name: 'EditProfile',
	components: {
		CheckBoxInput,
		Photo,
		TextArea,
		Button,
		Modal,
		Header,
		MediaInput
	},
	mixins: [ mobileDetection ],
	model: {
		prop: 'editProfileModel',
		event: 'update'
	},
	props: {
		data: {
			type: Boolean,
			required: true
		},
	},
	data() {
		return {
			descLimit: 160,
			descRows: 8,
			description: '',
			pic: '',
			fav:false,
			mi:true
		};
	},
	watch: {
		data() {
			axios
				.get('/api/user/' + this.$route.params.user_id)
				.then((response) => {

					this.description = response.data.data.description;
					this.pic = response.data.data.profilePicture;
					
				})
				.catch((error) => console.error(error));
		}
	},
	methods : {
		
		changingProfile() {
			axios
				.patch('/api/user/profile', {
					newDesc: this.description,
					newIsPublic:this.fav ,
					newProfilePic:this.pic
					 
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
