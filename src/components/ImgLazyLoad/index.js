import React, { Component } from "react";
import "./index.less";
class ImgLazyLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      isLoading: false
    };
    this.handler = this.handler.bind(this);
  }
  componentDidMount() {
    this.handler();
    window.addEventListener("scroll", this.handler);
  }
  handler() {
    if (!this.state.isLoading) {
      const { offSetTop, realUrl } = this.props;
      const visibleBottom =
        window.scrollY + document.documentElement.clientHeight - offSetTop;
      const imgTop = this.refs.imgLazyLoad.getBoundingClientRect().top;
      if (imgTop < visibleBottom) {
        let imgObj = new Image();
        imgObj.src = realUrl;
        this.setState({ isLoading: true });
        new Promise((resolve, reject) => {
          imgObj.onload = function() {
            resolve(imgObj);
          };
        }).then(imgObj => {
          this.setState({ isLoad: true });
        });
      }
    } else {
      window.removeEventListener("scroll", this.handler);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handler);
  }
  render() {
    const { isLoad } = this.state;
    const { realUrl, initUrl } = this.props;
    const imgSrc = isLoad ? realUrl : initUrl;
    return (
      <img
        ref="imgLazyLoad"
        className={isLoad ? "imgLazyload loadEnd" : "imgLazyload loading"}
        src={imgSrc}
        alt="imgLazyLoad"
      />
    );
  }
}
ImgLazyLoad.defaultProps = {
  offSetTop: 0,
  initUrl: "/static/loading.png"
};
export default ImgLazyLoad;
