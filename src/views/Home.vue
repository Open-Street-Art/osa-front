<template>
	<v-main>
		<div class="test">
			<base-wrapper
				v-model="drawer"
				:register="registerModal">
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
							<card
								v-for="{id, title, desc, img} in searchList"
								:key="id"
								:card-title="title"
								:card-desc="desc"
								:img-src="img" />
							<v-divider
								v-for="item in searchList"
								:key="item.id" />
						</searchbar>
					</v-row>
				</v-col>
				<art-map
					class="artmap"
					@mapref="getMap">
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
			@close="artDisplayClosed()" />
		<Contribution
			:data="contributionModal"
			@close="contributionClosed()" />
		<Authenticate 
			:data="authenticateModal"
			@close="authenticateClosed()" />
	</v-main>
</template>

<script>
import ArtMap from '../components/ArtMap.vue';
import BaseWrapper from '../components/BaseWrapper.vue';
import Pin from '../components/Pin.vue';
import Card from '../components/Card.vue';
import ArtDisplay from '../components/ArtDisplay.vue';
import Contribution from '../components/Contribution.vue';
import Searchbar from '../components/Searchbar.vue';
import Header from '../components/Header.vue';
import Authenticate from '../components/Authenticate.vue';
import axios from 'axios';
import router from '../router';

export default {
	name: 'Home',
	components: { 
		BaseWrapper,
		ArtMap,
		Pin,
		Card,
		ArtDisplay,
		Contribution,
		Authenticate,
		Searchbar,
		Header
	},
	props: {
		artDisplay: {
			default: false,
			type: Boolean
		},
		contributionDisplay: {
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
			contributionModal: false,
			searchValue: '',
			searchCount: 0,
			gotData: false,
			authenticateModal: false
		};
	},
	mounted() {
		this.getMapPins();
		if (this.artDisplay == true)
			this.artDisplayModal = true;
		else if (this.contributionDisplay == true)
			this.contributionModal = true;
		else if (this.authenticateDisplay == true)
			this.authenticateModal = true;
	},
	methods: {
		includeArt(id, array) {
			for(let i = 0;i < array.length;++i) {
				var json = JSON.parse(JSON.stringify(array[i]));
				if(json.id == id) {
					return true;
				}
			}
			return false;
		},
		addArt(array) {
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
			this.searchList = tempList;
			this.pinList = tempPinList;
			this.searchCount = tempCount;
			console.log(this.searchList);
		},
		getMap(map) {
			this.map = map;
		},
		locateUser() {
			this.map.locate({setView: true, maxZoom: 16});
		},
		getMapPins() {
			this.pinList = [];
			axios
				.get('/api/art/locations')
				.then((response) => {
					this.pinList.push(response.data.data[0]);
				})
				.catch((error) => console.error(error));
		},
		pinPopup(id) {
			axios
				.get('/api/art/' + id)
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
		contributionClosed() {
			router.push('/');
			this.contributionModal = false;
		},
		search() {
			if(this.searchValue != null && this.searchValue.length > 1 ) {
				if(!this.gotData) {
					this.pinList = [];
				}
				this.gotData = false;
				var promise1 = axios
					.get('/api/search/arts/' + this.searchValue)
					.then((response) => {
						if(response.data.data.length > 0) {
							this.addArt(response.data.data);
							this.gotData = true;
						}
					})
					.catch((error) => {
						console.log(error);
						console.log(error.response);
					});
				var promise2 =axios
					.get('/api/search/arts/artist/' + this.searchValue)
					.then((response) => {
						if(response.data.data.length > 0) {
							this.addArt(response.data.data);
							this.gotData = true;
						}
					})
					.catch((error) => {
						console.log(error);
						console.log(error.response);
					});
				var promise3 =axios
					.get('/api/search/cities/' + this.searchValue)
					.then((response) => {
						if(response.data.data.length > 0) {
							this.addArt(response.data.data);
							this.gotData = true;
						}
					})
					.catch((error) => {
						console.log(error);
						console.log(error.response);
					});
				Promise.all([promise1, promise2, promise3]).then(() =>{
					if(!this.gotData) {
						this.searchList = [];
						this.pinList = [];
						this.searchCount = 0;
					}
				});
			}
			else {
				this.getMapPins();
			}
		},
		authenticateClosed() {
			router.push('/');
			this.authenticateModal = false;
		}
	}
};
</script>

<style style="scss" >

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

</style>
