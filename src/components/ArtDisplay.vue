<template>
	<Modal
		v-model="data"
		@close="$emit('close')">
		<v-container>
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
			<v-row>
				<v-col class="light">
					Œuvre ajoutée le {{ artCreationDT.toLocaleDateString() }}
				</v-col>
			</v-row>
		</v-container>
	</Modal>
</template>

<script>
import Modal from '../components/Modal.vue';
import axios from 'axios';

export default {
	name: 'ArtDisplay',
	components: { Modal },
	model: {
		prop: 'artDisplayModel',
		event: 'update'
	},
	props: {
		data: {
			type: Object,
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
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/text.scss";
</style>
