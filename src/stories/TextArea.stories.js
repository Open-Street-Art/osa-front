import TextArea from '../components/TextArea.vue';
import LocaleChanger from './LocaleChanger.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'TextArea',
	component: TextArea, LocaleChanger
};

const Template = (args, { argTypes }) => ({
	components: { TextArea, LocaleChanger },
	props: Object.keys(argTypes),
	template: '<v-container><TextArea :placeholder="placeholder" :rows="rows" :counter="counter" @update="action"/><LocaleChanger></LocaleChanger></v-container>',
	methods: {
		action: action('update')
	}
});

export const TextAreaSample = Template.bind({});

TextAreaSample.args = { placeholder: 'defaultLabel', counter: 160, rows: 5};
