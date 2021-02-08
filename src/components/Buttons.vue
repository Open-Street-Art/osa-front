<template>
	<div
		id="button"
		class="button">
		<button class="button-full">
			full button
		</button>
		<button class="button-empty">
			empty button
		</button>
	</div>
</template>
<script>
export default {
	name: 'Button'
};
</script>
<style lang="scss">
.button-full {
  position: absolute;
  left: 3.47%;
  right: 17.33%;
  top: 9.75%;
  bottom: 84.41%;
  border: 2px solid #00baaf;
  background: #00baaf;
  border-radius: 20px;
  font : 14px Arial, Helvetica, sans-serif;
}

.button-empty {
  position: absolute;
  left: 3.47%;
  right: 17.33%;
  top: 1.95%;
  bottom: 92.2%;

  background: #fafafa;
  border: 2px solid #00baaf;
  box-sizing: border-box;
  border-radius: 20px;
  font : 14px Arial, Helvetica, sans-serif;
}
</style>
