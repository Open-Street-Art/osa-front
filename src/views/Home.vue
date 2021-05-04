<template>
	<v-main>
		<div class="test">
			<base-wrapper
				v-model="drawer"
				:register="registerModal"
				:authenticate="authenticateDisplay"
				:contribution-display="contributionDisplay"
				:add-art="addArtModal"
				:settings-display="settingsDisplay">
				<v-col>
					<v-row>
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
						</Header>
						<searchbar
							v-model="searchValue"
							class="searchbarHome"
							:result-count="searchCount"
							:show-button="true"
							@update="search"
							@click:clear="getMapPins">
							<div class="mb-4" />
							<div
								v-for="{id, title, desc, img} in searchList"
								:key="id">
								<div class="separator mt-1 mb-4" />
								<card
									class="searchResult"
									:card-title="title"
									:card-desc="desc"
									:img-src="img"
									@click="centerMap(id)" />
							</div>
						</searchbar>
					</v-row>
				</v-col>
				<art-map
					class="artmap"
					:base-center="centerTest"
					@mapref="getMap">
					<v-marker-cluster
						:options="clusterOptions">
						<pin
							v-for="{id, latitude, longitude} in pinList"
							:key="id"
							:marker-latlng="[latitude, longitude]"
							@click="pinPopup(id)">
							<card
								:card-title="cardTitle"
								:card-desc="cardDesc"
								:img-src="imgSrc"
								@click="pinClicked(id)" />
						</pin>
					</v-marker-cluster>
					<v-btn
						fab
						rounded
						class="locate-button"
						@click="locateUser">
						<v-icon color="primary">
							mdi-crosshairs-gps
						</v-icon>
					</v-btn>
				</art-map>
			</base-wrapper>
		</div>
		<ArtDisplay
			:data="artDisplayModal"
			@close="artDisplayClosed()"
			@cityClicked="cityNameClicked"
			@changeArtAdmin="changeArtAdmin" />
		<CityDisplay
			:data="cityDisplayModal"
			@close="cityDisplayClosed()"
			@art="artDisplayModal = true" />
		<contribution
			:data="changeArtAdminModal"
			:change-art-admin="true"
			@close="changeArtAdminClosed" />
	</v-main>
</template>

<script>
import ArtMap from '../components/ArtMap.vue';
import BaseWrapper from '../components/BaseWrapper.vue';
import Pin from '../components/Pin.vue';
import Card from '../components/Card.vue';
import ArtDisplay from '../components/ArtDisplay.vue';
import CityDisplay from '../components/CityDisplay.vue';
import Searchbar from '../components/Searchbar.vue';
import Header from '../components/Header.vue';
import Contribution from '../components/Contribution.vue';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import router from '../router';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';

