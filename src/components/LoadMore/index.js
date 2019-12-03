import React from "react";

class LoadMore extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.myEfficientFn);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.myEfficientFn);
  }

  debounce(func, wait) {
    let timeout = null;
    return () => {
      const scrollY = window.scrollY;
      this.props.onScroll && this.props.onScroll(scrollY);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this);
      }, wait);
    };
  }

  myEfficientFn = this.debounce(this.scrollListener, 250);

  scrollListener() {
    const scrollY = window.scrollY;
    if (
      scrollY + document.documentElement.clientHeight >=
        document.body.clientHeight - 1 &&
      this.props.isAllow
    ) {
      this.props.onBottom();
    }
  }
  render() {
    return this.props.children;
  }
}

export default LoadMore;
