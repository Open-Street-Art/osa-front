import Buttons from '../components/Buttons.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Buttons',
	component: Buttons
};

const Template = (args, { argTypes }) => ({
	components: { Buttons },
	props: Object.keys(argTypes),
	template: '<Buttons :textButton="textButton"/>',
});

export const Bouton = Template.bind({});
Bouton.args={textButton: 'Par défaut'};
