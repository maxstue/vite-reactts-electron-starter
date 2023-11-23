import React from 'react';
import './Index.scss';
import Logo from '@/assets/icons/Icon-Electron.png';
import { Divider, Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function Index() {
  return (
    <>
      <div className="flex items-center p-2">
        <Space size={'middle'}>
          {/* logo和标题 */}
          <div className="left flex-center">
            <img className="w-12 h-auto" src={Logo} alt="" />
            <div className="title">Electron</div>
          </div>
          {/* 搜索框 */}
          <div className="middle flex-center">
            {/* <Search></Search> */}
          </div>
        </Space>
        {/* 按钮和个人信息 */}
        <div className="right"></div>
      </div>
      {/* 分割线 */}
      <Divider style={{ margin: 0 }}></Divider>
      <Divider type='vertical' style={{ margin: 0, left: '20vw', position: 'absolute' }}></Divider>
    </>
  );
}
