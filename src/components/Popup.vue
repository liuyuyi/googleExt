<template>
  <div class="popup-wrap">
    <p
        Popup.html{{ defaultText }}
    </p>
    <div @click="handlerSend">向content发送</div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data(){
    return {
      tab: null
    }
  },
  async mounted() {
    // chrome.runtime.sendMessage({})

    const [tab] = await chrome.tabs.query({
      url: ['https://www.baidu.com/*'],
      active: true,
      currentWindow: true,
    })
    if(tab){
      this.tab = tab
    }
    console.log('tab', tab)
  },
  computed: {
    defaultText() {
      return chrome.i18n.getMessage('extName')
    },
  },
  methods:{
    handlerSend(){
      if (this.tab) {
        // 使用 chrome.tabs.sendMessage 发送消息
        chrome.tabs.sendMessage(this.tab.id, {
          action: 'fromPopup2Content',
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-wrap {
  width: 200px;
  height: 300px;
  background: #fdf4f8;
}
</style>
