<template>
	<div id="view">
		<Menu
			:value="value"
			:app="true"
			@update="$emit('update', $event)">
			<v-container
				v-if="!connected"
				class="text-center">
				<v-row>
					<Button
						class="mx-auto my-4 logButton"
						text-button="home.login"
						outlined
						@click="authenticateClicked" />
				</v-row>
				<v-row>
					<Button
						class="mx-auto mb-4 logButton"
						text-button="home.signin"
						@click="registerClicked" />
				</v-row>
				<v-divider class="mx-auto mt-4" />
			</v-container>
			<div
				v-if="connected">
				<Header style="height: 160px">
					<Photo
						class="mx-auto picture"
						:link-photo="(profilePicture != null) ? profilePicture : placeholder"
						:forme="forme" />
					<p
						class="userDisplay titles mb-0 mt-2 ">
						{{ username }}
					</p>
					<p class="userDisplay emphase">
						{{ this.$t(role) }}
					</p>
				</Header>
			</div>
			<v-container>
				<ActionsMenu :outlined="true">
					<ActionsMenuItem
						icon="mdi-home"
						content="home.home"
						@click="homeClicked" />
					<v-divider class="mx-auto" />
					<ActionsMenuItem
						v-if="connected"
						icon="mdi-account"
						content="home.myProfile"
						@click="profileClicked" />
					<v-divider class="mx-auto" />
					<ActionsMenuItem
						icon="mdi-account-search"
						content="home.searchUser"
						@click="searchUserClicked" />
					<v-divider class="mx-auto" />
					<ActionsMenuItem
						v-if="connected"
						icon="mdi-palette"
						content="home.commitArt"
						@click="contributionClicked" />
					<v-divider
						v-if="admin"
						class="mx-auto" />
					<ActionsMenuItem
						v-if="admin"
						icon="mdi-plus-circle-outline"
						content="home.addArt"
						@click="addArtClicked" />
					<v-divider
						v-if="admin"
						class="mx-auto" />
					<ActionsMenuItem
						v-if="admin"
						icon="mdi-account-cog"
						content="home.adminPanel"
						@click="adminClicked" />
				</ActionsMenu>
			</v-container>
			<v-btn
				class="accountSettings"
				fab
				small
				text
				@click="settingsClicked">
				<v-icon>mdi-cog</v-icon>
			</v-btn>
			<v-btn
				v-model="$i18n.locale"
				class="localeChanger"
				fab
				small
				@click="switchLocale">
				<div
					class="lang-icon"
					:style="langStyle" />
			</v-btn>
			<v-btn
				class="logout"
				fab
				small
				text
				@click="logout">
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</Menu>
		<slot />
		<Register
			:open="registerModal"
			@close="registerClosed" />
		<Authenticate
			:data="authenticateModal"
			@close="authenticateClosed" />
		<Contribution
			:data="contributionModal"
			@close="contributionClosed" />
		<Contribution
			:add-art="addingArt"
			:data="addArtModal"
			@close="addArtClosed" />
		<Settings
			:open="settingsModal"
			@close="settingsClosed" />
	</div>
</template>

<script>
import Menu from './Menu.vue';
import Header from './Header.vue';
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import Button from './Button.vue';
import store  from '../store/index.js';
import Register from './Register.vue';
import Authenticate from './Authenticate.vue';
import Contribution from './Contribution.vue';
import Settings from './Settings.vue';
import router from '../router';
import jwt_decode from 'jwt-decode';
import Photo from './Photo.vue';
import axios from 'axios';

