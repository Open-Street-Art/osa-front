<template>
	<div id="view">
		<Menu
			:value="value"
			app="true"
			@update="$emit('update', $event)">
			<v-container class="text-center">
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
				</v-row>
			</v-container>
			<v-divider class="mx-auto" />
			<v-container>
				<ActionsMenu outlined="true">
					<ActionsMenuItem
						icon="mdi-account-search"
						content="home.searchUser" />
					<v-divider class="mx-auto" />
					<ActionsMenuItem
						icon="mdi-palette"
						content="home.commitArt" />
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
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import Button from './Button.vue';
import Register from './Register.vue';
import router from '../router';

export default {
	name: 'BaseWrapper',
	components: {
		Menu,
		ActionsMenu,
		ActionsMenuItem,
		Button,
		Register
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
			registerModal: false
		};
	},
	mounted() {
		if(this.register) {
			this.registerModal = true;
		}
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

</style>
