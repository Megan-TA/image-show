var formData = new FormData()
var fileReader = new FileReader()
var image = new Image()
// 预览图
var canvas = document.querySelector('#js-imgShow-canvas')
var canvasCtx = canvas.getContext('2d')
// 原图
var canvas2 = document.querySelector('#js-imgShow-img')
var canvasCtx2 = canvas2.getContext('2d')
var sourcePathInfo = canvas2.getBoundingClientRect()

var imgShow = document.querySelector('#js-imgShow')
var selectBtn = document.querySelector('[data-name = js-imgShow-selectBtn]')
var imgData = document.querySelector('[data-name = js-imgShow-file]')
var flag = false  // 点击状态标记
var W
var H
var startX
var startY

selectBtn.addEventListener('click', function (e) {
  imgData.click()
}, false)

imgData.addEventListener('change', function (e) {
  var files = e.target.files[0]
  formData.append('image', files)
  console.log(formData.getAll('image'))
  fileReader.readAsDataURL(files)
}, false)

fileReader.onload = function (e) {
  var url = e.target.result
  image.src = url
}
image.onload = function (e) {
  W = image.width
  H = image.height
  canvas2.width = W
  canvas2.height = H
  canvas2.className = ''
  canvasCtx2.drawImage(image, 0, 0)
  canvasCtx.drawImage(image, 0, 0)
}

function startDrag (x, y, width, height) {
  var sourceImgInfo = canvasCtx2.getImageData(x, y, 200, 200)
  canvasCtx.putImageData(sourceImgInfo, 0, 0)
}

canvas2.addEventListener('mousedown', function (e) {
  flag = true
  startX = e.clientX - sourcePathInfo.left
  startY = e.clientY - sourcePathInfo.top
  return false
}, false)

canvas2.addEventListener('mousemove', function (e) {
  if (flag) {
    var endX = e.clientX - startX
    var endY = e.clientY - startY
    if (endY === 0 || endX === 0) return
    canvasCtx2.clearRect(0, 0, W, H)
    canvasCtx2.drawImage(image, 0, 0)
    canvasCtx2.strokeRect(startX, startY, endX, endY)
    canvasCtx.clearRect(0, 0, 100, 100)
    var cutData = canvasCtx2.getImageData(startX, startY, endX, endY)

    canvasCtx.putImageData(cutData, 0, 0)
  }
}, false)

canvas2.addEventListener('mouseup', function (e) {
  flag = false
  canvasCtx2.clearRect(0, 0, W, H)
  canvasCtx2.drawImage(image, 0, 0)
  console.log('抬起')
})
