import Photo from '../components/Photo.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Photo',
	component: Photo,
	argTypes: {
		forme: {
			control: {
				type: 'select',
				options: ['forme-oeuvre', 'forme-profile']
			}
		},
	}
};

const Template = (args, { argTypes }) => ({
	components: { Photo },
	props: Object.keys(argTypes),
	template: '<Photo :linkPhoto="linkPhoto" :maxHeigth="maxHeigth" :maxWidth="maxWidth" :forme="forme"/>',
});

export const photo = Template.bind({});
photo.args={linkPhoto: 'https://picsum.photos/id/11/500/300' , maxHeigth : 150 , maxWidth : 250 ,forme :'forme-oeuvre' };


