<template>
	<div
		v-if="profileInfoLoaded && contributionsLoaded"
		id="id">
		<BaseWrapper
			v-model="drawer">
			<Header class="profile-header">
				<v-row
					dense
					class="pt-1 px-1"
					justify="space-between">
					<v-btn
						left
						fab
						text
						small
						color="primary"
						@click.stop="drawer = !drawer">
						<v-icon color="white">
							mdi-menu
						</v-icon>
					</v-btn>
					<v-btn
						v-if="userProfile"
						right
						fab
						text
						small
						color="primary"
						@click.stop="editProfileClicked">
						<v-icon color="white">
							mdi-pencil
						</v-icon>
					</v-btn>
					<v-btn
						v-if="!userProfile"
						class="editButton"
						right
						fab
						text
						small
						color="primary"
						@click.stop="favouriteClicked">
						<v-icon
							v-if="isFavourited"
							color="white">
							mdi-star
						</v-icon>
						<v-icon
							v-if="!isFavourited"
							color="white">
							mdi-star-outline
						</v-icon>
					</v-btn>
				</v-row>
				<v-row
					class="emphase pt-2 pl-8 header-row"
					align="center">
					<Photo
						class="positionPicture"
						:link-photo="(userPicture != null) ? userPicture :placeholder"
						:max-heigth="80"
						:max-width="80"
						forme="forme-profile" />
					<div class="pl-2">
						<span>
							{{ profileUsername }}
						</span>
						<br>
						<span class="base">
							{{ this.$t(role) }}
						</span>
					</div>
				</v-row>
			</Header>
			<v-container
				class="base mt-10">
				{{ description }}
			</v-container>
			<div class="mt-16">
				<v-tabs
					v-model="tab"
					class="tabs"
					hide-slider
					centered>
					<v-tab
						:key="1"
						class="tabIcon">
						<v-row v-if="tab==0">
							Contributions
						</v-row>
						<v-icon
							v-else
							color="#00baaf">
							mdi-format-list-text
						</v-icon>
					</v-tab>
					<v-tab
						:key="2"
						class="tabIcon">
						<v-row v-if="tab==1">
							Artistes favoris
						</v-row>
						<v-icon
							v-else
							class="tabIcon"
							color="#00baaf">
							mdi-account-box
						</v-icon>
					</v-tab>
					<v-tab
						:key="3"
						class="tabIcon">
						<v-row v-if="tab==2">
							Villes favorites
						</v-row>
						<v-icon
							v-else
							class="tabIcon"
							color="#00baaf">
							mdi-city
						</v-icon>
					</v-tab>
					<v-tab
						:key="4"
						class="tabIcon">
						<v-row v-if="tab==3">
							Oeuvre favorites
						</v-row>
						<v-icon
							v-else
							class="tabIcon"
							color="#00baaf">
							mdi-palette
						</v-icon>
					</v-tab>
				</v-tabs>
				<div class="separator mt-1" />
				<v-tabs-items
					v-model="tab"
					continuous
					class="tabsItem">
					<v-tab-item
						:key="1">
						<div
							v-for="{contribId, title, author, picture} in contribList"
							:key="contribId"
							class="mt-3">
							<card
								:card-title="title"
								:card-desc="author"
								:img-src="picture"
								width="100%"
								@click="goToContrib(contribId)" />
							<div class="separator mb-4" />
						</div>
					</v-tab-item>
					<v-tab-item
						:key="2">
						<div
							v-for="{id, username, profilePicture} in favArtists"
							:key="id"
							class="mt-3">
							<card
								:card-title="username"
								:round-img="true"
								card-desc=""
								:img-src="(profilePicture != null) ? profilePicture : placeholder"
								@click="goToProfile(id)" />
							<div class="separator mb-4" />
						</div>
					</v-tab-item>
					<v-tab-item
						:key="3">
						<div
							v-for="{id, name, picture, length} in favCities"
							:key="id"
							class="mt-3">
							<card
								class="toto"
								:card-title="name"
								:img-src="picture"
								:card-desc="length + ' oeuvre(s)'"
								@click="goToCity(id)" />
							<div class="separator mb-4" />
						</div>
					</v-tab-item>
					<v-tab-item
						:key="4">
						<div
							v-for="{id, name, authorName, pictures} in favArts"
							:key="id"
							class="mt-3">
							<card
								:card-title="name"
								:card-desc="authorName"
								:img-src="pictures[0]"
								@click="goToArt(id)" />
							<div class="separator mb-4" />
						</div>
					</v-tab-item>
				</v-tabs-items>
			</div>
			<edit-profile
				:data="profileModal"
				@close="editProfileClosed" />
			<contribution-display
				:contrib-id="contributionId"
				:data="contributionModal"
				@close="contributionClosed" />
		</BaseWrapper>
	</div>
</template>
<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import EditProfile from '../components/EditProfile.vue';
import ContributionDisplay from '../components/ContributionDisplay.vue';
import Header from '../components/Header.vue';
import Photo from '../components/Photo.vue';
import Card from '../components/Card.vue';
import axios from 'axios';
import router from '../router';

