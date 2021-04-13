<template>
	<div id="id">
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
					<Photo
						class="positionPicture"
						:link-photo="(profilePicture != null) ? profilePicture :placeholder"
						:max-heigth="80"
						:max-width="80"
						forme="forme-profile" />
				</v-btn>
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
						{{ username }}
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
				grow>
				<v-tab
					:key="1">
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
					:key="2">
					<p v-if="tab==1">
						Artistes favoris
					</p>
					<v-icon
						v-else
						color="#00baaf">
						mdi-account-box
					</v-icon>
				</v-tab>
				<v-tab
					:key="3">
					<p v-if="tab==2">
						Villes favorites
					</p>
					<v-icon
						v-else
						color="#00baaf">
						mdi-city
					</v-icon>
				</v-tab>
				<v-tab
					:key="4">
					<p v-if="tab==3">
						Oeuvre favorites
					</p>
					<v-icon
						v-else
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
						v-for="{contribId, title} in contribList"
						:key="contribId">
						<card
							:card-title="title" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-tab-item>
				<v-tab-item
					:key="2">
					<div
						v-for="{id, name} in favArtists"
						:key="id">
						<card
							:card-title="name" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-tab-item>
				<v-tab-item
					:key="3">
					<div
						v-for="{id, name} in favCities"
						:key="id">
						<card
							:card-title="name" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-tab-item>
				<v-tab-item
					:key="4">
					<div
						v-for="{id, name} in favArts"
						:key="id">
						<card
							:card-title="name" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-tab-item>
			</v-tabs-items>
		</div>
	</div>
</template>
<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import Header from '../components/Header.vue';
import Photo from '../components/Photo.vue';
import Card from '../components/Card.vue';
import axios from 'axios';
export default {
	name: 'Profile',
	components: {
		BaseWrapper,
		Photo,
		Header,
		Card
	},
	data () {
		return {
			drawer: false,
			username: '',
			description: '',
			role:'',
			profilePicture: null,
			contribList:[],
			favArtists:[],
			favArts:[],
			favCities:[],
			cont:[],
			placeholder: require('@/assets/avatarPlaceholder.png'),
			tab: 'contrib',
		};
	},
	mounted(){
		this.getProfileInfo();
		this.getContrib();
	},
	methods:{
		getProfileInfo(){
			axios
				.get('/api/user/profile')
				.then((response) => {
					var array = response.data.data;
					this.username = array.username;
					if(array.description != null)
						this.description = array.description;
					if(array.roles[0] == 'ROLE_ADMIN')
						this.role = 'administrator';
					this.favArtists = array.favArtists;
					this.favArts = array.favArts;
					this.favCities = array.favCities;
					this.profilePicture = array.profilePicture;
				})
	      .catch((error) => console.error(error));

		},
		getContrib(){
			axios
			 .get('/api/contrib/user/contribs')
			   .then((response) => {
					 var array = response.data.data;
					 var result= [];
					 for(let i = 0; i < array.length;++i) {
						var contribId = array[i].id;
						var title =array[i].name;
						result.push({contribId, title});
					 }
					 this.contribList = result;
				})
				.catch((error) => console.error(error));
		}
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

.positionPicture{
	position: absolute;
	left:10px;
	top: 60px;
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


</style>


