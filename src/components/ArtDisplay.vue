<template>
	<div>
		<Modal
			v-model="data"
			@close="isClosing">
			<v-progress-linear
				v-if="isLoading"
				indeterminate
				color="primary" />
			<v-container v-if="isMobile() && !isLoading">
				<v-row>
					<v-carousel
						height="50%"
						:show-arrows="false"
						hide-delimiter-background>
						<v-carousel-item
							v-for="(image, i) in artImages"
							:key="i">
							<v-img :src="image" />
						</v-carousel-item>
					</v-carousel>
				</v-row>
				<v-row>
					<v-col class="titles">
						{{ artTitle }}
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
							<ArtActionsMenu 
								:actual-position="actualPosition"
								:art-position="artLocation"
								@changeArtAdmin="changeArtAdmin"
								@modifyContrib="modifyContrib" />
						</v-menu>
					</v-col>
				</v-row>
				<v-row class="mt-1 mb-1">
					<v-col class="pt-0 light">
						{{ artAuthor }},
						<div
							class="city-name"
							@click="cityNameClicked">
							{{ artCity }}
						</div>
					</v-col>
				</v-row>
				<v-divider />
				<v-row class="mt-1">
					<v-col class="base">
						{{ artDesc }}
					</v-col>
				</v-row>
				<v-row class="mt-1">
					<v-col class="light">
						{{ this.$t("artDisplay.created") + artCreationDT.toLocaleDateString() }}
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col class="pt-0 light">
						{{ this.$t("artDisplay.modified") + artCreationDT.toLocaleDateString() }}
					</v-col>
				</v-row>
			</v-container>
			<v-row v-if="!isMobile() && !isLoading">
				<v-col cols="8">
					<v-carousel
						height="100%"
						:show-arrows="false"
						hide-delimiter-background>
						<v-carousel-item
							v-for="(image, i) in artImages"
							:key="i">
							<v-img
								min-height="100%"
								:src="image" />
						</v-carousel-item>
					</v-carousel>
				</v-col>
				<v-col class="pl-0">
					<v-row class="mt-2">
						<v-col class="titles">
							{{ artTitle }}
						</v-col>
						<v-col class="text-right mr-5">
							<v-menu
								rounded="xl"
								offset-y>
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
								<ArtActionsMenu
									:actual-position="actualPosition"
									:art-position="artLocation"
									@changeArtAdmin="changeArtAdmin"
									@modifyContrib="modifyContrib" />
							</v-menu>
						</v-col>
					</v-row>
					<v-row class="mt-0">
						<v-col class="pt-2 light">
							{{ artAuthor }},
							<div
								class="city-name"
								@click="cityNameClicked">
								{{ artCity }}
							</div>
						</v-col>
					</v-row>
					<v-divider class="mt-5 mr-5" />
					<v-row class="mt-1">
						<v-col
							md="11"
							class="base">
							{{ artDesc }}
						</v-col>
					</v-row>
					<v-row>
						<v-col class="pt-0 light">
							{{ this.$t("artDisplay.created") + artCreationDT.toLocaleDateString() }}
						</v-col>
					</v-row>
					<v-row class="mt-1">
						<v-col class="pt-0 light">
							{{ this.$t("artDisplay.modified") + artCreationDT.toLocaleDateString() }}
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</Modal>
		<Contribution
			:modify-contrib="true"
			:data="contributionModal"
			@close="contributionModal = false" />
	</div>
</template>

<script>
import Modal from '../components/Modal.vue';
import ArtActionsMenu from '../components/ArtActionsMenu.vue';
import mobileDetection from './mixins/mobileDetection';
import router from '../router';
import Contribution from './Contribution.vue';
import axiosArtService from './mixins/axiosArtService';

export default {
	name: 'ArtDisplay',
	components: {
		Modal,
		ArtActionsMenu,
		Contribution
	},
	mixins: [
		mobileDetection,
		axiosArtService
	 ],
	model: {
		prop: 'artDisplayModel',
		event: 'update'
	},
	props: {
		data: {
			type: Boolean,
			required: true
		},
		actualPosition: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			artId: null,
			artTitle: '',
			artDesc: '',
			artAuthor: '',
			artCity: '',
			artImages: [],
			artCreationDT: new Date(),
			contributionModal: false,
			artCityId: null,
			artLocation: null,
			isLoading: true
		};
	},
	watch: {
		data: {
			immediate: true,
			handler(b, a) {
				if (this.$route.params.id !== undefined && this.data == true)
					this.getArt(this.$route.params.id)
						.then((response) => {
							this.artId = this.$route.params.id;
							this.artTitle = response.data.data.name;
							this.artDesc = response.data.data.description;
							this.artAuthor = response.data.data.authorName;
							this.artImages = response.data.data.pictures;
							this.artCity = response.data.data.city.name;
							this.artCityId = response.data.data.city.id;
							this.artCreationDT = new Date(response.data.data.creationDateTime);
							this.artLocation = [response.data.data.latitude, response.data.data.longitude];
							this.isLoading = false;
						})
						.catch((error) => console.error(error));
				else {
					this.artId = null;
					this.artTitle = '';
					this.artDesc = '';
					this.artAuthor = '';
					this.artImages = '';
					this.artCity = '';
					this.artCityId = null;
					this.artCreationDT = new Date();
				}
			}
		}
	},
	created() {
		this.isMobile();
	},
	methods: {
		cityNameClicked() {
			this.isLoading = true;
			this.$emit('close');
			this.$emit('cityClicked');
			router.push('/city/' + this.artCityId);
		},
		changeArtAdmin() {
			this.$emit('changeArtAdmin');
			router.push('/art/' + this.artId + '/change');
		},
		modifyContrib() {
			this.contributionModal = true;
		},
		isClosing() {
			this.isLoading = true;
			this.$emit('close');
		}
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/text.scss";

.city-name {
	display: inline;
	text-decoration: underline;
	cursor: pointer;
}
</style>
