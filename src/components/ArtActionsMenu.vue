<template>
	<ActionsMenu>
		<ActionsMenuItem
			v-if="isAdmin"
			icon="mdi-pencil"
			content="artDisplay.changeArtAdmin"
			@click="changeArtAdmin" />
		<ActionsMenuItem
			v-if="isAdmin"
			icon="mdi-delete"
			content="artDisplay.deleteArt"
			@click="deleteArt" />
		<ActionsMenuItem
			v-if="!isFavourited && isAuthentified"
			icon="mdi-star-outline"
			content="artDisplay.addFavourite"
			@click="addToFavourite" />
		<ActionsMenuItem
			v-if="isFavourited && isAuthentified"
			icon="mdi-star"
			content="artDisplay.removeFavourite"
			@click="removeFavourite" />
		<ActionsMenuItem
			v-if="isAuthentified"
			icon="mdi-text-box-plus-outline"
			content="artDisplay.contribute"
			@click="contribute" />
		<ActionsMenuItem
			icon="mdi-map"
			content="artDisplay.displayRoute" />
		<ActionsMenuItem
			icon="mdi-flag-variant"
			content="artDisplay.reportArt" />
	</ActionsMenu>
</template>

<script>
import router from '../router';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import { EventBus } from '@/event-bus';

export default {
	name: 'ArtActionsMenu',
	components: {
		ActionsMenu,
		ActionsMenuItem,
	},
	data() {
		return {
			artId: this.$route.params.id,
			isFavourited: false,
			isAdmin: false,
			changeArtAdminModal: false,
			isAuthentified: false
		};
	},
	created() {
		// Récupere le role d'un utilisateur pour savoir si il est admin ou non
		var token = localStorage.getItem('authtoken');
		if (token != null) {
			var userInfo = jwt_decode(token);
			if (userInfo.roles === 'ROLE_ADMIN') {
				this.isAdmin = true;
			}
			// On récupère le profile de l'utilisateur pour savoir
			// si l'oeuvre est deja en favoris
			axios
				.get('/api/user/profile')
				.then((response) => {
					this.isAuthentified = true;
					for (const art of response.data.data.favArts) {
						if (art.id == this.artId) {
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
		},
		deleteArt() {
			if (this.isAdmin) {
				axios
					.delete('/api/admin/art/' + this.artId)
					.then((response) => {
						router.push('/');
						router.go();
					})
					.catch((error) => {
						if (error.response.status === 401) {
							EventBus.$emit('error', 'unauthorized');
						} else {
							EventBus.$emit('error', 'unknown');
						}
					});
			}
		},
		changeArtAdmin() {
			if(this.isAdmin) {
				this.$emit('changeArtAdmin');
			}
		},
		contribute() {
			this.$emit('modifyContrib');
		}
	}
};
</script>

<style>

</style>
