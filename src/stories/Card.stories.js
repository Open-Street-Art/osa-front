import Card from '../components/Card.vue';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Card',
	component: Card
};

const ACTemplate = (args, { argTypes }) => ({
	components: { Card },
	props: Object.keys(argTypes),
	template: '<v-container><Card :cardTitle="cardTitle" :cardDesc="cardDesc"/></v-container>',
});

const CCTemplate = (args, { argTypes }) => ({
	components: { Card },
	props: Object.keys(argTypes),
	template: '<v-container><Card :cardTitle="cardTitle" :cardDesc="cardDesc" :roundImg="true"/></v-container>',
});

export const ArtworkCard = ACTemplate.bind({});
ArtworkCard.args = { cardTitle: 'Nom de l’œuvre', cardDesc: 'Artiste inconnu, Rouen'};

export const ArtistCard = ACTemplate.bind({});
ArtistCard.args = { cardTitle: 'Nom de l’artiste', cardDesc: 'Nombre d’œuvres'};

export const CityCard = ACTemplate.bind({});
CityCard.args = { cardTitle: 'Nom de la ville', cardDesc: 'Nombre d’œuvres'};

export const ContribCard = CCTemplate.bind({});
ContribCard.args = { cardTitle: 'Nom du contributeur', cardDesc: 'Nombre de contributions'};

