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
					class="searchbar"
					:result-count="searchCount"
					placeholder="searchUser-menu.title"
					@update="search">
					<div
						v-for="{id, username, profilePicture} in searchList"
						:key="id">
						<div class="separator mt-1 mb-4" />
						<card
							class="searchResult"
							:card-title="username"
							card-desc=""
							:round-img="true"
							:img-src="(profilePicture != null) ? profilePicture : placeholder"
							@click="getUser(id)" />
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
			searchValue: '',
			searchList: [],
			searchCount: 0,
			placeholder: require('@/assets/avatarPlaceholder.png')
		};
	},
	mounted() {

	},
	methods: {
		includeUser(id, array) {
			for (let i = 0;i < array.length;++i) {
				var json = JSON.parse(JSON.stringify(array[i]));
				if (json.id == id) {
					return true;
				}
			}
			return false;
		},
		getUser(id){
			router.push('/profile/' + id);

		},
		search() {
			if(this.searchValue != null && this.searchValue.length > 1 ) {
				axios
					.get('/api/search/users/' + this.searchValue)
					.then((response) => {
						var tempSearchList = [];
						var tempSearchCount = 0;
						if(response.data.data.length > 0) {
							for(let i = 0 ;i < response.data.data.length;++i ) {
								if(!this.includeUser(response.data.data[i].id, tempSearchList)) {
									tempSearchList.push(response.data.data[i]);
									++tempSearchCount;
								}
							}
							this.searchList = tempSearchList;
							this.searchCount = tempSearchCount;
						}
						else {
							this.searchList = [];
							this.searchCount = 0;
						}
					})
					.catch((error) => console.error(error));
			}
			else {
				this.searchList = [];
				this.searchCount = 0;
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

.searchbar {
	border: 1px solid $light-color;
}

</style>


