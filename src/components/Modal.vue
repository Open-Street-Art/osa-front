<template>
	<v-row justify="space-around">
		<v-col cols="auto">
			<v-dialog
				transition="dialog-bottom-transition"
				max-width="600">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						color="primary"
						v-bind="attrs"
						v-on="on">
						From the button
					</v-btn>
				</template>
				<template
					v-slot:default>
					<v-card>
						<slot name="header" />
						<v-card-text>
							<div class="text-h2 pa-12">
								<slot />
							</div>
						</v-card-text>
					</v-card>
				</template>
			</v-dialog>
		</v-col>
	</v-row>
</template>
<script>
import '../stories/Texts';
export default {
	name: 'Modal',
	props: {
		textModal: {
			default: ' defaultLabel ',
			type: String
		}
	}
};
</script>
<style lang="scss">
@import "../assets/styles/text.scss";

.modal-text{
 position: absolute;
  z-index: 100;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}
</style><style lang="scss">
@import "../assets/styles/text.scss";

.blur {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  height: 100%;
  width: 100%;

  background-color: rgba(0,0,0,0.5);
}

.modal {
  position: absolute;
  background-color: $white-color;
  overflow: hidden;
}

.modal-mobile {
  top: 13px;
  left: 13px;
  border-radius: 20px 20px 0 0;
  height: calc(100% - 13px);
  width: calc(100% - 26px);

}

.modal-arrow {
  position: absolute;
  z-index: 100;
  top: 13px;
  left: 50%;
  transform: translateX(-50%);
}

</style>
