<template>
	<Modal
		v-model="data"
		@close="$emit('close')">
		<v-container v-if="isMobile()">
			<v-row>
				<v-img :src="image" />
			</v-row>
			<v-row>
				<v-col class="titles">
					{{ cityName }}
				</v-col>
			</v-row>
		</v-container>
		<v-row v-if="!isMobile()">
			<v-col cols="8">
				<v-img
					min-height="100%"
					:src="image" />
			</v-col>
			<v-col class="pl-0">
				<v-row class="mt-2">
					<v-col class="titles">
						{{ cityName }}
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</Modal>
</template>

<script>
import Modal from '../components/Modal.vue';
import axios from 'axios';
import mobileDetection from './mixins/mobileDetection';

export default {
	name: 'CityDisplay',
	components: {
		Modal
	},
	mixins: [ mobileDetection ],
	model: {
		prop: 'cityDisplayModel',
		event: 'update'
	},
	props: {
		data: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			cityName: '',
			image: ''
		};
	},
	watch: {
		data() {
			if (this.$route.params.id !== undefined)
			// On recupere les infos de la ville avec l'id dans la route
				axios
					.get('/api/city/' + this.$route.params.id)
					.then((response) => {
						this.cityName = response.data.data.name;
						// On recupere l'image de la premiere oeuvre de la recherche
						// de la ville correspondante
						axios
							.get('/api/search/cities/' + this.cityName)
							.then((resp) => {
								this.image = resp.data.data[0].pictures[0];
							})
							.catch((error) => console.error(error));
					})
					.catch((error) => console.error(error));
		}
	},
	created() {
		this.isMobile();
	},
	methods: {
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/text.scss";

.city-name {
	display: inline;
}
</style>
