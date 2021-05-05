<template>
	<Modal
		v-model="data"
		@close="$emit('close')">
		<v-container v-if="isMobile()">
			<v-row>
				<v-carousel
					height="50%"
					:show-arrows="false"
					hide-delimiter-background>
					<v-carousel-item
						v-for="(image, i) in contribImages"
						:key="i">
						<v-img :src="image" />
					</v-carousel-item>
				</v-carousel>
			</v-row>
			<v-row>
				<v-col class="titles">
					{{ contribTitle }}
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
						<ContributionActionsMenu
							:contrib-id="contribId"
							@close="$emit('close')" />
					</v-menu>
				</v-col>
			</v-row>
			<v-row class="mt-1 mb-1">
				<v-col class="pt-0 light">
					{{ this.$t("contributionDisplay.contributor") + " : " + contributorName }},
					{{ this.$t("contributionDisplay.author") + " : " + artAuthor }}
				</v-col>
			</v-row>
			<v-divider />
			<v-row class="mt-1">
				<v-col class="base">
					{{ contribDesc }}
				</v-col>
			</v-row>
			<v-row class="mt-1">
				<v-col class="light">
					Longitude : {{ artLongitude }}
				</v-col>
			</v-row>
			<v-row class="mt-0">
				<v-col class="pt-0 light">
					Latitude : {{ artLatitude }}
				</v-col>
			</v-row>
			<v-row class="mt-1">
				<v-col class="light">
					{{ this.$t("contributionDisplay.contributionAdded") + contribCreationDT.toLocaleDateString() }}
				</v-col>
			</v-row>
		</v-container>
		<v-row v-if="!isMobile()">
			<v-col cols="8">
				<v-carousel
					height="100%"
					:show-arrows="false"
					hide-delimiter-background>
					<v-carousel-item
						v-for="(image, i) in contribImages"
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
						{{ contribTitle }}
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
							<ContributionActionsMenu
								:contrib-id="contribId"
								@close="$emit('close')" />
						</v-menu>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col class="pt-2 light">
						{{ this.$t("contributionDisplay.contributor") + " : " + contributorName }},
						{{ this.$t("contributionDisplay.author") + " : " + artAuthor }}
					</v-col>
				</v-row>
				<v-divider class="mt-5 mr-5" />
				<v-row class="mt-1">
					<v-col class="base">
						{{ contribDesc }}
					</v-col>
				</v-row>
				<v-row class="mt-1">
					<v-col class="light">
						Longitude : {{ artLongitude }}
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col class="pt-0 light">
						Latitude : {{ artLatitude }}
					</v-col>
				</v-row>
				<v-row class="mt-1">
					<v-col class="light">
						{{ this.$t("contributionDisplay.contributionAdded") + contribCreationDT.toLocaleDateString() }}
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</Modal>
</template>

<script>
import axios from 'axios';
import mobileDetection from './mixins/mobileDetection';
import Modal from './Modal.vue';
import ContributionActionsMenu from './ContributionActionsMenu.vue';
import axiosContribService from './mixins/axiosContribService';

export default {
	name: 'ContributionDisplay',
	components: {
		Modal,
		ContributionActionsMenu
	},
	mixins: [
		mobileDetection,
		axiosContribService
	],
	props: {
		contribId: {
			type: Number,
			required: true
		},
		data: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			contribTitle: '',
			contribDesc: '',
			contributorName: '',
			contribImages: [],
			artId: null,
			artAuthor: '',
			contribCreationDT: new Date(),
			artLongitude: null,
			artLatitude: null
		};
	},
	watch: {
		contribId: {
			immediate: true,
			handler(old, ne) {
				this.getContrib(this.contribId)
					.then((response) => {
						this.contribTitle = response.data.data.name;
						this.contribDesc = response.data.data.description;
						this.artId = response.data.data.art;
						this.contribImages = response.data.data.pictures;
						this.artAuthor = response.data.data.authorName;
						this.contribCreationDT = new Date(response.data.data.creationDateTime);
						this.artLongitude = response.data.data.longitude;
						this.artLatitude = response.data.data.latitude;
						this.contributorName = response.data.data.contributor.username;
						// Filtre le tableau d'images
						this.contribImages = this.contribImages.filter((elem) => {
							return elem != '';
						});
					})
					.catch((error) => console.error(error));
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/text.scss";
</style>
