<template>
	<div id="app">
		<v-img
			:max-height="maxHeigth"
			:max-width="maxWidth"
			:src="linkPhoto"
			:class="forme" />
	</div>
</template>
<script>
export default {
	name: 'Photo',
	props: {
		linkPhoto: {
			default: 'https://picsum.photos/id/11/500/300',
			type: String
		},
		maxHeigth:{
			default: 150,
			type: Number
		},
		maxWidth:{
			default: 250,
			type: Number
		},
		forme:{
			default: 'forme-oeuvre',
			type: String  
		}
	},
	data: function() {
		return {
			photo: '',
		};
	},
	watch: {
      	linkPhoto: function(newVal, oldVal) { // watch it
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		},
		maxHeigth: function(newVal, oldVal) { // watch it
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		},
		maxWidth: function(newVal, oldVal) { // watch it
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		},
		forme: function(newVal, oldVal) { // watch it
			console.log('Prop changed: ', newVal, ' | was: ', oldVal);
		}
	}
};
</script>
<style lang="scss">
.forme-oeuvre{
position: absolute;
left: 3.72%;
right: 82.52%;
top: 17.57%;
bottom: 17.57%;

//background: url(image.png);
border-radius: 10px;
}
/*.forme-profile{
position: absolute;
width: 80px;
height: 80px;
left: 13px;
top: 60px;

//background: url(image.png);
border: 4px solid #00BAAF;
box-sizing: border-box;
}*/
.forme-profile{
    overflow:hidden;
    -webkit-border-radius:50px;
    -moz-border-radius:50px;
    border-radius:50px;
    width:90px;
    height:90px;
}
</style>