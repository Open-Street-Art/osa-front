<template>
	<div id="app">
		<div>
			<table>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.Profile }}
						</v-icon>
					</td>
					<td />
					<td>Mon profile ({{ catalogProps.Profile }})</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.profile }}
						</v-icon>
					</td>
					<td />
					<td>Chercher un utilisateur ({{ catalogProps.profile }})</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.profil }}
						</v-icon>
					</td>
					<td />
					<td>Outils d'administration ({{ catalogProps.profil }})</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#00baaf">
							{{ catalogProps.profile_box }}
						</v-icon>
					</td>
					<td />
					<td>Artiste favoris ({{ catalogProps.profile_box }})</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.palette }}
						</v-icon>
					</td>
					<td />
					<td>Proposer une oeuvre ({{ catalogProps.palette }})</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#00baaf">
							{{ catalogProps.palette }}
						</v-icon>
					</td>
					<td />
					<td>Oeuvre favorite ({{ catalogProps.palette }})</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.email }}
						</v-icon>
					</td>
					<td />
					<td>Email ({{ catalogProps.email }})</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.param }}
						</v-icon>
					</td>
					<td />
					<td>Parametre ({{ catalogProps.param }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.logout }}
						</v-icon>
					</td>
					<td />
					<td>Déconnection ({{ catalogProps.logout }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.add }}
						</v-icon>
					</td>
					<td />
					<td>Ajouter une oeuvre ({{ catalogProps.add }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#fff"
							class="menu">
							{{ catalogProps.menu }}
						</v-icon>
					</td>
					<td />
					<td>Menu ({{ catalogProps.menu }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#00baaf">
							{{ catalogProps.geo }}
						</v-icon>
					</td>
					<td />
					<td>Carte ({{ catalogProps.geo }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#00baaf">
							{{ catalogProps.city }}
						</v-icon>
					</td>
					<td />
					<td>Ville favorite ({{ catalogProps.city }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.key }}
						</v-icon>
					</td>
					<td />
					<td>Mot de passe ({{ catalogProps.key }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.check }}
						</v-icon>
					</td>
					<td />
					<td>Valider la contribution ({{ catalogProps.check }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.refuse }}
						</v-icon>
					</td>
					<td />
					<td>Refuser contribution ({{ catalogProps.refuse }})</td>
				</tr>
			
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.edit }}
						</v-icon>
					</td>
					<td />
					<td>Modifier l'oeuvre ({{ catalogProps.edit }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.delete }}
						</v-icon>
					</td>
					<td />
					<td>Supprimer l'oeuvre ({{ catalogProps.delete }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.favoris }}
						</v-icon>
					</td>
					<td />
					<td>Ajouter au favoris ({{ catalogProps.favoris }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.flag }}
						</v-icon>
					</td>
					<td />
					<td>Signaler l'oeuvre ({{ catalogProps.flag }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.map }}
						</v-icon>
					</td>
					<td />
					<td>Afficher l'itinéraire ({{ catalogProps.map }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.export }}
						</v-icon>
					</td>
					<td />
					<td>Exporter ({{ catalogProps.export }})</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.oeuvre }}
						</v-icon>
					</td>
					<td />
					<td>Contribuer à l'oeuvre ({{ catalogProps.oeuvre }})</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
export default {
	name:'Icon',
	props: {
		iconType: {
			default: 'mdi-account',
			type: String
		}
	},
	data() {
		return {
			catalogProps:{
				Profile: 'mdi-account',
				profile:'mdi-account-search',
				profil:'mdi-account-cog',
				email:'mdi-email',
				palette:'mdi-palette',
				param:'mdi-cog',
				logout:'mdi-logout',
				add:'mdi-plus-circle-outline',
				menu:'mdi-menu',
				geo:'mdi-crosshairs-gps',
				profile_box:'mdi-account-box',
				city:'mdi-city',
				key:'mdi-key',
				check:'mdi-check',
				refuse:'mdi-close',
				edit:'mdi-pencil',
				delete:'mdi-delete',
				favoris:'mdi-star-outline',
				flag:'mdi-flag-variant',
				map:'mdi-map',
				export:'mdi-export-variant',
				oeuvre:'mdi-text-box-plus-outline'
			},
		};
	}
};
</script>
<style lang="scss">
.menu{
    background: #00baaf;   
}

</style>