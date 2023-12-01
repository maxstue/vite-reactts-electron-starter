import React from 'react';
import './index.module.scss';
import Logo from '@/common/images/Icon-Electron.png';
import { Divider, Input, Space, Avatar } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { CheckOne } from '@icon-park/react';

const { Search } = Input;

export default function Index() {
  return (
    <>
      <div className="flex items-center p-2 user-select-none">
        <Space size={'middle'}>
          {/* logo和标题 */}
          <div className="left flex-center">
            <img className="w-12 h-auto" src={Logo} alt="" />
            <div className="title">Electron</div>
          </div>
          {/* 搜索框 */}
          <div className="middle flex-center">
            {/* <Search></Search> */}
            <CheckOne theme='filled' size="32" fill="#17bd08"></CheckOne>
          </div>
        </Space>

        {/* 按钮和个人信息 */}
        <div className="right flex flex-center">
          <div className="flex flex-col justify-end text-right">
            <div className="username">用户名</div>
            <div className="company">阿里巴巴集团</div>
          </div>
          <Avatar icon={<UserOutlined />}></Avatar>
          <DownOutlined />
        </div>
      </div>

      {/* 分割线 */}
      <Divider style={{ margin: 0 }}></Divider>
      <Divider type="vertical" style={{ margin: 0, left: '20vw', position: 'absolute' }}></Divider>
    </>
  );
}
