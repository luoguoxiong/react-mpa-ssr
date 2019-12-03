import React from "react";
import "./index.less";
export default class Tab extends React.PureComponent {
  state = {
    list: [
      { icon: "iconfont icon-caidaniconshouyehui", name: "首页", url: "/" },
      { icon: "iconfont icon-clone", name: "专题", url: "/topic" },
      { icon: "iconfont icon-sort", name: "分类", url: "/catelog" },
      { icon: "iconfont icon-cart", name: "购物车", url: "/cart" },
      { icon: "iconfont icon-mine", name: "我的", url: "/mine" }
    ]
  };
  render() {
    const { list } = this.state;
    const { active = 0 } = this.props;
    return (
      <nav id="tabCom">
        <div className="tabContent">
          {list.map((item, index) => (
            <div
              key={index}
              className={index === active ? "active" : ""}
              onClick={() => {
                this.props.onChange &&
                  index !== active &&
                  this.props.onChange(item);
              }}
            >
              <div className="tabIcon">
                <i className={item.icon}></i>
              </div>
              <div className="tabName">{item.name}</div>
            </div>
          ))}
        </div>
      </nav>
    );
  }
}
