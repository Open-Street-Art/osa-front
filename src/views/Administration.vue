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
			<v-flex class="content">
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
				<v-divider class="mb-3" />
				<Card
					card-title="Nom de l’œuvre"
					card-desc="Artiste inconnu, Rouen" />
			</v-flex>
		</base-wrapper>
	</v-main>
</template>

<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';

export default {
	name: 'Home',
	components: {
		BaseWrapper,
		Header,
		Card
	},
	data() {
		return {
			drawer: false,
			contribList: []
		};
	},
	methods: {
		loadContrib() {
			var tempContribList = [];

			axios
				.get('/api/contrib/???')
				/*.then((response) => {
					var array = response.data.data;
					for(let i = 0;i < array.length;++i) {
						tempPinList.push(array[i]);
					}
					this.pinList = tempPinList;
				})*/
				.catch((error) => console.error(error));
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
  overflow: auto !important;
  padding: 12px;
}

</style>


