<template>
	<ActionsMenu>
		<ActionsMenuItem
			v-if="isAdmin"
			icon="mdi-check"
			content="contributionActionsMenu.accept"
			@click="acceptContrib" />
		<ActionsMenuItem
			v-if="isAdmin"
			icon="mdi-close"
			content="contributionActionsMenu.deny"
			@click="denyContrib" />
		<ActionsMenuItem
			v-if="isContributor"
			icon="mdi-delete"
			content="contributionActionsMenu.delete"
			@click="removeContrib" />
	</ActionsMenu>
</template>

<script>
import ActionsMenu from './ActionsMenu.vue';
import ActionsMenuItem from './ActionsMenuItem.vue';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
	name: 'ContributionActionsMenu',
	components: {
		ActionsMenu,
		ActionsMenuItem,
	},
	props: {
		contribId: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			isAdmin: false,
			isContributor: false
		};
	},
	watch: {
		contribId: {
			immediate: true,
			handler(old, ne) {
				// On vérifie si cette contribution nous appartient  ou que l'on est admin
				// pour savoir si on peux la supprimer/refuser/accepter
				var token = localStorage.getItem('authtoken');
				if (token != null) {
					axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
					var userInfo = jwt_decode(token);
					if (userInfo.roles === 'ROLE_ADMIN') {
						this.isAdmin = true;
					}
				}
				axios
					.get('/api/contrib/personnal')
					.then((response) => {
						for (var contrib of response.data.data) {
							if (contrib.id == this.contribId)
								this.isContributor = true;
						}
					})
					.catch((error) => console.error(error));
			}
		}
	},
	methods: {
		acceptContrib() {
			axios
				.post('/api/contrib/accept/' + this.contribId)
				.then((response) => {
					this.$emit('close');
				})
				.catch((error) => console.error(error));
		},
		denyContrib() {
			axios
				.post('/api/contrib/deny/' + this.contribId)
				.then((response) => {
					this.$emit('close');
				})
				.catch((error) => console.error(error));
		},
		removeContrib() {
			axios
				.delete('/api/contrib/' + this.contribId)
				.then((response) => {
					this.$emit('close');
				})
				.catch((error) => console.error(error));
		}
	}
};
</script>
