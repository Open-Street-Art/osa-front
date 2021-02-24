import Button from '../components/Button.vue';
import LocaleChanger from './LocaleChanger.vue';
export default {
	title: 'Button',
	component: Button,LocaleChanger
};

const Template = (args, { argTypes }) => ({
	components: { Button , LocaleChanger},
	props: Object.keys(argTypes),
	template: 
		`<v-container>
			<Button :textButton="textButton" :outlined="outlined" :width="width" />
			<LocaleChanger></LocaleChanger>
		</v-container>`,
});

export const Bouton = Template.bind({});
Bouton.args = {
	textButton: 'defaultLabel',
	outlined: 'false',
	width: undefined
};
