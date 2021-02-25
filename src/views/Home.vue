<template>
	<v-main>
		<div class="test">
			<base-wrapper
				v-model="drawer"
				base-wrapper>
				<v-btn
					class="tempButton"
					fab
					color="primary"
					@click.stop="drawer = !drawer">
					<v-icon color="white">
						mdi-menu
					</v-icon>
				</v-btn>
				<art-map class="artmap" />
			</base-wrapper>
		</div>
	</v-main>
</template>

<script>
import ArtMap from '../components/ArtMap.vue';
import BaseWrapper from '../components/BaseWrapper.vue';

export default {
	name: 'Home',
	components: { BaseWrapper, ArtMap },
	data () {
		return {
			drawer: false
		};
	}
};
</script>

<style>

.tempButton {
    position: absolute !important;
    top: 10px;
		left: 10px;
		z-index: 1000;
}

</style>
