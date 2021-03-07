<template>
	<v-main>
		<div class="test">
			<base-wrapper
				v-model="drawer">
				<v-col>
					<v-row>
						<Header>
							<template v-slot:left>
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
							</template>
						</Header>
						<searchbar
							v-model="searchValue"
							class="searchbarHome"
							@update="test"
							@click:clear="getMapPins">
							<card
								v-for="{id, title, desc, img} in searchList"
								:key="id"
								:card-title="title"
								:card-desc="desc"
								:img-src="img" />
							<v-divider
								v-for="item in searchList"
								:key="item" />
						</searchbar>
					</v-row>
				</v-col>
				<art-map class="artmap">
					<pin
						v-for="{id, latitude, longitude} in pinList"
						:key="id"
						:marker-latlng="[latitude, longitude]"
						@click="pinPopup(id)">
						<card
							:card-title="cardTitle"
							:card-desc="cardDesc"
							:img-src="imgSrc" />
					</pin>
				</art-map>
			</base-wrapper>
		</div>
	</v-main>
</template>

<script>
import ArtMap from '../components/ArtMap.vue';
import BaseWrapper from '../components/BaseWrapper.vue';
import Pin from '../components/Pin.vue';
import Card from '../components/Card.vue';
import axios from 'axios';
import Searchbar from '../components/Searchbar.vue';
import Header from '../components/Header.vue';

export default {
	name: 'Home',
	components: { BaseWrapper, ArtMap , Pin, Card, Header, Searchbar},
	data () {
		return {
			drawer: false,
			pinList: [],
			searchList: [],
			cardTitle: '',
			cardDesc: '',
			imgSrc: '',
			searchValue: ''
		};
	},
	mounted() {
		this.getMapPins();
	},
	methods: {
		getMapPins() {
			console.log(axios.defaults.headers);
			axios
				.get('/api/art/locations')
				.then((response) => {
					console.log(response.data.data[0]);
					this.pinList.push(response.data.data[0]);
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},
		pinPopup(id) {
			axios
				.get('/api/art/' + id)
				.then((response) => {
					console.log(response.data.data);
					this.cardTitle = response.data.data.name;
					this.cardDesc = response.data.data.authorName;
					this.imgSrc = response.data.data.pictures[0];
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},
		test() {
			this.searchList = [];
			console.log(this.searchValue);
			if(this.searchValue != null && this.searchValue.length > 0 ) {
				this.pinList = [];
				axios
					.get('/api/search/arts/' + this.searchValue)
					.then((response) => {
						console.log(response.data.data);
						if(response.data.data.length > 0) {
							for(let i = 0;i < response.data.data.length;++i) {
								var id = response.data.data[i].id;
								var latitude = response.data.data[i].latitude;
								var longitude = response.data.data[i].longitude;
								var title = response.data.data[i].name;
								var desc = response.data.data[i].authorName;
								var img = response.data.data[i].pictures[0];
								this.searchList.push({id, title, desc, img});
								this.pinList.push({id,latitude,longitude});
							}
						}
					})
					.catch((error) => {
						console.log(error);
						console.log(error.response);
					});
			}
			else {
				this.getMapPins();
			}
		}
	}
};
</script>

<style style="scss" >

.searchbarHome {
	position: absolute;
	left:50px;
	top: 10px;
	width:85%;
	z-index:1000 !important
}

</style>
