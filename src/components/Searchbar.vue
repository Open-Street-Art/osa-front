<template>
	<div
		ref="container"
		class="searchbar"
		:value="value"
		@update="$emit('update', $event)">
		<v-text-field
			v-model="value"
			:value="value"
			clearable
			flat
			solo
			hide-details
			:placeholder="this.$t(placeholder)"
			@input="updateSearchBar"
			@focus="focusSearchBar" />
		<slot />
		<div
			v-if="resultCount==0"
			class="sad light-emphase py-5">
			{{ this.$t("search.sad") }}
		</div>
		<div
			v-if="resultCount>0 && showButton"
			class="separator mt-1 mb-2" />
		<div
			v-if="resultCount>0 && showButton"
			class="explorer button"
			@click="close">
			{{ this.$t("search.explore") }}
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
		},
		placeholder: {
			default: 'search.bar',
			type: String
		}
	},
	data: function() {
		return {
			lastUpdate: 0,
			delay: 300,
			minSize: 1,
			value: ''
		};
	},
	methods: {
		updateSearchBar: function (event) {
			this.$emit('update', event);
			if(this.value != null && this.value.length > this.minSize) {
				this.$refs.container.classList.add('large');
			}
			else {
				this.$refs.container.classList.remove('large');
			}

			if (this.lastUpdate >= (Date.now() - this.delay)) return; //évite de bombarder d'update a chaque input (limite a 1/300ms)
			this.lastUpdate = Date.now();
		},
		focusSearchBar() {
			if(this.value != null && this.value.length > this.minSize) {
				this.$refs.container.classList.add('large');
			}
			else {
				this.$refs.container.classList.remove('large');
			}
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
		padding: px;
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
		width: 90%;
		margin:auto
	}

	.sad {
		width: 100%;
		text-align: center;
	}

	.explorer {
		user-select: none;

		text-align: center;
		padding-bottom: 10px;
		background: $white-color;
		background: linear-gradient(0deg, $white-color 0%, $white-color 80%, rgba(0,0,0,0) 100%);

		transition: height 0.125s ease;
	}


	.hidden {
		display: none;
	}
</style>
