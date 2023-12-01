import React from 'react';
import styles from './index.module.scss';
import Logo from '@/common/images/Icon-Electron.png';
import { Button, Divider, Input, Avatar, ConfigProvider } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Remind, Helpcenter, Schedule } from '@icon-park/react';

export default function Index() {
  const customColor = styles.colorH2
  return (
    <>
      <div className={styles.container}>
        {/* left: logo和标题 */}
        <div className={`${styles.left} flex items-center`}>
          <img className="w-12 h-auto" src={Logo} alt="" />
          <div className="title">Electron</div>
        </div>

        {/* <Divider type="vertical" style={{ height: '100%', margin: 0 }}></Divider> */}

        {/* middle + right */}
        <div className={`flex ${styles.box}`}>
          {/* 搜索框 */}
          <div className={`${styles.middle} flex-1`}>
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainer: '#f5f5f5',
                  colorBorder: '#f5f5f5',
                  colorTextPlaceholder: '$color-h2'
                }
              }}
            >
              <Input
                placeholder="搜索"
                prefix={<SearchOutlined />}
                styles={{ affixWrapper: { width: '300px' } }}
              ></Input>
            </ConfigProvider>
          </div>
          {/* 搜索框end */}

          {/* 按钮和个人信息 */}
          <div className={`${styles.right} flex-1`}>
            {/* 按钮 */}
            <div className={styles.btnBox}>
              <Button icon={<Schedule theme="outline" size="20" fill="#787486" />} type='text'></Button>
              <Button icon={<Helpcenter theme="outline" size="20" fill="#787486" />} type='text'></Button>
              <Button icon={<Remind theme="outline" size="20" fill='#787486' />} type='text'></Button>
            </div>
            {/* 个人信息和头像 */}
            <div className="flex flex-col justify-end text-right mr-2">
              <div className="h1">用户名</div>
              <div className="h2">阿里巴巴有限公司</div>
            </div>
            <Avatar icon={<UserOutlined />}></Avatar>
          </div>
          {/* 按钮和个人信息end */}
        </div>
      </div>

      {/* 分割线 */}
      <Divider style={{ margin: 0 }}></Divider>
      {/* <Divider type="vertical" style={{ margin: 0, left: '20vw', position: 'absolute' }}></Divider> */}
    </>
  );
}
