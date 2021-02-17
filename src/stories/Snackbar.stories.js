import Snackbar from '../components/Snackbar.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Snackbar',
	component: Snackbar,
};

const Template = (args, { argTypes }) => ({
	components: { Snackbar },
	props: Object.keys(argTypes),
	template: '<Snackbar v-model="snackbar" :content="content" :color="color"/>',
});

export const SnackbarSample = Template.bind({});

SnackbarSample.args = {content: 'default label', snackbar: false, color: 'success'};
