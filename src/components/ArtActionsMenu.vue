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
	</ActionsMenu>
</template>

<script>
import axios from 'axios';
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import { EventBus } from '@/event-bus';

export default {
	name: 'ArtActionsMenu',
	components: {
		ActionsMenu,
		ActionsMenuItem
	},
	methods: {
		addToFavourite() {
			axios
				.post('/api/fav/art/' + this.$route.params.id)
				.then((response) => {
					EventBus.$emit('success', 'artActionsMenu.added');
				})
				.catch((error) => {
					if (error.response.status === 401) {
						EventBus.$emit('error', 'unauthorized');
					}
				});
		}
	}
};
</script>

<style>

</style>
