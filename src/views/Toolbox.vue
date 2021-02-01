<template>
	<v-main>
		<v-container fluid>
			<Clipboard code="Le code a copier">
				<Sample />
			</Clipboard>
			<div>
				<p class="text-h5">
					Searchbar
				</p>
			</div>
			<div>
				<p class="text-h5">
					Cards
				</p>
			</div>
			<div>
				<p class="text-h5">
					Modal
				</p>
			</div>
			<div>
				<p class="text-h5">
					ListGroup
				</p>
			</div>
			<div>
				<p class="text-h5">
					ActionsMenu
				</p>
			</div>
			<div>
				<p class="text-h5">
					Buttons
				</p>
			</div>
			<div>
				<p class="text-h5">
					Photos
				</p>
			</div>
			<div>
				<p class="text-h5">
					Icons
				</p>
			</div>
			<div>
				<p class="text-h5">
					Textes
				</p>
			</div>
			<div>
				<p class="text-h5">
					Form
				</p>
				<div>
					<p class="text-h6">
						TextInput
					</p>
				</div>
				<div>
					<p class="text-h6">
						LocalisationInput
					</p>
				</div>
				<div>
					<p class="text-h6">
						MediaInput
					</p>
				</div>
			</div>
		</v-container>
	</v-main>
</template>

<script>
import Clipboard from '../components/Clipboard.vue';
import Sample from '../components/Sample.vue';

export default {
	name: 'Toolbox',
	components: {
		Clipboard,
		Sample
	}
};
</script>

<style>

</style>
