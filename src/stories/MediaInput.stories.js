import MediaInput from '../components/MediaInput.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'MediaInput',
	component: MediaInput,
};

const Template = (args, { argTypes }) => ({
	components: { MediaInput },
	props: Object.keys(argTypes),
	template: '<MediaInput :round="round" :colored="colored" @onFileInput="action"></MediaInput>',
	methods: {
		action: action('onFileInput')
	}
});

export const MediaInputSample = Template.bind({});

MediaInputSample.args = {round: false, colored: false};
