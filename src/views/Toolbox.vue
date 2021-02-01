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
				<p class="base">
					<v-container>
						<v-ul>
							<v-li>
								<clipboard code="title">
									<p class="title">
										Texte de titre
									</p>
								</clipboard>
							</v-li>
							<v-li>
								<clipboard code="emphase">
									<p class="emphase">
										Texte emphasé
									</p>
								</clipboard>
							</v-li>
							<v-li>
								<clipboard code="base">
									<p class="base">
										Texte de base
									</p>
								</clipboard>
							</v-li>
							<v-li>
								<clipboard code="light">
									<p class="light">
										Texte clair
									</p>
								</clipboard>
							</v-li>
							<v-li>
								<clipboard code="button">
									<p class="button">
										bouton / lien
									</p>
								</clipboard>
							</v-li>
						</v-ul>
					</v-container>
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

<style lang="scss">
	@import "../assets/styles/text.scss";
</style>

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

