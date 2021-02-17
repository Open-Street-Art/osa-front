import Button from '../components/Button.vue';

export default {
	title: 'Button',
	component: Button
};

const Template = (args, { argTypes }) => ({
	components: { Button },
	props: Object.keys(argTypes),
	template: 
		`<v-container>
			<Button :textButton="textButton" :outlined="outlined" :width="width" />
		</v-container>`,
});

export const Bouton = Template.bind({});
Bouton.args = {
	textButton: 'Un bouton',
	outlined: 'false',
	width: undefined
};
