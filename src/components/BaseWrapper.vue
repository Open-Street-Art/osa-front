<template>
	<div id="view">
		<Menu
			:value="value"
			app="true"
			@input="$emit('update', $event)">
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
						text-button="home.signin" />
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
	</div>
</template>

<script>
import Menu from './Menu.vue';
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import Button from './Button.vue';

export default {
	name: 'BaseWrapper',
	components: {
		Menu,
		ActionsMenu,
		ActionsMenuItem,
		Button
	},
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		value: {
			type: Boolean,
			default: false
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
