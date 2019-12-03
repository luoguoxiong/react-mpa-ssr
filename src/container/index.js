import React from "react";
import Carousel from "antd-mobile/lib/carousel";
import { ImgLazyLoad } from "@src/components";

const Wrapper = ({ title, children }) => {
  return (
    <div className="wrapper">
      <div className="title">{title}</div>
      {children}
    </div>
  );
};

export const Banner = ({ data }) => {
  return (
    <div className="bannerWrap">
      <Carousel autoplay infinite>
        {data.map(item => (
          <div className="banner" key={item.id}>
            <ImgLazyLoad
              realUrl={item.image_url}
              initUrl="https://s1.hdslb.com/bfs/static/jinkela/international-home/asserts/bgm-nodata.png"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export const Channel = ({ data }) => {
  return (
    <ul className="channel">
      {data.map(item => (
        <li key={item.id}>
          <img src={item.icon_url}></img>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export const Brand = ({ data }) => {
  return (
    <Wrapper title="品牌制造商直供">
      <div className="brandContent">
        {data.map(item => (
          <div key={item.id}>
            <span className="brandName">{item.name}</span>
            <span className="brandMoney">{item.floor_price}元起</span>
            <ImgLazyLoad
              realUrl={item.new_pic_url}
              initUrl="https://s1.hdslb.com/bfs/static/jinkela/international-home/asserts/bgm-nodata.png"
            />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export const News = ({ data }) => {
  return (
    <Wrapper title="新品首发">
      <div className="newsContent">
        {data.map(item => (
          <div key={item.id}>
            <ImgLazyLoad
              realUrl={item.list_pic_url}
              initUrl="https://s1.hdslb.com/bfs/static/mult/images/tv.png"
            ></ImgLazyLoad>
            <div className="newsName">{item.name}</div>
            <div className="newsPrice">￥{item.retail_price}</div>
          </div>
        ))}
        <div></div>
      </div>
    </Wrapper>
  );
};

export const Hots = ({ data }) => {
  return (
    <Wrapper title="人气推荐">
      <ul className="hotsContent">
        {data.map(item => (
          <li className="onePx_top" key={item.id}>
            <div className="left">
              <ImgLazyLoad realUrl={item.list_pic_url}></ImgLazyLoad>
            </div>
            <div className="right">
              <div>{item.name}</div>
              <div className="hotGoodsInfo">{item.goods_brief}</div>
              <div className="hotGoodsPrice">￥{item.retail_price}</div>
            </div>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
