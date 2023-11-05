import React, { memo } from "react";
import './index.scss';

const MainView = memo(function MainView() {
  return <div className="mainView">
    <button
      onClick={() => {
        window.electronMain.openDevTools(true);
      }}
    >
      打开调试器
    </button>
    <button
      onClick={() => {
        window.electronMain.openDevTools(false);
      }}
    >
      关闭调试器
    </button>
    <button
      onClick={() => {
        window.electronMain.openBrowserWindow({
          url: "http://localhost:5002/",
          width: 400,
          height: 600,
        });
      }}
    >
      打开弹窗
    </button>
  </div>
})

export default MainView