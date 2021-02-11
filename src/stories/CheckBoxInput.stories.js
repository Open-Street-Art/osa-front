import CheckBoxInput from '../components/CheckBoxInput.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'CheckBoxInput',
	component: CheckBoxInput,
};

const Template = (args, { argTypes }) => ({
	components: { CheckBoxInput },
	props: Object.keys(argTypes),
	template: '<CheckBoxInput @update="action"/>',
	methods: {
		action: action('update')
	}
});

export const CheckBoxInputSample = Template.bind({});
