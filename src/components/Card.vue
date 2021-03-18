<template>
	<v-card
		height="74"
		width="349"
		class="card rounded-xl"
		elevation="0"
		@click="$emit('click')">
		<v-row>
			<v-col
				cols="3"
				class="ml-3">
				<img
					height="48"
					width="48"
					:class="roundImg ? 'rounded-xl' : 'rounded-lg'"
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
		}
	}
};
</script>

<style lang="scss">
@import "../assets/styles/text.scss";

.card {
    height: 74px;
    width: 349px;
    background-color: $white-color !important;
}

</style>
