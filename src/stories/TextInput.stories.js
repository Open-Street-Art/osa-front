import TextInput from '../components/TextInput.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'TextInput',
	component: TextInput,
};

const Template = (args, { argTypes }) => ({
	components: { TextInput },
	props: Object.keys(argTypes),
	template: '<v-container><TextInput :labelString="labelString" :show="show" /></v-container>',
});

export const TextInputSample = Template.bind({});

TextInputSample.args = { labelString: 'default label', show: true};

const Template2 = (args, { argTypes }) => ({
	components: { TextInput },
	props: Object.keys(argTypes),
	template: '<v-container><TextInput :labelString="labelString" :show="show" :inputRules="inputRules"  /></v-container>',
});

export const RulesInputSample = Template2.bind({});

RulesInputSample.args = { labelString: 'default label', show: true, inputRules: [v => v.length >= 8 || 'Min 8 characters']};
