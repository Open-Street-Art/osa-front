import Sample from '../components/Sample.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Sample',
	component: Sample
};

const Template = (args, { argTypes }) => ({
	components: { Sample },
	props: Object.keys(argTypes),
	template: '<Sample />',
});

export const Test1 = Template.bind({});
