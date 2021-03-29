<template>
	<div id="id">
		<base-wrapper v-model="drawer">
			<Header class="test">
				<v-btn
					class="homeButton"
					left
					fab
					text
					small
					color="primary"
					@click.stop="drawer = !drawer">
					<v-icon color="white">
						mdi-menu
					</v-icon>
					<Photo
						class="positionPicture"
						link-photo="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						:max-heigth="80"
						:max-width="80"
						forme="forme-profile" />
				</v-btn>
			</Header>
			<Header class="test">
				<v-btn
					class="homeButton"
					left
					fab
					text
					small
					color="primary"
					@click.stop="drawer = !drawer">
					<p class="emphase positionUserAccount">
						Nom d'utilisateur
					</p>
				</v-btn>
			</Header>
			<p class="base positionAccountType">
				Type de compte
			</p>
			<p class="positionUserAccountText base">
				Ceci est un texte à propos de moi qui fait moins de 160 caractère.
			</p>
			<p class="position button">
				Contribution
				<v-icon color="#00baaf">
					mdi-account-box
				</v-icon>
				<v-icon color="#00baaf">
					mdi-city
				</v-icon>
				<v-icon color="#00baaf">
					mdi-palette
				</v-icon>
			</p>
			<v-container class="pos">
				<v-divider />
				<v-container>
					<Card
						card-title="Nom de l’œuvre"
						card-desc="Artiste inconnu, Rouen" />
				</v-container>
				<v-divider />
				<v-container>
					<Card
						card-title="Nom de l’œuvre"
						card-desc="Artiste inconnu, Rouen" />
				</v-container>
				<v-divider />
				<v-container>
					<Card
						card-title="Nom de l’œuvre"
						card-desc="Artiste inconnu, Rouen" />
				</v-container>
			</v-container>
		</base-wrapper>
	</div>
</template>
<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import Header from '../components/Header.vue';
import Photo from '../components/Photo.vue';
import Card from '../components/Card.vue';
//import axios from 'axios';
export default {
	name: 'Home',
	components: {
		BaseWrapper,
		Photo,
		Header,
		Card
	}
};
</script>
<style lang="scss" >
@import "../assets/styles/text.scss";

.positionPicture{
	position: absolute;
	left:10px;
	top: 60px;
	border: 4px solid  #00BAAF;
}
.positionAccountType{
	position: absolute;
	left:100px;
}
.positionUserAccount{
	position: absolute;
	left:90px;
	top: 6px;
}
.positionUserAccountText{
	position: absolute;
	left:10px;
	top: 190px;
}
.position{
	position: absolute;
	left:50px;
	top: 300px;
}
.pos{
position: absolute;

	top: 320px;	
}
</style>


