import Modal from '../components/Modal.vue';
import Header from '../components/Header.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Modal',
	component: Modal, Header
};

const Template = (args, { argTypes }) => ({
	components: { Modal, Header },
	props: Object.keys(argTypes),
	template: `<v-container>
					<v-btn
						class="tempButton"
						fab
						color="primary"
						@click.stop="modal = !modal">
						Clic
					</v-btn>
					<Modal v-model="modal" @close="modal = !modal">
						<Header>
							<h1>Modal</h1>
						</Header>
						Sous le header
					</Modal>
				</v-container>`,
	methods: {
		action: action('update')
	},
	data () {
		return {
			modal: false
		};
	}
});

export const ModalSample = Template.bind({});
