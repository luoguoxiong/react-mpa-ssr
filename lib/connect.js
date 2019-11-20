import { connect } from "./redux";

export default connect(state => {
  return { ...state.initModel };
});
