import Map from '../components/Map.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Map',
	component: Map,
};

const Template = (args, { argTypes }) => ({
	components: { Map },
	props: Object.keys(argTypes),
	template: '<Map :baseCenter="baseCenter" :baseZoom="baseZoom" @zoomUpdate="zoomAction" @centerUpdate="centerAction" @boundsUpdate="boundsAction"/>',
	methods: {
		zoomAction: action('zoomUpdate'),
		centerAction: action('centerUpdate'),
		boundsAction: action('boundsUpdate')
	}
});

export const MapSample = Template.bind({});

MapSample.args = { baseCenter:[49.386758892241396, 1.0686564445495608] ,baseZoom: 15};
