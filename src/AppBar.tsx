import React, { useState } from 'react';

import Icon from './assets/icons/Icon-Electron.png';
import { Button } from 'antd';
import { HomeFilled } from '@ant-design/icons';

function AppBar() {
  const [isMaximize, setMaximize] = useState(false);

  const handleToggle = () => {
    if (isMaximize) {
      setMaximize(false);
    } else {
      setMaximize(true);
    }
    window.Main.Maximize();
  };

  return (
    <>
      <div className="flex draggable bg-white">
        <div className="left flex flex-auto">
          {/* <Button icon={<HomeFilled />} className="w-30px h-30px" type="text" /> */}
        </div>
        <div className="right flex w-24 undraggable">
          <Button onClick={window.Main.Minimize} className="w-8 flex-center" type="text">
            &#8211;
          </Button>
          <Button onClick={handleToggle} className="w-8 flex-center" type="text">
            {isMaximize ? '\u2752' : '⃞'}
          </Button>
          <Button onClick={window.Main.Close} className="w-8 flex-center" type="text">
            &#10005;
          </Button>
        </div>
      </div>
    </>
  );
}

export default AppBar;
