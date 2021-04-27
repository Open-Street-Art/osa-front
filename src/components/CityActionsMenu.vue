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
			content="cityDisplay.exportPDF"
			@click="exportPDF" />
		<ActionsMenuItem
			icon="mdi-export-variant"
			content="cityDisplay.exportCSV"
			@click="exportCSV" />
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
				.post('/api/fav/cities/' + this.cityId)
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
				.delete('/api/fav/cities/' + this.cityId)
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
		},
		exportCSV() {
			axios
				.get('/api/media/csv/' + this.cityId)
				.then((response) => {
					const blob = new Blob([response.data], { type: 'text/csv' });
					const link = document.createElement('a');
					link.href = URL.createObjectURL(blob);
					link.download = 'arts_list.csv';
					link.click();
					URL.revokeObjectURL(link.href);
				})
				.catch(console.error);
		},
		exportPDF() {
			axios
				.get('/api/media/pdf/' + this.cityId, { responseType: 'blob' })
				.then((response) => {
					const blob = new Blob([response.data], { type: 'application/pdf' });
					const link = document.createElement('a');
					link.href = URL.createObjectURL(blob);
					link.download = 'arts_list.pdf';
					link.click();
					URL.revokeObjectURL(link.href);
				})
				.catch(console.error);
		}
	}
};
</script>

<style>

</style>
