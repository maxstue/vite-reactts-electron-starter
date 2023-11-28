import React from 'react';
import Logo from '@/common/images/Icon-Electron.png';
import Abstraction from '@/common/images/Abstraction.png';
import styles from './index.scss';

export default function Index() {
  return(
    <>
        <div className={styles.left}>login</div>
    </>
  )
  return (
    <div className="container">
      {/* 左侧 */}
      <div className="left">
        <img className="logo" src={Logo} alt="logo" />
        <div className="title">标题管理系统</div>
        <img className="Abstraction" src={Abstraction} alt="" />
      </div>
      {/* 右侧 */}
      <div className="right"></div>
    </div>
  );
}
