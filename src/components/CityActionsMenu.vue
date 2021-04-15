<template>
	<ActionsMenu>
		<ActionsMenuItem
			v-if="!isFavourited && isAuthentified"
			icon="mdi-star-outline"
			content="cityDisplay.addFavourite"
			@click="addToFavourite" />
		<ActionsMenuItem
			v-if="isFavourited && isAuthentified"
			icon="mdi-star"
			content="cityDisplay.removeFavourite"
			@click="removeFavourite" />
		<ActionsMenuItem
			icon="mdi-export-variant"
			content="cityDisplay.exportPDF" />
		<ActionsMenuItem
			icon="mdi-export-variant"
			content="cityDisplay.exportCSV" />
	</ActionsMenu>
</template>

<script>
import axios from 'axios';
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import { EventBus } from '@/event-bus';

export default {
	name: 'CityActionsMenu',
	components: {
		ActionsMenu,
		ActionsMenuItem
	},
	data() {
		return {
			cityId: this.$route.params.id,
			isFavourited: false,
			isAuthentified: false
		};
	},
	created() {
		// On récupère le profile de l'utilisateur pour savoir
		// si l'oeuvre est deja en favoris
		var token = localStorage.getItem('authtoken');
		if (token != null) {
			axios
				.get('/api/user/profile')
				.then((response) => {
					this.isAuthentified = true;
					for (const city of response.data.data.favCities) {
						if (city.id == this.cityId) {
							this.isFavourited = true;
							break;
						}
					}
				})
				.catch((error) => console.error(error));
		}
	},
	methods: {
		addToFavourite() {
			axios
				.post('/api/fav/city/' + this.cityId)
				.then((response) => {
					EventBus.$emit('success', 'cityActionsMenu.added');
					this.isFavourited = true;
				})
				.catch((error) => {
					if (error.response.status === 401) {
						EventBus.$emit('error', 'unauthorized');
					} else {
						EventBus.$emit('error', 'unknown');
					}
				});
		},
		removeFavourite() {
			axios
				.delete('/api/fav/city/' + this.cityId)
				.then((response) => {
					EventBus.$emit('success', 'cityActionsMenu.deleted');
					this.isFavourited = false;
				})
				.catch((error) => {
					if (error.response.status === 401) {
						EventBus.$emit('error', 'unauthorized');
					} else {
						EventBus.$emit('error', 'unknown');
					}
				});
		}
	}
};
</script>

<style>

</style>
