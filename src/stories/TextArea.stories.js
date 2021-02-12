import TextArea from '../components/TextArea.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'TextArea',
	component: TextArea,
};

const Template = (args, { argTypes }) => ({
	components: { TextArea },
	props: Object.keys(argTypes),
	template: '<TextArea :placeholder="placeholder" :rows="rows" :counter="counter" @update="action"/>',
	methods: {
		action: action('update')
	}
});

export const TextAreaSample = Template.bind({});

TextAreaSample.args = { placeholder: 'Default', counter: 160, rows: 5};