export default {
	name: 'Profile',
	components: {
		BaseWrapper,
		EditProfile,
		ContributionDisplay,
		Header,
		Photo,
		Card
	},
	props: {
		editProfileDisplay: {
			default: false,
			type: Boolean
		}
	},
	data() {
		return {
			drawer: false,
			contributionId: -1,
			profileUsername: '',
			description: '',
			role:'',
			userPicture: null,
			contribList:[],
			favArtists:[],
			favArts:[],
			favCities:[],
			userProfile: false,
			profileModal: false,
			contributionModal: false,
			profileInfoLoaded: false,
			contributionsLoaded: false,
			isFavourited: false,
			placeholder: require('@/assets/avatarPlaceholder.png'),
			tab: 'contrib',
		};
	},
	mounted() {
		var token = localStorage.getItem('authtoken');
		if(token != null) {
			axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
		}
		// On charge notre profil pour savoir si ce profil est dans nos favoris ou que ce profil
		// est le notre
		if (this.$route.params.id != undefined) {
			this.getProfileInfo(this.$route.params.id);
			this.getContrib(this.$route.params.id);
		}
		else {
			this.userProfile = true;
			this.getProfileInfo(null);
			this.getContrib(null);
		}
		// On vérifie si on doit ouvrire la modale d'édition du profil
		if (this.editProfileDisplay) {
			this.profileModal = true;
		}
	},
	methods:{
		getProfileInfo(id){
			if(id == null) {
				axios
					.get('/api/user/profile')
					.then((response) => {
						var array = response.data.data;
						this.profileUsername = array.username;
						if(array.description != null)
							this.description = array.description;
						if(array.roles[0] == 'ROLE_ADMIN')
							this.role = 'administrator';
						else if(array.roles[0] == 'ROLE_ARTIST')
							this.role = 'artist';
						else if((array.roles[0] == 'ROLE_USER'))
							this.role = 'contributor';
						this.favArtists = array.favArtists;
						this.favArts = array.favArts;
						this.favCities = [];
						for (let i = 0 ; i < array.favCities.length;++i) {
							axios
								.get('api/city/arts/' +  array.favCities[i].id)
								.then((response) => {
									var id = array.favCities[i].id;
									var name = array.favCities[i].name;
									var picture = response.data.data[0].pictures[0];
									var length = response.data.data.length;
									this.favCities.push({id, name, picture, length});
								})
								.catch((error) => console.error(error));
						}
						this.userPicture = array.profilePicture;
						this.profileInfoLoaded = true;
						this.userId = array.id;
						if (this.userId == this.$route.params.id) {
							router.push('/profile');
							this.userProfile = true;
						}
						for (let artist of this.favArtists) {
							if (artist.id == this.$route.params.id)
								this.isFavourited = true;
						}
					})
	      			.catch((error) => console.error(error));
			}
			else {
				axios
					.get('/api/user/' + id)
					.then((response) => {
						var array = response.data.data;
						this.profileUsername = array.username;
						if(array.description != null)
							this.description = array.description;
						if(array.roles[0] == 'ROLE_ADMIN')
							this.role = 'administrator';
						else if(array.roles[0] == 'ROLE_ARTIST')
							this.role = 'artist';
						else if((array.roles[0] == 'ROLE_USER'))
							this.role = 'contributor';
						this.favArtists = array.favArtists;
						this.favArts = array.favArts;
						this.favCities = [];
						for (let i = 0 ; i < array.favCities.length;++i) {
							axios
								.get('api/city/arts/' +  array.favCities[i].id)
								.then((response) => {
									var id = array.favCities[i].id;
									var name = array.favCities[i].name;
									var picture = response.data.data[0].pictures[0];
									var length = response.data.data.length;
									this.favCities.push({id, name, picture, length});
								})
								.catch((error) => console.error(error));
						}
						this.userPicture = array.profilePicture;
						this.profileInfoLoaded = true;
					})
	      			.catch((error) => console.error(error));
			}
		},
		getContrib(id){
			if(id == null) {
				axios
					.get('/api/contrib/personnal')
					.then((response) => {
						var array = response.data.data;
						var result= [];
						for(let i = 0; i < array.length;++i) {
							var contribId = array[i].id;
							var title = array[i].name;
							var author = array[i].author;
							var picture = array[i].picture1;
							result.push({contribId, title, author, picture});
						}
						this.contribList = result;
						this.contributionsLoaded = true;
					})
					.catch((error) => console.error(error));
			}
			else {
				axios
					.get('/api/contrib/user/' + id)
					.then((response) => {
						var array = response.data.data;
						var result= [];
						for(let i = 0; i < array.length;++i) {
							var contribId = array[i].id;
							var title =array[i].name;
							result.push({contribId, title});
						}
						this.contribList = result;
						this.contributionsLoaded = true;
					})
					.catch((error) => console.error(error));
			}
		},
		editProfileClicked() {
			this.profileModal = true;
			router.push('/editprofile');
		},
		editProfileClosed() {
			this.profileModal = false;
			router.push('/profile');
		},
		contributionClosed() {
			this.contributionModal = false;
		},
		favouriteClicked() {
			if (!this.isFavourited)
				axios
					.post('/api/fav/artist/' + this.$route.params.id)
					.then((response) => {
						this.isFavourited = true;
					})
					.catch((error) => console.error(error));
			else
				axios
					.delete('/api/fav/artist/' + this.$route.params.id)
					.then((response) => {
						this.isFavourited = false;
					})
					.catch((error) => console.error(error));
		},
		goToContrib(id) {
			this.contributionId = id;
			this.contributionModal = true;
		},
		goToProfile(id) {
			router.push('/profile/' + id);
			router.go();
		},
		goToCity(id) {
			router.push('/city/' + id);
			router.go();
		},
		goToArt(id) {
			router.push('/art/' + id);
			router.go();
		},
	}
};
</script>
<style scoped lang="scss" >
@import "../assets/styles/text.scss";

.profile-header {
	min-height: 100px;
}

.positionPicture{
	border: 4px solid  #00BAAF;
}

.separator {
	height: 1px;
	background-color: $light-color;
	width: 90%;
	margin:auto
}

.tabIcon {
	min-width:20px !important;
}

.v-slide-group__prev--disabled {
	display: none !important;
}

</style>
