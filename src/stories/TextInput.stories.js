import TextInput from '../components/TextInput.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'TextInput',
	component: TextInput,
};

const Template = (args, { argTypes }) => ({
	components: { TextInput },
	props: Object.keys(argTypes),
	template: '<TextInput :labelString="labelString" :show="show" @update="action"/>',
	methods: {
		action: action('update')
	}
});

export const TextInputSample = Template.bind({});

TextInputSample.args = { labelString: 'default label', show: true};

const Template2 = (args, { argTypes }) => ({
	components: { TextInput },
	props: Object.keys(argTypes),
	template: '<TextInput :labelString="labelString" :show="show" @update="action":inputRules="inputRules" />',
	methods: {
		action: action('update')
	}
});

export const RulesInputSample = Template2.bind({});

RulesInputSample.args = { labelString: 'default label', show: true, inputRules: [v => v.length >= 8 || 'Min 8 characters']};
