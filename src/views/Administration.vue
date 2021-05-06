<template>
	<v-main>
		<base-wrapper v-model="drawer">
			<Header class="test">
				<h1
					class="header-center header-title">
					{{ this.$t("admin-menu.title") }}
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
			<v-progress-linear
				v-if="isLoading"
				indeterminate
				color="primary" />
			<div class="content">
				<div
					v-if="contribList.length == 0"
					class="light placeholder">
					{{ this.$t("admin-menu.placeholder") }}
				</div>
				<div
					v-for="{id, name, author, picture1} in contribList"
					:key="id">
					<Card
						:card-title="name"
						:card-desc="author"
						:img-src="picture1"
						width="100%"
						@click="contribDisplayOpened(id)" />
					<v-divider class="mb-3" />
				</div>
			</div>
		</base-wrapper>
		<ContributionDisplay
			v-if="selectedContribId != null"
			:contrib-id="selectedContribId"
			:data="contribDisplayModal"
			@close="contribDisplayClosed()" />
	</v-main>
</template>

<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import ContributionDisplay from '../components/ContributionDisplay.vue';
import router from '../router';
import axiosContribService from '../components/mixins/axiosContribService';

export default {
	name: 'Administration',
	components: {
		BaseWrapper,
		Header,
		Card,
		ContributionDisplay
	},
	mixins: [
		axiosContribService
	],
	data() {
		return {
			drawer: false,
			contribList: [],
			contribDisplayModal: false,
			selectedContribId: null,
			isLoading: false
		};
	},
	mounted() {
		this.loadContrib();
	},
	methods: {
		loadContrib() {
			this.isLoading = true;
			this.getUnapprovedContribs()
				.then((response) => {
					this.contribList = response.data.data;
					this.isLoading = false;
				})
				.catch((error) => console.error(error));
		},
		contribDisplayOpened(id) {
			this.contribDisplayModal = true;
			this.selectedContribId = id;
		},
		contribDisplayClosed() {
			router.go(this.$router.currentRoute);
			this.selectedContribId = null;
			this.contribDisplayModal = false;
		}
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

.placeholder {
	text-align: center;
	margin-top: 2.5%;
}

</style>


