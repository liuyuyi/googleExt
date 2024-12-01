console.log('Hello from the content-script')

chrome.runtime.onMessage.addListener((e) => {
  console.log('e', e)
  alert(e.action)
})
createPage()
function createPage() {
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.top = 0
  div.style.left = 0
  div.style.width = '50px'
  div.style.height = '150px'
  div.style.zIndex = '1000'
  div.innerText = 'content添加按钮'
  div.style.backgroundColor = 'yellow'
  div.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'fromContent' })
  })
  document.body.appendChild(div)
}
