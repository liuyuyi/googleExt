<template>
  <div>
    devtools
    {{ data }}<br />
    {{ content }}<br />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: null,
      content: '',
    }
  },
  mounted() {
    chrome.devtools.panels.create('自定义panel', 'icons/icon-a.png', 'devtool.html', (panel) => {
      console.log('panel-----------', panel)

      chrome.devtools.network.onRequestFinished.addListener((response) => {
        console.log('onRequestFinished', response)
        this.data = JSON.stringify(response)
        response.getContent((content) => {
          console.log('content', content)
          this.content = JSON.stringify(content)
        })
      })
    })
  },
}
</script>

<style></style>
