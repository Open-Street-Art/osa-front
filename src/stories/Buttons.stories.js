import Buttons from '../components/Buttons.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Buttons',
	component: Buttons
};

const Template = (args, { argTypes }) => ({
	components: { Buttons },
	props: Object.keys(argTypes),
	template: '<Buttons />',
});

export const Bouton = Template.bind({});
