import React from "react";
import { Tab, ImgLazyLoad } from "@src/components";
import { setInitModel } from "@lib/inject";
import http from "@src/api";
import "./index.less";
@setInitModel
export default class User extends React.Component {
  constructor(props) {
    super(props);
    let { errno } = props;
    if (errno === 0) {
      this.state = {
        errno,
        ...props.data
      };
    } else {
      this.state = {
        errno
      };
    }
    // count, currentPage,
  }

  async componentDidMount() {
    const data = await http.getTopicList({ page: 1, size: 1 });
    console.log(data);
  }

  render() {
    if (this.state.errno === 0) {
      const { data } = this.state;
      return (
        <div id="topicPage">
          {data.map(item => (
            <div key={item.id} className="topicItem">
              <ImgLazyLoad
                realUrl={item.scene_pic_url}
                initUrl="https://s1.hdslb.com/bfs/static/jinkela/international-home/asserts/bgm-nodata.png"
              />
              <div className="topicName">{item.title}</div>
              <div className="topicName">{item.subtitle}</div>
              <div className="topicName">{item.price_info}元起</div>
            </div>
          ))}
          {/* <ImgLazyLoad/> */}
          <Tab active={1}></Tab>
        </div>
      );
    } else {
      return null;
    }
  }
}
