<template>
	<l-map
		id="map"
		ref="map"
		:zoom="baseZoom"
		:center="baseCenter"
		:options="{zoomControl: false}"
		@update:zoom="$emit('zoomUpdate', $event)"
		@update:center="$emit('centerUpdate', $event)"
		@update:bounds="$emit('boundsUpdate', $event)"
		@ready="sendMap">
		<l-tile-layer :url="url" />
		<slot />
	</l-map>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LControlZoom} from 'vue2-leaflet';

export default {
	name: 'ArtMap',
	components: {
		LMap,
		LTileLayer
	},
	props: {
		baseCenter: {
			type: Array,
			default: () => [49.43671, 1.09294]
		},
		url: {
			type: String,
			default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
		},
		baseZoom: {
			type: Number,
			default: 15
		},
	},
	data () {
		return {
			zoom: 3,
			center: [49.43671, 1.09294],
			markerLatLng: [30, 1.0686564445495608],
			bounds: null,
			icon: L.divIcon({
				html: '<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 2C7.81286 2 2 7.81286 2 15C2 24.75 15 39.1429 15 39.1429C15 39.1429 28 24.75 28 15C28 7.81286 22.1871 2 15 2ZM15 19.6429C12.4371 19.6429 10.3571 17.5629 10.3571 15C10.3571 12.4371 12.4371 10.3571 15 10.3571C17.5629 10.3571 19.6429 12.4371 19.6429 15C19.6429 17.5629 17.5629 19.6429 15 19.6429Z" fill="#00BAAF" stroke="#FAFAFA" stroke-width="3"/></svg>'
			}),
		};
	},
	methods: {
		zoomUpdated (zoom) {
			this.zoom = zoom;
		},
		centerUpdated (center) {
			this.center = center;
		},
		boundsUpdated (bounds) {
			this.bounds = bounds;
		},
		sendMap() {
			this.$emit('mapref',this.$refs.map);
		}
	}
};
</script>

<style scoped >
#map {
	height: calc(100vh - 60px);
	width: 100vw;
}

html {
	overflow-y: hidden
}
</style>

