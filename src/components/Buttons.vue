<template>
	<div
		id="button">
		<v-btn
			class="button-full button-white"
			color="#00baaf">
			{{ textButton }}
		</v-btn>
		<v-btn class="button-empty button">
			{{ textButton }}
		</v-btn>
	</div>
</template>
<script>
export default {
	name: 'Button',
	props: {
		textButton: {
			default: ' Par défaut ',
			type: String
		}
	},
	data: function() {
		return {
			button: '',
		};
	}
};
</script>
<style lang="scss">
.button-full {
  left: 3.47%;
  right: 17.33%;
  top: 9.75%;
  bottom: 84.41%;
  border: 2px solid #00baaf;
  background: #00baaf;
  border-radius: 20px;

position: absolute;
width: 206px;
height: 30px;
left: 59px;
top: 70px;

font-family: Open Sans;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 22px;
display: flex;
align-items: center;
text-align: center;
color: #FAFAFA;

}

.button-empty {
  left: 3.47%;
  right: 17.33%;
  top: 1.95%;
  bottom: 92.2%;

  background: #fafafa;
  border: 2px solid #00baaf;
  box-sizing: border-box;
  border-radius: 20px;

position: absolute;
width: 206px;
height: 30px;
left: 59px;
top: 18px;

font-family: Open Sans;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 22px;
display: flex;
align-items: center;
text-align: center;

color: #00BAAF;

}

	 @import "../assets/styles/text.scss";


</style>
