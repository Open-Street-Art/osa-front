<template>
	<ActionsMenu>
		<ActionsMenuItem
			v-if="!isFavourited"
			icon="mdi-star-outline"
			content="artDisplay.addFavourite"
			@click="addToFavourite" />
		<ActionsMenuItem
			v-if="isFavourited"
			icon="mdi-star"
			content="artDisplay.removeFavourite"
			@click="removeFavourite" />
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
	data() {
		return {
			artId: this.$route.params.id,
			isFavourited: false,
			isAdmin: false
		};
	},
	created() {
		// On récupère le profile de l'utilisateur pour savoir
		// si l'oeuvre est deja en favoris
		axios
			.get('/api/user/profile')
			.then((response) => {
				for (const art of response.data.data.favArts) {
					if (art.id == this.artId) {
						this.isFavourited = true;
						break;
					}
				}
			})
			.catch((error) => console.error(error));
		
		//recupere le role d'un utilisateur pour savoir si il est admin ou non
		var token = localStorage.getItem('authtoken');
		if(token!=null) {
			axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
			var userInfo = jwt_decode(token);
			if (userInfo.roles === 'ROLE_ADMIN') {
				this.isAdmin = true;
			}
		}
	},
	methods: {
		addToFavourite() {
			axios
				.post('/api/fav/art/' + this.artId)
				.then((response) => {
					EventBus.$emit('success', 'artActionsMenu.added');
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
				.delete('/api/fav/art/' + this.artId)
				.then((response) => {
					EventBus.$emit('success', 'artActionsMenu.deleted');
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
