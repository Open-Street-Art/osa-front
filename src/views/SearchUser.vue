<template>
	<v-main>
		<base-wrapper v-model="drawer">
			<Header class="test">
				<h1
					class="header-center header-title">
					{{ this.$t("searchUser-menu.title") }}
				</h1>
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
			<div class="content">
				<Searchbar
					v-model="searchValue"
					:result-count="searchCount"
					:show-button="true"
					@update="search"
					@click:clear="getMapPins">
					<div class="mb-4" />
					<div
						v-for="{id, title, desc, img} in searchList"
						:key="id">
						<card
							class="searchResult"
							:card-title="title"
							:card-desc="desc"
							:img-src="img"
							@click="getUser(name)" />
						<div class="separator mt-1 mb-4" />
					</div>
				</Searchbar>
			</div>
		</base-wrapper>
	</v-main>
</template>

<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import axios from 'axios';
import router from '../router';
import Searchbar from '../components/Searchbar.vue';

export default {
	name: 'SearchUser',
	components: {
		BaseWrapper,
		Header,
		Card,
		Searchbar
	},
	data() {
		return {
			drawer: false,
			contribList: [],
			contribDisplayModal: false,
			selectedContribId: null,
			searchValue: '',
		};
	},
	mounted() {
		
	},
	methods: {
		getUser(name){
			router.push('/api/search/users/'+ name);
		   
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
							.get('/api/search/arts/artist/' + this.searchValue)
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
	}
};
</script>
<style lang="scss" >
@import "../assets/styles/text.scss";

.header-center {
  position: absolute;
	top: 18px;
  width: 100%;
	text-align: center;
}

.v-application {
  background-color: $white-color !important;
}

.v-divider {
  width: 100% !important;
}

.content {
  position: relative !important;
	height: calc(100vh - 60px);
  overflow: auto !important;
  padding: 12px;
}

</style>


