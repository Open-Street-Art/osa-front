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
						<ArtActionsMenu />
					</v-menu>
				</v-col>
			</v-row>
			<v-row class="mt-1 mb-1">
				<v-col class="pt-0 light">
					{{ artAuthor }}
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
		<v-row v-if="!isMobile()">
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
							<ArtActionsMenu />
						</v-menu>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col class="pt-2 light">
						{{ artAuthor }}
					</v-col>
				</v-row>
				<v-divider class="mt-5 mr-5" />
				<v-row class="mt-1">
					<v-col class="base">
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
</template>

<script>
import Modal from '../components/Modal.vue';
import ArtActionsMenu from '../components/ArtActionsMenu.vue';
import axios from 'axios';
import mobileDetection from './mixins/mobileDetection';

export default {
	name: 'ArtDisplay',
	components: {
		Modal,
		ArtActionsMenu
	},
	mixins: [ mobileDetection ],
	model: {
		prop: 'artDisplayModel',
		event: 'update'
	},
	props: {
		data: {
			type: Boolean,
			required: true
		}
	},
	data () {
		return {
			artTitle: '',
			artDesc: '',
			artAuthor: '',
			artImages: [],
			artCreationDT: new Date()
		};
	},
	watch: {
		data() {
			if (this.$route.params.id !== undefined)
				axios
					.get('/api/art/' + this.$route.params.id)
					.then((response) => {
						this.artTitle = response.data.data.name;
						this.artDesc = response.data.data.description;
						this.artAuthor = response.data.data.authorName;
						this.artImages = response.data.data.pictures;
						this.artCreationDT = new Date(response.data.data.creationDateTime);
					})
					.catch((error) => console.error(error));
		}
	},
	created() {
		this.isMobile();
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/text.scss";
</style>
