import TextInput from '../components/TextInput.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'TextInput',
	component: TextInput
};

const Template = (args, { argTypes }) => ({
	components: { TextInput },
	props: Object.keys(argTypes),
	template: '<v-container><TextInput /></v-container>',
});

export const TextInputSample = Template.bind({});
