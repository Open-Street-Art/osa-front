<template>
	<div id="id">
		<BaseWrapper
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
		</BaseWrapper>
		<div>
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
					<div
						v-for="i in lescontribs"
						:key="i">
						<Card 
					
							:card-title="i['name']"
							:card-desc=" i['author_name']+ ville" />
						<v-divider />
					</div>
				</v-container>
				<v-container v-else-if="artisteFav==true">
					<div
						v-for="i in fc"
						:key="i">
						<Card 
							card-title=""
							+i.username
							card-desc="Artiste inconnu, Rouen" />
						<v-divider />
					</div>
				</v-container>
			
				<v-container v-else-if="cityFav==true">
					<div
						v-for="i in far"
						:key="i">
						<Card
							card-title="Nom de la ville"
							+i.name
							card-desc="Artiste inconnu, Rouen" />
						<v-divider />
					</div>
				</v-container>
				<v-container v-else>
					<div
						v-for="i in fa"
						:key="i">
						<Card
							card-title="Nom de l’oeuvre"
							+i.name
							card-desc=""
							+{{i.author_name}} />
						<v-divider />
					</div>
				</v-container>
			</v-container>
		</div>
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
			gotData2:false,
			oeuvre:[],
			lescontrib:[],
			oeuvreFav:false,
			contribution:true,
			cityFav:false,
			artisteFav:false,
			id:-1,
			fa:[],
			fc:[],
			far:[],
			cont:[]

		};
	},
	mounted(){
		this.profile();
		this.lescontributions();
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
						this.fa=oeuvre.data.data['favArts'];
						this.far=oeuvre.data.data['favArtists'];
						this.fc=oeuvre.data.data['favCity'];
					
					}
					

				})
	           .catch((error) => console.error(error));
		
		},
		lescontributions(){
			this.gotData2=false;
			axios
			 .get('/api/contrib/user/contribs')
			   .then((response) => {
					
					res=response;
					this.gotData2=true;
					this.oeuvre=res;
					
					
					
					if(!this.gotData2) {
						this.cont=lescontribs.data.data;
					}
					

				});
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
	left:95px;
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


