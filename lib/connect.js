import { connect } from 'react-redux'

export default connect(state => {
  return { ...state.initModel }
})
