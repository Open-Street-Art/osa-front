import Searchbar from '../components/Searchbar.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Searchbar',
	component: Searchbar,
};

const Template = (args, { argTypes }) => ({
	components: { Searchbar },
	props: Object.keys(argTypes),
	template: '<v-container><Searchbar :labelString="labelString" :show="show" @update="action"/></v-container>',
	methods: {
		action: action('update')
	}
});

export const SearchbarSample = Template.bind({});

SearchbarSample.args = { labelString: 'default label', show: true};

