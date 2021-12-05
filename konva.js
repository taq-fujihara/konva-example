import Konva from 'konva'

const SCALE = 1.8

const loadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const cropKonvaImage = (image, { x, y, w, h }) => {
  return new Promise(resolve => {
    image.toImage({ x, y, width: w, height: h, callback: resolve })
  })
}

const ease = x => x * x * x + x * 1.4 * Math.sin(x * Math.PI)


const stage = new Konva.Stage({
  container: 'container',   // id of container <div>
  width: 800,
  height: 400,
})

const layer = new Konva.Layer()

const imageObj = await loadImage('./test.jpeg')

const image = new Konva.Image({ image: imageObj })
layer.add(image)

const borders = [
  { x: 400, y: 100, w: 200, h: 100 },
  { x: 20, y: 150, w: 200, h: 100 },
]

for (const border of borders) {
  const cropped = await cropKonvaImage(image, border)

  const rect = new Konva.Rect({
    x: border.x,
    y: border.y,
    width: border.w,
    height: border.h,
    stroke: 'yellow',
    strokeWidth: 3,
    fillPatternImage: cropped,
  })

  rect.on('click', async () => {
    const duration = 300
    const baseScale = 1

    if (rect.getAbsoluteScale().x > baseScale) {
      rect.setAttrs({
        x: border.x,
        y: border.y,
        scale: { x: baseScale, y: baseScale },
      })
    } else {
      const anim = new Konva.Animation(
        frame => {
          let phase = frame.time / duration
          phase = phase > 1 ? 1 : phase

          const scale = baseScale + (SCALE - baseScale) * ease(phase)

          const wDiff = border.w * scale - border.w
          const hDiff = border.h * scale - border.h

          rect.setAttrs({
            x: border.x - wDiff / 2,
            y: border.y - hDiff / 2,
            scale: { x: scale, y: scale },
          })

          if (phase >= 1) {
            console.log('animation stop');
            anim.stop()
          }
        },
        layer
      )

      console.log('animation start');
      anim.start()
    }
  })

  layer.add(rect)
}

stage.add(layer)

layer.draw()