export default {
	name: 'Home',
	components: {
		BaseWrapper,
		ArtMap,
		Pin,
		Card,
		ArtDisplay,
		CityDisplay,
		Searchbar,
		Header,
		Contribution,
		'v-marker-cluster': Vue2LeafletMarkerCluster
	},
	props: {
		artDisplay: {
			default: false,
			type: Boolean
		},
		cityDisplay: {
			default: false,
			type: Boolean
		},
		changeArtAdminDisplay : {
			default: false,
			type: Boolean
		},
		contributionDisplay: {
			default: false,
			type: Boolean
		},
		addArtModal: {
			default: false,
			type: Boolean
		},
		registerModal: {
			default: false,
			type: Boolean
		},
		authenticateDisplay: {
			default: false,
			type: Boolean
		},
		settingsDisplay: {
			default: false,
			type: Boolean
		}
	},
	data () {
		return {
			map: null,
			drawer: false,
			pinList: [],
			searchList: [],
			cardTitle: '',
			cardDesc: '',
			imgSrc: '',
			artDisplayModal: false,
			cityDisplayModal: false,
			contributionModal: false,
			changeArtAdminModal: false,
			searchValue: '',
			searchCount: 0,
			gotData: false,
			authenticateModal: false,
			isAdmin: false,
			centerTest: [49.386758892241396, 1.0686564445495608],
			clusterOptions: {
				iconCreateFunction : (cluster) => {
					let markersCount = cluster.getChildCount();
					return L.divIcon({ html: markersCount, className: 'mycluster', iconSize: L.point(40, 40) });
				}
			}
		};
	},
	mounted() {
		var token = localStorage.getItem('authtoken');
		if(token!=null) {
			axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
			var userInfo = jwt_decode(token);
			if (userInfo.roles === 'ROLE_ADMIN') {
				this.isAdmin = true;
			}
		}
		this.getMapPins();
		if (this.artDisplay == true)
			this.artDisplayModal = true;
		else if (this.cityDisplay == true)
			this.cityDisplayModal = true;
		else if (this.changeArtAdminDisplay == true) {
			if(this.isAdmin)
				this.changeArtAdminModal = true;
			else
				 router.push('/');
		}
		else if (this.contributionDisplay == true)
			this.contributionModal = true;
		else if (this.authenticateDisplay == true)
			this.authenticateModal = true;
	},
	methods: {
		includeArt(id, array) {
			for (let i = 0;i < array.length;++i) {
				var json = JSON.parse(JSON.stringify(array[i]));
				if (json.id == id) {
					return true;
				}
			}
			return false;
		},
		clusterIcon(cluster) {
			var markers = cluster.getAllChildMarkers();
			var n = 0;
			for (var i = 0; i < markers.length; i++) {
				n += markers[i].number;
			}
			return L.divIcon({ html: n, className: 'mycluster', iconSize: L.point(40, 40) });
		},
		addArt(array, res) {
			if(this.searchCount == 0) {
				var tempList = [];
				var tempCount = 0;
				var tempPinList = [];
			}
			else {
				var tempList = this.searchList;
				var tempCount = this.searchCount;
				var tempPinList = this.pinList;
			}
			for(let i = 0;i < array.length;++i) {
				var id = array[i].id;
				var latitude = array[i].latitude;
				var longitude = array[i].longitude;
				var title =array[i].name;
				var desc = array[i].authorName;
				var img = array[i].pictures[0];
				if(!this.includeArt(id, tempList)) {
					tempList.push({id, title, desc, img});
					tempPinList.push({id,latitude,longitude});
					tempCount += 1;
				}
			}
			res.searchList = tempList;
			res.pinList = tempPinList;
			res.searchCount = tempCount;
		},
		getMap(map) {
			this.map = map;
		},
		locateUser() {
			this.map.mapObject.locate({setView: true, maxZoom: 16});
		},
		getMapPins() {
			var tempPinList = [];
			axios
				.get('/api/arts/locations')
				.then((response) => {
					var array = response.data.data;
					for(let i = 0;i < array.length;++i) {
						tempPinList.push(array[i]);
					}
					this.pinList = tempPinList;
				})
				.catch((error) => console.error(error));
		},
		pinPopup(id) {
			axios
				.get('/api/arts/' + id)
				.then((response) => {
					this.cardTitle = response.data.data.name;
					this.cardDesc = response.data.data.authorName;
					this.imgSrc = response.data.data.pictures[0];
				})
				.catch((error) => console.error(error));
		},
		pinClicked(id) {
			this.artDisplayModal = true;
			router.push('/art/' + id);
		},
		artDisplayClosed() {
			router.push('/');
			this.artDisplayModal = false;
		},
		cityDisplayClosed() {
			router.push('/');
			this.cityDisplayModal = false;
		},
		contributionClosed() {
			router.push('/');
			this.contributionModal = false;
		},
		changeArtAdminClosed() {
			router.push('/');
			this.changeArtAdminModal = false;
		},
		search() {
			if(this.searchValue != null && this.searchValue.length > 1 ) {
				var res = {
					searchList: [],
					pinList: [],
					searchCount: 0,
				};
				this.gotData = false;
				axios
					.get('/api/search/arts/' + this.searchValue)
					.then((response) => {
						if(response.data.data.length > 0) {
							this.addArt(response.data.data, res);
							this.gotData = true;
						}
						axios
							.get('/api/search/arts/artists/' + this.searchValue)
							.then((response) => {
								if(response.data.data.length > 0) {
									this.addArt(response.data.data, res);
									this.gotData = true;
								}
								axios
									.get('/api/search/cities/' + this.searchValue)
									.then((response) => {
										if(response.data.data.length > 0) {
											this.addArt(response.data.data, res);
											this.gotData = true;
										}
										if(!this.gotData) {
											this.searchList = [];
											this.pinList = [];
											this.searchCount = 0;
										}
										else {
											this.searchList = res.searchList;
											this.pinList = res.pinList;
											this.searchCount = res.searchCount;
										}
									})
									.catch((error) => console.error(error));
							})
							.catch((error) => console.error(error));
					})
					.catch((error) => console.error(error));
			}
			else {
				this.searchList = [];
				this.searchCount = 0;
				this.getMapPins();
			}
		},
		authenticateClosed() {
			router.push('/');
			this.authenticateModal = false;
		},
		centerMap(id) {
			for(let i = 0; i < this.pinList.length;++i) {
				if(this.pinList[i].id == id) {
					this.centerTest = [this.pinList[i].latitude,this.pinList[i].longitude];
					return;
				}
			}
		},
		cityNameClicked() {
			this.artDisplayModal = false;
			this.cityDisplayModal = true;
		},
		changeArtAdmin() {
			this.artDisplayClosed();
			this.changeArtAdminModal = true;
		}
	}
};
</script>

<style lang="scss" >
@import "../assets/styles/text.scss";
@import "../assets/styles/_variables.scss";

.homeButton {
	top:10px;
	left:5px;
	height:16px;
	width:24px;
}

.searchbarHome {
	position: absolute;
	left:50px;
	top: 10px;
	width:85%;
	z-index:1000 !important
}

.locate-button {
	position: absolute;
	z-index: 1000 !important;
	bottom:70px;
	right: 10px;
}

.test {
	width: 100%;
	height: 60px
}

.searchResult {
	width:100% !important
}

.separator {
		height: 1px;
		background-color: $light-color;
		width: 90%;
		margin:auto
	}

	.mycluster {
			width: 40px;
			height: 40px;
			background-color: $main-color;
			color: $white-color;
			text-align: center;
			padding-top: 5px;
			font: $profile-font;
			border: solid 3px $white-color;
			border-radius: 24px;
		}

</style>
