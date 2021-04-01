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
						:link-photo="oeuvre.data.data['profilePicture']"
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
				{{ oeuvre.data.data['description'] }}
			</p>
		
			
			<div class="row position button">
				<div class="col-1" />
				<div class="col-5">
					<p
						@click="contrib()">
						Contribution
					</p>
				</div>
				<div class="col-2">
					<v-icon
						color="#00baaf"
						@click="artiste()">
						mdi-account-box
					</v-icon>
				</div>
				<div class="col-2">
					<v-icon
						color="#00baaf"
						@click="city()">
						mdi-city
					</v-icon>
				</div>
				<div class="col-2">
					<v-icon
						color="#00baaf"
						@click="oeuvres()">
						mdi-palette
					</v-icon>
				</div>
			</div>
			<v-container class="pos">
				<v-divider />
				<v-container v-if="contribution==true">
					<Card 
					
						card-title="Nom de l’œuvre"
						card-desc="Artiste inconnu, Rouen" />
				</v-container>
				
				<v-container v-else-if="artisteFav==true">
					<Card
						card-title="Nom de l’artiste"
						card-desc="Artiste inconnu, Rouen" />
				</v-container>
			
				<v-container v-else-if="cityFav==true">
					<Card
						card-title="Nom de la ville"
						card-desc="Artiste inconnu, Rouen" />
					<p>
						{{ oeuvre.data.data }}
						{{ oeuvre.data.data['description '] }}
						{{ gotData }}
					</p>
					<p
						v-for="value in favArts"
						:key="value">
						{{ value }}+efvfdv
					</p>
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
			oeuvreFav:false,
			contribution:true,
			cityFav:false,
			artisteFav:false,
			id:-1,

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
					this.favArts=oeuvre.data.data['favArts'];
					
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
		
		},
		artiste(){
			this.artisteFav=true;
			this.oeuvreFav=false;
			this.contribution=false;
			this.cityFav=false;
		},
		oeuvres(){
			this.artisteFav=false;
			this.oeuvreFav=true;
			this.contribution=false;
			this.cityFav=false;
		},
		contrib(){
			this.artisteFav=false;
			this.contribution=true;
			this.oeuvreFav=false;
			this.cityFav=false;
		},
		city(){
			this.artisteFav=false;
			this.cityFav=true;
			this.oeuvreFav=false;
			this.contribution=false;
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


