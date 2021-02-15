import Icon from '../components/Icon.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Icon',
	component: Icon
};

const Template = (args, { argTypes }) => ({
	components: { Icon },
	props: Object.keys(argTypes),
	template: '<Icon :iconType="iconType"/>',
});

export const icon = Template.bind({});
//Bouton.args={textButton: 'Par défaut'};
