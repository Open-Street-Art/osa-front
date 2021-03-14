import Header from '../components/Header.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Header',
	component: Header,
};

const Template = (args, { argTypes }) => ({
	components: { Header },
	props: Object.keys(argTypes),
	template: ` <v-container>
					<Header>
						<h1>Exemple</h1>
					</Header>
				</v-container>`,
	methods: {
		action: action('update')
	}
});

export const HeaderSample = Template.bind({});
HeaderSample.args = { bigHeader: false, title: 'Titre du header'};

