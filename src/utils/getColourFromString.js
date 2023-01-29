const ColorHash = require('color-hash').default

const colorHash = new ColorHash({
  lightness: 0.6,
  saturation: 0.4,
})

const getColourFromString = (item) => {
  const tagHsl = colorHash.hsl(item)
  const tagColor = `hsla(${tagHsl[0]},${tagHsl[1] * 100}%,${
    tagHsl[2] * 100
  }%,0.6)`
  return tagColor
}

module.exports = { getColourFromString }
