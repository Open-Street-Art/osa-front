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
					<td>Mon profile</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.profile }}
						</v-icon>
					</td>
					<td />
					<td>Chercher un utilisateur</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.profil }}
						</v-icon>
					</td>
					<td />
					<td>Outils d'administration</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#00baaf">
							{{ catalogProps.profile_box }}
						</v-icon>
					</td>
					<td />
					<td>Artiste favoris</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.palette }}
						</v-icon>
					</td>
					<td />
					<td>Proposer une oeuvre</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#00baaf">
							{{ catalogProps.palette }}
						</v-icon>
					</td>
					<td />
					<td>Oeuvre favorite</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.email }}
						</v-icon>
					</td>
					<td />
					<td>Email</td>
				</tr>
				<tr>
					<td>
						<v-icon color="#C4C4C4">
							{{ catalogProps.param }}
						</v-icon>
					</td>
					<td />
					<td>Parametre</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.logout }}
						</v-icon>
					</td>
					<td />
					<td>Déconnection</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.add }}
						</v-icon>
					</td>
					<td />
					<td>Ajouter une oeuvre</td>
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
					<td>Menu</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#00baaf">
							{{ catalogProps.geo }}
						</v-icon>
					</td>
					<td />
					<td>Carte</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#00baaf">
							{{ catalogProps.city }}
						</v-icon>
					</td>
					<td />
					<td>Ville favorite</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.key }}
						</v-icon>
					</td>
					<td />
					<td>Mot de passe</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.check }}
						</v-icon>
					</td>
					<td />
					<td>Valider la contribution</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.refuse }}
						</v-icon>
					</td>
					<td />
					<td>Refuser contribution</td>
				</tr>
			
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.edit }}
						</v-icon>
					</td>
					<td />
					<td>Modifier l'oeuvre</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.delete }}
						</v-icon>
					</td>
					<td />
					<td>Supprimer l'oeuvre</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.favoris }}
						</v-icon>
					</td>
					<td />
					<td>Ajouter au favoris</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.flag }}
						</v-icon>
					</td>
					<td />
					<td>Signaler l'oeuvre</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.map }}
						</v-icon>
					</td>
					<td />
					<td>Afficher l'itinéraire</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.export }}
						</v-icon>
					</td>
					<td />
					<td>Exporter</td>
				</tr>
				<tr>
					<td>
						<v-icon
							color="#C4C4C4">
							{{ catalogProps.oeuvre }}
						</v-icon>
					</td>
					<td />
					<td>Contribuer à l'oeuvre</td>
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
				export:'mdi-export',
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