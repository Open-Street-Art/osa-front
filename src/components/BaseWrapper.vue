<template>
	<div id="view">
		<Menu
			:value="value"
			app="true"
			@update="$emit('update', $event)">
			<v-container
				v-if="!connected"
				class="text-center">
				<v-row>
					<Button
						class="mx-auto my-4 logButton"
						text-button="home.login"
						outlined />
				</v-row>
				<v-row>
					<Button
						class="mx-auto mb-4 logButton"
						text-button="home.signin"
						@click="registerClicked" />
					<v-divider class="mx-auto" />
				</v-row>
			</v-container>
			<div
				v-if="connected">
				<Header style="height: 160px">
					<Photo
						class="mx-auto picture"
						:link-photo="placeholder"
						:forme="forme" />
					<p
						class="userDisplay titles mb-0 mt-2 ">
						{{ username }}
					</p>
					<p class="userDisplay emphase">
						{{ role }}
					</p>
				</Header>
			</div>
			<v-container>
				<ActionsMenu outlined="true">
					<ActionsMenuItem
						v-if="connected"
						icon="mdi-account"
						content="home.myProfile" />
					<v-divider class="mx-auto" />
					<ActionsMenuItem
						icon="mdi-account-search"
						content="home.searchUser" />
					<v-divider class="mx-auto" />
					<ActionsMenuItem
						icon="mdi-palette"
						content="home.commitArt" />
					<ActionsMenuItem
						v-if="admin"
						icon="mdi-plus-circle-outline"
						content="home.addArt" />
					<ActionsMenuItem
						v-if="admin"
						icon="mdi-account-cog"
						content="home.adminPanel" />
				</ActionsMenu>
			</v-container>
		</Menu>
		<slot />
		<Register
			:open="registerModal"
			@close="registerClosed" />
	</div>
</template>

<script>
import Menu from './Menu.vue';
import Header from './Header.vue';
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import Button from './Button.vue';
import Register from './Register.vue';
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
		Photo
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
		}
	},
	data() {
		return {
			registerModal: false,
			connected: false,
			admin: false,
			username: '',
			role:'',
			forme: 'forme-profile',
			placeholder: require('../assets/avatarPlaceholder.png')
		};
	},
	mounted() {
		if(this.register) {
			this.registerModal = true;
		}
		var token = localStorage.getItem('authtoken');
		if(token!=null) {
			axios.defaults.headers.common = {'Authorization': `bearer ${token}`};
			console.log(axios.defaults.headers.common);
			var userInfo = jwt_decode(token);
			this.connected = true;
			this.username = userInfo.sub;
			if(userInfo.roles === 'ROLE_USER') {
				this.role = 'Contributeur';
			}
			else if (userInfo.roles === 'ROLE_ADMIN') {
				this.role = 'Adminstrateur';
				this.admin = true;
			}
			else {
				this.role = 'Artiste';
			}
		}
		var userInfo = jwt_decode(token);
		console.log(userInfo);
	},
	methods : {
		registerClicked() {
			this.registerModal = !this.registerModal;
			router.push('/register');
		},
		registerClosed() {
			router.push('/');
			this.registerModal = !this.registerModal;
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

.userDisplay {
	text-align: center;
}
.picture {
	top:10px;
}
</style>
