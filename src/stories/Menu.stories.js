import Menu from '../components/Menu.vue';
import ActionsMenu from '../components/ActionsMenu.vue';
import ActionsMenuItem from '../components/ActionsMenuItem.vue';
import Header from '../components/Header.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Menu',
	component: Menu,
	subComponent: { ActionsMenu, ActionsMenuItem, Header }
};

const Template = (args, { argTypes }) => ({
	components: { Menu, ActionsMenu, ActionsMenuItem, Header },
	props: Object.keys(argTypes),
	template: `
	<v-card
		class="mx-auto overflow-hidden"
		height="667"
		width="375">
	<v-btn
			fab
			color="primary"
			@click.stop="drawer = !drawer">
			<v-icon color="white">
				mdi-menu
			</v-icon>
		</v-btn>
	<Menu v-model="drawer" absolute=true>
	<Header style="height:160px" />
	<v-container>
		<ActionsMenu outlined=true>
			<ActionsMenuItem :icon="icon" :content="content" @click="clickAction1" />
			<v-divider />
			<ActionsMenuItem icon="mdi-account" content="content2" @click="clickAction2"/>
			<v-divider />
			<ActionsMenuItem icon="mdi-pencil" content="content3" @click="clickAction3"/>
			<v-divider />
			<ActionsMenuItem icon="mdi-delete" content="content4" @click="clickAction4"/>
		</ActionsMenu>
		</v-container>
	</Menu>
	</v-card>`,
	methods: {
		clickAction1: action('clickAction1'),
		clickAction2: action('clickAction2'),
		clickAction3: action('clickAction3'),
		clickAction4: action('clickAction4')
	},
	data () {
		return {
			drawer: false
		};
	}
});

export const MenuSample = Template.bind({});

MenuSample.args = {icon: 'mdi-camera', content:'content1'};
