import ActionsMenu from '../components/ActionsMenu.vue';
import ActionsMenuItem from '../components/ActionsMenuItem.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'ActionsMenu',
	component: ActionsMenu,
	subComponent: { ActionsMenuItem }
};

const Template = (args, { argTypes }) => ({
	components: { ActionsMenu, ActionsMenuItem },
	props: Object.keys(argTypes),
	template:
	`<ActionsMenu>
		<ActionsMenuItem :icon="icon" :content="content" @click="clickAction1" />
		<v-divider />
		<ActionsMenuItem icon="mdi-account" content="content2" @click="clickAction2"/>
		<v-divider />
		<ActionsMenuItem icon="mdi-pencil" content="content3" @click="clickAction3"/>
		<v-divider />
		<ActionsMenuItem icon="mdi-delete" content="content4" @click="clickAction4"/>
	</ActionsMenu>`,
	methods: {
		clickAction1: action('clickAction1'),
		clickAction2: action('clickAction2'),
		clickAction3: action('clickAction3'),
		clickAction4: action('clickAction4')
	}
});

export const ActionsMenuSample = Template.bind({});

ActionsMenuSample.args = {icon: 'mdi-camera', content:'content1'};
