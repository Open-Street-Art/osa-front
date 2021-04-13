<template>
	<v-main>
		<div class="main">
			<base-wrapper
				v-model="drawer">
				<v-col />
			</base-wrapper>
		</div>
		<edit-profile :data="editProfileDisplay" />
	</v-main>
</template>
<script>
import BaseWrapper from '../components/BaseWrapper.vue';
import EditProfile from '../components/EditProfile.vue';
import router from '../router';

export default {
	name: 'Profile',
	components: {
		BaseWrapper,
		EditProfile
	},
	props: {
		editProfileDisplay: {
			default: false,
			type: Boolean
		}
	},
	data () {
		return {
			drawer: false
		};
	},
	mounted() {
		this.editProfileDisplay = true;
		// router.push('/editprofile');
	},
	methods: {
	}
};
</script>
<style lang="scss" >
@import "../assets/styles/text.scss";

.main {
	width: 100%;
	height: 60px
}

</style>
