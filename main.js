import './style.scss'

const canvas = document.getElementById('canvas')
const focusCanvas = document.getElementById('focus-canvas')

const ctx = canvas.getContext('2d');

const image = new Image()
image.src = './test.jpeg'
image.onload = () => {
  ctx.drawImage(image, 0, 0)
  ctx.strokeStyle = 'greenyellow'
  ctx.lineWidth = 3
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

const rect = { x: 400, y: 100, width: 200, height: 100 }

const SCALE = 1.8

const reset = () => {
  focusCanvas.style.opacity = 0
  focusCanvas.style.transform = `scale(1)`
}

const focus = () => {
  reset()

  focusCanvas.width = rect.width
  focusCanvas.height = rect.height
  const widthDiff = (focusCanvas.width - rect.width) / 2
  const heightDiff = (focusCanvas.height - rect.height) / 2
  focusCanvas.style.left = `${rect.x - widthDiff}px`
  focusCanvas.style.top = `${rect.y - heightDiff}px`
  focusCanvas.style.transform = `scale(${SCALE})`
  focusCanvas.style.opacity = 1

  focusCanvas.getContext('2d').drawImage(
    canvas,
    rect.x, rect.y, rect.width, rect.height,
    0, 0, focusCanvas.width, focusCanvas.height
  )
}

document.getElementById('focus').addEventListener('click', focus)
document.getElementById('reset').addEventListener('click', reset)




