import R from 'ramda'
const changeToArr = R.unless(R.is(Array), R.of)
export default middleware => {
  return (target, key, descriptor) => {
    target[key] = R.compose(
      R.concat(changeToArr(middleware)),
      changeToArr
    )(target[key])
    return descriptor
  }
}
