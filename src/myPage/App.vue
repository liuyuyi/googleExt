<template>
  <div class="side-panel">my Page</div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log('sede pannel', chrome.storage.session)
  },
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
