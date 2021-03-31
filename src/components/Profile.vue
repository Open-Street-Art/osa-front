<template>
	<div id="id">
		<base-wrapper
			v-model="drawer">
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
					color="primary">
					<p class="emphase positionUserAccount">
						{{ oeuvre.data.data['username'] }}
					</p>
				</v-btn>
			</Header>
			<p class="base positionAccountType">
				{{ oeuvre.data.data.roles }}
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
					<p>
						{{ oeuvre.data.data }}
						{{ oeuvre.data.data['description '] }}
						{{ gotData }}
					</p>
					<p>{{ a+b }}</p>
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
import axios from 'axios';
export default {
	name: 'Home',
	components: {
		BaseWrapper,
		Photo,
		Header,
		Card
	},
	data () {
		return {
			drawer: false,
			gotData: false,
			oeuvre:[],
			a:'!',
			b:'!',
			id:1,

			username:'',
			roles:'',
			profilePicture:null,
			description:null,
			favArtists:[],
			favArts:[],
			favCities:[]
		};
	},
	mounted(){
		this.profile();
	},
	methods:{
		profile(){
		
			var res={
				id: '',
				username:'',
				roles:'',
				profilePicture:null,
				description:null,
				favArtists:[],
				favArts:[],
				favCities:[]
			};
			
	   this.gotData=false;
			axios
				.get('/api/user/'+this.id)
				.then((response) => {
					
					res=response;
					this.gotData=true;
					this.oeuvre=res;
					
					if(!this.gotData) {
						this.a='pas de donées';
						this.id=res.data.id,
						this.username=res.data.data.username,
						this.roles=res.roles,
						this.profilePicture=res.profilePicture,
						this.description=res.description,
						this.favArtists=res.favArtists,
						this.favArts=res.favArts,
						this.favCities=res.favCities;
					}
					else {
						this.b='il y a des données';
					}

				})
	  .catch((error) => console.error(error));
		
		}
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


