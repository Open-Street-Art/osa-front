<template>
	<v-card
		height="74"
		:width="width"
		class="card"
		elevation="0"
		@click="$emit('click')">
		<v-row>
			<v-col
				class="col-auto ml-3">
				<img
					height="48"
					width="48"
					:class="roundImg ? 'rounded-circle' : 'rounded-img'"
					:src="imgSrc">
			</v-col>
			<v-col>
				<v-row class="mt-0 emphase">
					{{ cardTitle }}
				</v-row>
				<v-row class="mt-4 light">
					{{ cardDesc }}
				</v-row>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'Card',
	props: {
		cardTitle: {
			default: 'Nom de la carte',
			type: String
		},
		cardDesc: {
			default: 'Description de la carte',
			type: String
		},
		imgSrc: {
			default: 'https://www.ales.fr/wp-content/uploads/2019/03/atelier-street-art.jpg',
			type: String
		},
		roundImg: {
			default: false,
			type: Boolean
		},
		width: {
			default: '349',
			type: String
		}
	}
};
</script>

<style scoped lang="scss">
@import "../assets/styles/text.scss";

.card {
		border-radius: 20px !important;
    background-color: $white-color !important;
}

.card::before {
	content: "";
	border-radius: 20px !important;
}

.rounded-img {
	border-radius: 10px;
}

</style>
