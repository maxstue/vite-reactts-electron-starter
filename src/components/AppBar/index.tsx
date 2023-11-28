import React, { useState } from 'react';
import { Button } from 'antd';

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
      <div className="left">AppBar components</div>
    </>
  )

  return (
    <>
      <div className="flex draggable bg-white w-full">
        <div className="left flex flex-auto">
          123
        </div>
        <div className="right flex w-24 undraggable">
          {/* <Button onClick={window.Main.Minimize} className="w-8 flex-center" type="text">
            &#8211;
          </Button>
          <Button onClick={handleToggle} className="w-8 flex-center" type="text">
            {isMaximize ? '\u2752' : '⃞'}
          </Button>
          <Button onClick={window.Main.Close} className="w-8 flex-center" type="text">
            &#10005;
          </Button> */}
        </div>
      </div>
    </>
  );
}

export default AppBar;
