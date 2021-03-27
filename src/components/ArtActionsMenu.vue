<template>
	<ActionsMenu>
		<ActionsMenuItem
			icon="mdi-star-outline"
			content="artDisplay.addFavourite"
			@click="addToFavourite" />
		<ActionsMenuItem
			icon="mdi-text-box-plus-outline"
			content="artDisplay.contribute" />
		<ActionsMenuItem
			icon="mdi-map"
			content="artDisplay.displayRoute" />
		<ActionsMenuItem
			icon="mdi-flag-variant"
			content="artDisplay.reportArt" />
		<Snackbar
			v-model="addedToFavourite"
			color="success"
			content="artActionsMenu.added" />
		<Snackbar
			v-model="unauthorized"
			color="error"
			content="unauthorized" />
	</ActionsMenu>
</template>

<script>
import axios from 'axios';
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import Snackbar from './Snackbar.vue';
export default {
	name: 'ArtActionsMenu',
	components: {
		ActionsMenu,
		ActionsMenuItem,
		Snackbar
	},
	data() {
		return {
			addedToFavourite: false,
			unauthorized: false
		};
	},
	methods: {
		addToFavourite() {
			console.log('/api/fav/art/' + this.$route.params.id);
			axios
				.post('/api/fav/art/' + this.$route.params.id)
				.then((response) => {
					this.addedToFavourite = true;
				})
				.catch((error) => {
					if (error.response.status === 401) {
						this.unauthorized = true;
					}
				});
		}
	}
};
</script>

<style>

</style>
