<template>
	<v-btn
		v-model="$i18n.locale"
		@click="switchLocale">
		🌐 {{ $i18n.locale }}
	</v-btn>
</template>

<script>
export default {
	name: 'LocaleChanger',
	data () {
		return { langs: ['fr', 'en'] };
	},
	methods: {
		switchLocale() {
			if(this.$i18n.locale == this.langs[1])
				this.$i18n.locale = this.langs[0];
			else
				this.$i18n.locale = this.langs[1];
		}
	}
};
</script>
