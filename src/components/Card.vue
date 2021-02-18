<template>
	<div
		class="card"
		@click="openModal">
		<img
			:class="roundImg ? 'card-img round-img' : 'card-img'"
			:src="imgSrc">
		<div class="emphase card-title">
			{{ cardTitle }}
		</div>
		<div class="light card-desc">
			{{ cardDesc }}
		</div>
	</div>
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
	},
	methods: {
		openModal: function(event) {
		}
	},
};
</script>

<style lang="scss">
@import "../assets/styles/text.scss";

.card {
    position: relative;
    height: 74px;
    width: 349px;
    background-color: $white-color;
    border-radius: 20px;
}

.card-img {
    position: absolute;
    top: 13px;
    left: 13px;
    border-radius: 10px;
    height: 48px;
    width: 48px;
    object-fit: cover;
}

.round-img {
    border-radius: 50% !important;
}

.card-title {
    position: absolute;
    top: 14px;
    left: 74px;
}

.card-desc {
    position: absolute;
    top: 38px;
    left: 74px;
}

</style>
