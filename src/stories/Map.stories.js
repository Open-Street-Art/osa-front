import ArtMap from '../components/ArtMap.vue';
import Pin from '../components/Pin.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Map',
	component: Map,
	subComponent: { Pin }
};

const Template = (args, { argTypes }) => ({
	components: { ArtMap },
	props: Object.keys(argTypes),
	template: '<ArtMap style="width: 80%" :baseCenter="baseCenter" :baseZoom="baseZoom" @zoomUpdate="zoomAction" @centerUpdate="centerAction" @boundsUpdate="boundsAction"/>',
	methods: {
		zoomAction: action('zoomUpdate'),
		centerAction: action('centerUpdate'),
		boundsAction: action('boundsUpdate')
	}
});

export const MapSample = Template.bind({});

MapSample.args = { baseCenter:[49.386758892241396, 1.0686564445495608] ,baseZoom: 15};

const Template2 = (args, { argTypes }) => ({
	components: { ArtMap, Pin},
	props: Object.keys(argTypes),
	template: '<ArtMap style="width: 80%" :baseCenter="baseCenter" :baseZoom="baseZoom" @zoomUpdate="zoomAction" @centerUpdate="centerAction" @boundsUpdate="boundsAction"><Pin :markerLatlng="markerLatlng"></Pin></ArtMap>',
	methods: {
		zoomAction: action('zoomUpdate'),
		centerAction: action('centerUpdate'),
		boundsAction: action('boundsUpdate')
	}
});

export const MapPinSample = Template2.bind({});

MapPinSample.args = { baseCenter:[49.386758892241396, 1.0686564445495608] ,baseZoom: 15, markerLatlng: [49.386758892241396, 1.0686564445495608]};


const Template3 = (args, { argTypes }) => ({
	components: { ArtMap, Pin},
	props: Object.keys(argTypes),
	template: '<ArtMap style="width: 80%" :baseCenter="baseCenter" :baseZoom="baseZoom" @zoomUpdate="zoomAction" @centerUpdate="centerAction" @boundsUpdate="boundsAction"><Pin :markerLatlng="markerLatlng"></Pin></ArtMap>',
	methods: {
		zoomAction: action('zoomUpdate'),
		centerAction: action('centerUpdate'),
		boundsAction: action('boundsUpdate')
	}
});

export const MapPopupSample = Template3.bind({});

MapPinSample.args = { baseCenter:[49.386758892241396, 1.0686564445495608] ,baseZoom: 15, markerLatlng: [49.386758892241396, 1.0686564445495608]};
