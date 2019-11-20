const toString = Object.prototype.toString
const browser =
  typeof window === 'object' &&
  typeof window.document === 'object' &&
  toString.call(window.document.body) === '[object HTMLBodyElement]'

const server = typeof process === 'object' && typeof process.env === 'object'

export default server && !browser