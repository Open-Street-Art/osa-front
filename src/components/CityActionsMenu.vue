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
			// axios
			// 	.get('/api/cities/' + this.cityId + '/arts')
			// 	.then((response) => {
			// 		let content = '<style>div { font-family: Arial, Helvetica, sans-serif; } </style>';
			// 		content += '<div style="margin-top: 25px;margin-bottom: 25px; margin-left: 50px; margin-right: 20px;">';
			// 		content += '<h1>Open Street Art</h1>';
			// 		content += '<h2>Liste des oeuvres de la ville : ' + response.data.data[0].city.name + '</h2>';
			// 		content += '<div style="margin-left: 20px"><ul>';
			// 		for (const art of response.data.data) {
			// 			content += '<li style="margin-top: 30px">';
			// 			// image
			// 			content += '<img style="float: right; max-width: 120px; margin-right: 50px; margin-top: 15px" src="' + art.pictures[0] + '" />';
			// 			// name
			// 			content += '<h3>' + art.name + '</h3>';
			// 			// author
			// 			content += '<h4>Auteur : ' + art.authorName + '</h4>';
			// 			// description
			// 			content += '<p>Description : ' + art.description + '</p>';
			// 			// creationDateTime
			// 			content += '<p>Date de création : ' + art.creationDateTime.split('T')[0] + '</p>';
			// 			content += '<p>Heure de création : ' + art.creationDateTime.split('T')[1].split('.')[0] + '</p>';
			// 			// longitude
			// 			content += '<p>Longitude : ' + art.longitude + '</p>';
			// 			// latitude
			// 			content += '<p>Latitude : ' + art.latitude + '</p>';
			// 			content += '</li>';
			// 		}
			// 		content += '</ul></div>';
			// 		content += '</div>';
			// 		html2pdf(content, {
			// 			filename: response.data.data[0].city.name + '_arts.pdf',
			// 		});
			// 	})
			// 	.catch((error) => console.error(error));
		}
	}
};
</script>

<style>

</style>
