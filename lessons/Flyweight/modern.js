class Formatting {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.capitalize = false
  }
}

class TextFormatting {
  constructor(text) {
    this.plainText = text
    this.formatting = []
  }

  #sortFormatting() {
    this.formatting.sort((f1, f2) => {
      const diffStart = f1.start - f2.start
      if (diffStart === 0) {
        return f1.end - f2.end
      }
      return diffStart
    })
  }

  getRange(start, end) {
    const range = new Formatting(start, end)
    this.formatting.push(range)
    this.#sortFormatting()
    return range
  }

  toString() {
    const buff = []
    let lastEnd = 0
    let lastStart = 0
    for (const range of this.formatting) {
      if (lastEnd < range.start) {
        lastStart = range.start
        buff.push(
          this.plainText.slice(lastEnd, lastStart)
        )
        lastEnd = range.end
      } else if (lastEnd > range.start) {
        lastStart = lastEnd
      }

      let subStr = this.plainText.slice(lastStart, range.end)
      if (range.capitalize) {
        subStr = subStr.toUpperCase()
      }

      buff.push(subStr)
      lastEnd = range.end
    }

    if (lastEnd < this.plainText.length - 1) {
      buff.push(this.plainText.slice(lastEnd))
    }

    return buff.join("")
  }
}

const text = "Hello, I am average front end developer"

const tf = new TextFormatting(text)

// tf.getRange(10, 15).capitalize = true
// tf.getRange(10, 20).capitalize = true
// tf.getRange(5, 15).capitalize = true

tf.getRange(5, 10).capitalize = true
tf.getRange(15, 20).capitalize = true
tf.getRange(17, 25).capitalize = true
tf.getRange(23, 30).capitalize = true

console.log(tf.toString())
