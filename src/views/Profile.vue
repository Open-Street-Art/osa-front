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
				<div 
					v-if="canAddProfileFavorite"
					class="col-2">
					<v-icon 
						v-if="!isFavorited"
						color="#00baaf">
						mdi-star-outline
					</v-icon>
					<v-icon
						v-if="isFavorited"
						color="#00baaf">
						mdi-star
					</v-icon>
				</div>
			</div>
			<v-container class="pos">
				<v-divider />
				<v-container v-if="contribution==true">
					<div
						v-for="i in cont"
						:key="i">
						<Card 
					
							card-title="Nom de la contribution"
							+{{i}}
							card-desc="Artiste inconnu, Rouen" />
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
		</base-wrapper>
	</div>
</template>
<script>
import jwt_decode from 'jwt-decode';
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
			fa:[],
			fc:[],
			far:[],
			cont:[],
			role:'',
			isFavorited: false
		};
	},
	created() {
		axios
			.get('/api/user/profile')
			.then((response) => {
				for(const artiste of  response.data.data.favArtists) {
					if (artiste.id == this.id) {
						this.isFavorited = true;
						break;
					}
				}
			})
			.catch((error) => console.error(error));
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
				favCities:[],
				isFavorited: false
			};
			
	   this.gotData=false;
			axios
				.get('/api/user/'+this.id)
				.then((response) => {
					
					res=response;
					this.gotData=true;
					this.oeuvre=res;
					this.role=res.data.data.role;
					
					if(!this.gotData) {
						this.fa=oeuvre.data.data['favArts'];
						this.far=oeuvre.data.data['favArtists'];
						this.fc=oeuvre.data.data['favCity'];
					
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
		},
		showButton() {
			var token = localStorage.getItem('authtoken');
			var userCheck = '';
			if(token != null) {
				axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
				var userInfo = jwt_decode(token);
				userCheck = userInfo.sub;
			}

			return this.username !== userCheck && this.role === 'ROLE_ARTIST';
		},
		addToFavorite() {
			axios
				.post('/api/fav/artist/' + this.id)
				.then((response) => {
					EventBus.$emit('success', 'profile.added');
					this.isFavourited = true;
				})
				.catch((error) => {
					if (error.response.status === 401) {
						EventBus.$emit('error', 'unauthorized');
					} else {
						EventBus.$emit('error', 'unknown');
					}
				});
		},
		removeToFavorite() {
			axios
				.delete('/api/fav/artist/' + this.id)
				.then((response) => {
					EventBus.$emit('success', 'profile.deleted');
					this.isFavourited = false;
				})
				.catch((error) => {
					if (error.response.status === 401) {
						EventBus.$emit('error', 'unauthorized');
					} else {
						EventBus.$emit('error', 'unknown');
					}
				});
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


