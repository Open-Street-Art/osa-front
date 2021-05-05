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
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import { EventBus } from '@/event-bus';
import axiosUserService from './mixins/axiosUserService';
import axiosFavService from './mixins/axiosFavService';
import axiosMediaService from './mixins/axiosMediaService';

export default {
	name: 'CityActionsMenu',
	components: {
		ActionsMenu,
		ActionsMenuItem
	},
	mixins: [
		axiosUserService,
		axiosFavService,
		axiosMediaService
	],
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
			this.getOwnProfile()
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
			this.addCityToFavourites(this.cityId)
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
			this.removeCityFromFavourites(this.cityId)
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
			this.exportArtsInCSV(this.cityId)
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
			this.exportArtsInPDF(this.cityId)
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
