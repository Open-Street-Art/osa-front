<template>
	<div
		ref="container"
		class="searchbar">
		<v-text-field
			v-model="value"
			clearable
			flat
			solo
			hide-details
			placeholder="Rechercher une œuvre, un artiste..."
			@input="update" />
		<div class="separator" />
		<div class="sad light-emphase">
			Aucun résultat ne correspond à votre recherche :(
		</div>
		<div
			:class="'explorer button' + (showButton?'':' hidden')"
			@click="close">
			Explorer la carte
		</div>
	</div>
</template>

<script>

export default {
	name: 'Searchbar',
	model: {
		prop: 'value',
		event: 'update'
	},
	props: {
		showButton: {
			default: false,
			type: Boolean
		},
		resultCount: {
			default: 0,
			type: Number
		}
	},
	data: function() {
		return {
			lastUpdate: 0,
			delay: 300,
			minSize: 1,
		};
	},
	methods: {
		update: function (event) {

			if(this.value != null && this.value.length > this.minSize) {
				this.$refs.container.classList.add('large');
			}
			else {
				this.$refs.container.classList.remove('large');
			}

			if (this.lastUpdate >= (Date.now() - this.delay)) return; //évite de bombarder d'update a chaque input (limite a 1/300ms)
			this.lastUpdate = Date.now();
		},
		close: function() {
			this.$refs.container.classList.remove('large');
		}
	}
};
</script>

<style lang="scss">
@import "../assets/styles/text.scss";

	.searchbar {
		position: relative;
		background-color: $white-color;
		min-height: 40px;
		max-height: 40px;
		height: auto;
		border-radius: 20px;
		padding: 0 13px;
		overflow: hidden;

		transition: min-height 0.12s ease;
	}

	.searchbar.large {
		min-height: 115px;
		max-height: 351px;
	}

	.searchbar > .v-text-field .v-input__control .v-input__slot {
		position: relative;
		z-index: 200;
		margin: 0;
		padding: 0 7px !important;
		min-height: 40px !important;
		display: flex !important;
		align-items: center !important;
		height: 40px !important;
		background-color: rgba(0,0,0,0);
	}

	.searchbar .v-input__control {
			min-height: 40px !important;
	}

	.separator {
		height: 1px;
		background-color: $light-color;
		width: 100%;
	}

	.sad {
		position: absolute;
		top: 41px;
		left: 0;
		height: 74px;
		width: 100%;
		text-align: center;
		padding-top: 24px;
	}

	.explorer {
		height : 0;
		overflow: hidden;

		cursor: pointer;
		user-select: none;

		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;

		padding-top: 31px;

		text-align: center;

		background: $white-color;
		background: linear-gradient(0deg, $white-color 0%, $white-color 80%, rgba(0,0,0,0) 100%);

		transition: height 0.125s ease;
	}

	.searchbar.large > .explorer {
		height: 64px;
	}

	.hidden {
		display: none;
	}
</style>
