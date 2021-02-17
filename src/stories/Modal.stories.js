import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Modal',
	component: Modal,
};

const Template = (args, { argTypes }) => ({
	components: { Modal },
	props: Object.keys(argTypes),
	template: '<v-container><Modal/></v-container>',
	methods: {
		action: action('update')
	}
});

const TemplateHeader = (args, { argTypes }) => ({
	components: { Modal, Header },
	props: Object.keys(argTypes),
	template: '<v-container><Modal><template v-slot:header><Header bigHeader=true title="Titre du modal"/></template></Modal></v-container>',
	methods: {
		action: action('update')
	}
});

export const ModalSample = Template.bind({});

export const ModalWithHeader = TemplateHeader.bind({});

