// eslint-disable-next-line no-unused-vars
console.log('Hello from the background')
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background', request, sender, sendResponse)

  if (request.action === 'fromContent') {
    console.log('接收到content-script信息')
    chrome.notifications.create(
      {
        type: 'basic',
        title: 'serviceWorker通知',
        message: '接收到content-script信息',
        iconUrl: '../icons/icon-200.png',
      },
      (notificationId) => {
        console.log('notificationId-->', notificationId)
      }
    )
  }
})

const BAIDU_ORIGIN = 'https://www.baidu.com'

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return
  const url = new URL(tab.url)
  console.log('url', url.origin, BAIDU_ORIGIN)

  setupContextMenu()
  if (url.origin === BAIDU_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true,
    })
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    })
  }
})

function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'keyword-find',
    title: '打开侧边栏-%s',
    contexts: ['page', 'selection', 'link', 'editable', 'image', 'video', 'audio'],
  })
  chrome.contextMenus.onClicked.addListener((data, tab) => {
    // chrome.storage.session.set({ lastWord: data.selectionText })
    console.log('contentmenu----data----', chrome.storage)
    chrome.sidePanel.open({ tabId: tab.id })
  })
}
