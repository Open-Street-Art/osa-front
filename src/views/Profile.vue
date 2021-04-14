<template>
	<div
		v-if="profileInfoLoaded && contributionsLoaded"
		id="id">
		<BaseWrapper
			v-model="drawer">
			<Header class="test">
				<v-btn
					class="homeButton"
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
					class="editButton"
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
				<Photo
					class="positionPicture"
					:link-photo="(userPicture != null) ? userPicture :placeholder"
					:max-heigth="80"
					:max-width="80"
					forme="forme-profile" />
			</Header>
			<Header class="test">
				<v-btn
					class="homeButton"
					left
					fab
					text
					small
					color="primary">
					<p class="emphase positionUserAccount">
						{{ profileUsername }}
					</p>
				</v-btn>
			</Header>
		</BaseWrapper>
		<div>
			<p class="base positionAccountType">
				{{ this.$t(role) }}
			</p>
			<p class="positionUserAccountText base">
				{{ description }}
			</p>
			<v-tabs
				v-model="tab"
				class="tabs"
				hide-slider
				centered>
				<v-tab
					:key="1"
					class="tabIcon">
					<p v-if="tab==0">
						Contributions
					</p>
					<v-icon
						v-else
						color="#00baaf">
						mdi-format-list-text
					</v-icon>
				</v-tab>
				<v-tab
					:key="2"
					class="tabIcon">
					<p v-if="tab==1">
						Artistes favoris
					</p>
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
					<p v-if="tab==2">
						Villes favorites
					</p>
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
					<p v-if="tab==3">
						Oeuvre favorites
					</p>
					<v-icon
						v-else
						class="tabIcon"
						color="#00baaf">
						mdi-palette
					</v-icon>
				</v-tab>
			</v-tabs>
			<v-tabs-items
				v-model="tab"
				class="tabsItem">
				<v-tab-item
					:key="1">
					<div
						v-for="{contribId, title, author, picture} in contribList"
						:key="contribId">
						<card
							:card-title="title"
							:card-desc="author"
							:img-src="picture" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-tab-item>
				<v-tab-item
					:key="2">
					<div
						v-for="{id, username, profilePicture} in favArtists"
						:key="id">
						<card
							:card-title="username"
							:round-img="true"
							card-desc=""
							:img-src="(profilePicture != null) ? profilePicture : placeholder"
							@click="goToProfile(id)" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-tab-item>
				<v-tab-item
					:key="3">
					<div
						v-for="{id, name} in favCities"
						:key="id">
						<card
							:card-title="name"
							card-desc=""
							@click="goToCity(id)" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-tab-item>
				<v-tab-item
					:key="4">
					<div
						v-for="{id, name, authorName, pictures} in favArts"
						:key="id">
						<card
							:card-title="name"
							:card-desc="authorName"
							:img-src="pictures[0]"
							@click="goToArt(id)" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-tab-item>
			</v-tabs-items>
		</div>
		<edit-profile
			:data="profileModal"
			@close="editProfileClosed" />
	</div>
</template>
<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import EditProfile from '../components/EditProfile.vue';
import ArtDisplay from '../components/ArtDisplay.vue';
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
			artDisplayModal: false,
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
						this.favArtists = array.favArtists;
						this.favArts = array.favArts;
						this.favCities = array.favCities;
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
						this.favArtists = array.favArtists;
						this.favArts = array.favArts;
						this.favCities = array.favCities;
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
							console.log(array);
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
<style lang="scss" >
@import "../assets/styles/text.scss";

.homeButton {
	top:10px;
	left:5px;
	height:16px;
	width:24px;
}

.editButton {
	position: absolute;
	top:10px;
	right:5px;
	height:16px;
	width:24px;
}

.positionPicture{
	position: absolute;
	left:15px;
	top: 75px;
	border: 4px solid  #00BAAF;
}
.positionAccountType{
	position: absolute;
	left:100px;
}
.positionUserAccount{
	position: absolute;
	left:95px;
	top: 6px;
}
.positionUserAccountText{
	position: absolute;
	left:10px;
	top: 190px;
}
.position{
	position: absolute;
	left:50px;
	top: 300px;
}
.pos{
position: absolute;

	top: 320px;
}

.tabs {
	position: absolute;
	top:320px;
}

.tabsItem {
	position: absolute;
	top:400px;
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
