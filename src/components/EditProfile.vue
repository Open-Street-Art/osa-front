<template>
	<div>
		<Modal
			v-model="data"
			@close="$emit('close')">
			<Header class="header" />
			<v-container class="media-header">
				<v-row class="d-flex justify-center">
					<MediaInput
						v-model="profilePic"
						class="media-border"
						:round="true"
						:colored="true" />
				</v-row>
				<v-row>
					<TextArea
						v-model="description"
						class="ma-3"
						placeholder="editProfile.description"
						:rows="10"
						:counter="160" />
				</v-row>
				<v-row>
					<v-col
						class="ml-2"
						cols="8"
						md="2">
						{{ this.$t("editProfile.favoris") }}
					</v-col>
					<v-col>
						<CheckBoxInput
							v-model="isPublic"
							class="mt-0 ml-2" />
					</v-col>
				</v-row>
			</v-container>
			<v-container
				class="buttons">
				<v-divider />
				<v-row
					class="footer justify-space-around">
					<Button
						:width="155"
						text-button="editProfile.cancel"
						:outlined="true"
						@click="$emit('close')" />
					<Button
						text-button="editProfile.confirm"
						:outlined="false"
						:width="155"
						@click="updateProfile" />
				</v-row>
			</v-container>
		</Modal>
	</div>
</template>

<script>
import CheckBoxInput from '../components/CheckBoxInput.vue';
import TextArea from '../components/TextArea.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';
import MediaInput from '../components/MediaInput.vue';
import axios from 'axios';
import mobileDetection from './mixins/mobileDetection';
import router from '../router';
import axiosUserService from './mixins/axiosUserService';

export default {
	name: 'EditProfile',
	components: {
		CheckBoxInput,
		TextArea,
		Button,
		Modal,
		Header,
		MediaInput
	},
	mixins: [
		mobileDetection,
		axiosUserService
	],
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
			description: '',
			profilePic: '',
			isPublic: false,
			placeholder: require('@/assets/avatarPlaceholder.png'),
		};
	},
	mounted() {
		var token = localStorage.getItem('authtoken');
		if(token != null) {
			axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
		}
		this.loadInfo();

		window.addEventListener('keyup', this.updateOnEnter);
	},
	beforeDestroy() {
		window.removeEventListener('keyup', this.updateOnEnter);
	},
	methods : {
		loadInfo() {
			this.getOwnProfile()
				.then((response) => {
					this.description = response.data.data.description;
					if(response.data.data.profilePicture != null) {
						this.profilePic = response.data.data.profilePicture;
					}
					else
					 {
						this.profilePic = this.placeholder;
					 }
					this.isPublic = response.data.data.isPublic;
					if(this.isPublic == null)
						this.isPublic = false;
				})
				.catch((error) => console.error(error));
		},
		updateProfile() {
			this.patchProfile(
				this.description,
				this.profilePic,
				this.isPublic
			).then((response) => {
				router.push('/profile');
				router.go();

			}).catch((error) => console.error(error));
		},
		updateOnEnter(event) {
			if (event.code == 'Enter' && this.data) {
				this.updateProfile();
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

.media-header {
	margin-top: -37px;
}


</style>
