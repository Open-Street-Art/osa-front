<template>
	<Modal
		v-model="data"
		@close="$emit('close')">
		<v-container v-if="isMobile()">
			<v-row>
				<v-img :src="image" />
			</v-row>
			<v-row>
				<v-col
					cols="9"
					class="titles city-name">
					{{ cityName }}
				</v-col>
				<v-col class="text-right">
					<v-menu
						offset-y
						rounded="xl">
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								icon
								v-bind="attrs"
								color="black"
								v-on="on">
								<v-icon
									large
									dark>
									mdi-dots-horizontal
								</v-icon>
							</v-btn>
						</template>
						<CityActionsMenu />
					</v-menu>
				</v-col>
			</v-row>
			<v-row>
				<div
					v-for="{id, name, authorName, pictures} in artList"
					:key="id">
					<Card
						:card-title="name"
						:card-desc="authorName"
						:img-src="pictures[0]"
						@click="artClicked(id)" />
					<div class="separator mt-1 mb-4" />
				</div>
			</v-row>
		</v-container>
		<v-row v-if="!isMobile()">
			<v-col cols="8">
				<v-img
					min-height="100%"
					:src="image" />
			</v-col>
			<v-col class="pl-0">
				<v-row class="mt-2">
					<v-col
						cols="9"
						class="titles city-name">
						{{ cityName }}
					</v-col>
					<v-col class="text-right mr-5">
						<v-menu
							offset-y
							rounded="xl">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									icon
									v-bind="attrs"
									color="black"
									v-on="on">
									<v-icon
										large
										dark>
										mdi-dots-horizontal
									</v-icon>
								</v-btn>
							</template>
							<CityActionsMenu />
						</v-menu>
					</v-col>
				</v-row>
				<v-row>
					<div
						v-for="{id, name, authorName, pictures} in artList"
						:key="id">
						<Card
							:card-title="name"
							:card-desc="authorName"
							:img-src="pictures[0]"
							@click="artClicked(id)" />
						<div class="separator mt-1 mb-4" />
					</div>
				</v-row>
			</v-col>
		</v-row>
	</Modal>
</template>

<script>
import Modal from '../components/Modal.vue';
import Card from '../components/Card.vue';
import CityActionsMenu from '../components/CityActionsMenu.vue';
import mobileDetection from './mixins/mobileDetection';
import router from '../router';
import axiosCityService from './mixins/axiosCityService';

export default {
	name: 'CityDisplay',
	components: {
		Modal,
		Card,
		CityActionsMenu
	},
	mixins: [
		mobileDetection,
		axiosCityService
	],
	model: {
		prop: 'cityDisplayModel',
		event: 'update'
	},
	props: {
		data: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			cityName: '',
			image: '',
			artList: []
		};
	},
	watch: {
		data() {
			if (this.$route.params.id !== undefined)
			// On recupere les infos de la ville avec l'id dans la route
				this.getCity(this.$route.params.id)
					.then((response) => {
						this.cityName = response.data.data.name;
						// On recupere l'image de la premiere oeuvre
						this.getCityArts(this.$route.params.id)
							.then((response) => {
								this.image = response.data.data[0].pictures[0];
								this.artList = response.data.data;
							})
							.catch((error) => console.error(error));
					})
					.catch((error) => console.error(error));
		}
	},
	created() {
		this.isMobile();
	},
	methods: {
		artClicked(id) {
			this.$emit('close');
			this.$emit('art');
			router.push('/art/' + id);
		}
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/text.scss";

.city-name {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>