export default {
	name: 'BaseWrapper',
	components: {
		Menu,
		ActionsMenu,
		ActionsMenuItem,
		Button,
		Register,
		Header,
		Photo,
		Contribution,
		Authenticate,
		Settings
	},
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		register: {
			default: false,
			type: Boolean
		},
		contributionDisplay: {
			default: false,
			type: Boolean
		},
		profileDisplay: {
			default: false,
			type: Boolean
		},
		settingsDisplay: {
			default: false,
			type: Boolean
		},
		addArt: {
			default: false,
			type: Boolean
		},
		authenticate: {
			default: false,
			type: Boolean
		}
	},
	data() {
		return {
			addingArt: true,
			registerModal: false,
			contributionModal: false,
			authenticateModal: false,
			addArtModal: false,
			settingsModal: false,
			connected: false,
			admin: false,
			username: '',
			role:'',
			forme: 'forme-profile',
			placeholder: require('@/assets/avatarPlaceholder.png'),
			langStyle: {},
			langIcon: '',
			profilePicture: null,
			langs: ['fr', 'en']
		};
	},
	mounted() {
		var token = localStorage.getItem('authtoken');
		if (token != null) {
			var currentTime = new Date().getTime() / 1000;
			var userInfo = jwt_decode(token);
			// On vérifie si le token est expiré
			if (currentTime < userInfo.exp) {
				axios.defaults.headers.common = {
					'Authorization': `Bearer ${token}`
				};
				this.connected = true;
				this.username = userInfo.sub;
				if (userInfo.roles === 'ROLE_USER') {
					this.role = 'contributor';
				}
				else if (userInfo.roles === 'ROLE_ADMIN') {
					this.role = 'administrator';
					this.admin = true;
				}
				else {
					this.role = 'artist';
				}
			} else {
				// Le token est expiré
				localStorage.removeItem('authtoken');
			}
			axios
				.get('/api/user/profile')
				.then((response) => {
					var array = response.data.data;
					this.profilePicture = array.profilePicture;
				})
	     		 .catch((error) => console.error(error));
		}
		if (this.register) {
			this.registerModal = true;
		}
		if (this.authenticate) {
			this.authenticateModal = true;
		}
		if (this.contributionDisplay) {
			this.contributionModal = true;
		}
		if (this.profileDisplay) {
			this.profileModal = true;
		}
		if (this.settingsDisplay) {
			this.settingsModal = true;
		}
		if(this.addArt) {
			if(this.role === 'administrator') {
				this.addArtModal = true;
			}
			else {
				router.push('/');
			}
		}
		this.langStyle = {
			'background-image' : 'url(/img/lang/' + this.$i18n.locale + '.png)'
		};
		//this.langIcon = '/img/lang/' + this.$i18n.locale + '.png';

	},
	methods : {
		addArtClicked() {
			this.addArtModal = !this.addArtModal;
			router.push('/addart');
		},
		addArtClosed() {
			this.addArtModal = !this.addArtModal;
			router.push('/');
		},
		registerClicked() {
			this.registerModal = !this.registerModal;
			router.push('/register');
		},
		registerClosed() {
			router.push('/');
			this.registerModal = !this.registerModal;
		},
		authenticateClicked() {
			this.authenticateModal = !this.authenticateModal;
			router.push('/authenticate');
		},
		authenticateClosed() {
			router.push('/');
			this.authenticateModal = !this.authenticateModal;
		},
		contributionClicked() {
			this.contributionModal = !this.contributionModal;
			router.push('/contrib');
		},
		contributionClosed() {
			router.push('/');
			this.contributionModal = false;
		},
		profileClicked() {
			router.push('/profile');
		},
		adminClicked() {
			router.push('/admin');
		},
		searchUserClicked() {
			router.push('/searchuser');
		},
		switchLocale() {
			if(this.$i18n.locale == this.langs[1]) {
				store.commit('setAppLanguage',this.langs[0]);
				this.$i18n.locale = this.langs[0];
			}
			else {
				this.$i18n.locale = this.langs[1];
				store.commit('setAppLanguage',this.langs[1]);
			}
			this.langStyle = {
				'background-image' : 'url(/img/lang/' + this.$i18n.locale + '.png)'
			};
		},
		logout() {
			localStorage.removeItem('authtoken');
			router.push('/');
			router.go();
		},
		homeClicked() {
			router.push('/');
			this.value = false;
		},
		settingsClicked() {
			this.settingsModal = true;
			router.push('/settings');
		},
		settingsClosed() {
			router.push('/');
			this.settingsModal = false;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/text.scss";

div.view {
	height: 100vh !important;
}

.v-divider {
	border-color: $light-color !important;
	width: 90%
}

.logButton {
	width: 297px;
}

.tempButton {
	position: fixed
}

.localeChanger {
	position: absolute;
	bottom: 10px;
	left: 50px;
}

.accountSettings {
	position: absolute;
	bottom: 10px;
	left: 10px;
}

.userDisplay {
	text-align: center;
}

.picture {
	top:10px;
}

.logout {
	position: absolute;
	bottom: 10px;
	right: 10px;
}

.lang-icon {
	width: 36px !important;
	height: 36px !important;

	border-radius: 50%;

	background-position: center center;
	background-size: cover;
}

</style>
