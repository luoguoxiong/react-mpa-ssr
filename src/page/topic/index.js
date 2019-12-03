import React from "react";
import { Tab, ImgLazyLoad } from "@src/components";
import LoadMore from "@src/components/LoadMore";
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
  }
  onBottom = async () => {
    const { currentPage, data } = this.state;
    const list = await http.getTopicList({ page: currentPage + 1, size: 6 });
    data.push(...list.data);
    this.setState({ data, currentPage: currentPage + 1 });
  };

  render() {
    if (this.state.errno === 0) {
      const { data, count } = this.state;
      return (
        <div id="topicPage">
          <LoadMore onBottom={this.onBottom} isAllow={count > data.length}>
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
            {count == data.length && (
              <div className="noHasAny onePx_top">沒有更多~</div>
            )}
          </LoadMore>
          <Tab active={1}></Tab>
        </div>
      );
    } else {
      return null;
    }
  }
}
