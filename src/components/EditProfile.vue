<template>
	<div>
		<Modal
			v-model="data"
			@close="$emit('close')">
			<Header
				class="header">
				<h1
					class="header-center header-title">
					EditProfile
				</h1>
			</Header>
		</Modal>
	</div>
</template>
