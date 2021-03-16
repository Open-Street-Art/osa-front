<template>
	<v-main>
		<div class="test">
			<base-wrapper
				v-model="drawer"
				:register="registerModal">
				<v-btn
					class="tempButton"
					fab
					color="primary"
					@click.stop="drawer = !drawer">
					<v-icon color="white">
						mdi-menu
					</v-icon>
				</v-btn>
				<art-map class="artmap">
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
				</art-map>
			</base-wrapper>
		</div>
		<ArtDisplay
			:data="artDisplayModal"
			@close="artDisplayClosed()" />
	</v-main>
</template>

<script>
import ArtMap from '../components/ArtMap.vue';
import BaseWrapper from '../components/BaseWrapper.vue';
import Pin from '../components/Pin.vue';
import Card from '../components/Card.vue';
import ArtDisplay from '../components/ArtDisplay.vue';
import axios from 'axios';
import router from '../router';

export default {
	name: 'Home',
	components: { BaseWrapper, ArtMap , Pin, Card, ArtDisplay },
	props: {
		artDisplay: {
			default: false,
			type: Boolean
		},
		registerModal: {
			default: false,
			type: Boolean
		}
	},
	data () {
		return {
			drawer: false,
			pinList: [],
			cardTitle: '',
			cardDesc: '',
			imgSrc: '',
			artDisplayModal: false,
		};
	},
	mounted() {
		this.getMapPins();
		if (this.artDisplay == true)
			this.artDisplayModal = true;
	},
	methods: {
		getMapPins() {
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
			this.artDisplayModal = !this.artDisplayModal;
			router.push('/art/' + id);
		},
		artDisplayClosed() {
			router.push('/');
			this.artDisplayModal = !this.artDisplayModal;
		}
	}
};
</script>

<style>

.tempButton {
    position: absolute !important;
    top: 10px;
	left: 10px;
	z-index: 1000;
}

</style>
