import Texts from './Texts.vue';
import { action } from '@storybook/addon-actions';



export default {
	title: 'Texts',
	component: Texts,
	argTypes: {
		textClass: {
			control: {
				type: 'select',
				options: ['base', 'title', 'light', 'button', 'button-white', 'emphase', 'light-emphase']
			}
		},
	}
};

const Template = (args, { argTypes }) => ({
	components: { Texts },
	props: Object.keys(argTypes),
	template: '<Texts :textClass="textClass" />',
});


export const Textes = Template.bind({});
