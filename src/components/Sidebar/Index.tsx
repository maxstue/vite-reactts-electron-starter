import React from 'react';
import { Menu, MenuItemProps } from 'antd';

export default function Index() {
  return (
    <>
      <Menu mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <a href="/home">
            <span className="iconfont icon-home"></span>
            <span className="menu-text">首页</span>
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/home/user">
            <span className="iconfont icon-user"></span>
            <span className="menu-text">个人中心</span>
          </a>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/home/user/order">
            <span className="iconfont icon-order"></span>
            <span className="menu-text">我的订单</span>
          </a>
        </Menu.Item>
        <Menu.Item key="4">
          <a href="/home/user/address">
            <span className="iconfont icon-address"></span>
            <span className="menu-text">收货地址</span>
          </a>
        </Menu.Item>
      </Menu>
    </>
  );
}
