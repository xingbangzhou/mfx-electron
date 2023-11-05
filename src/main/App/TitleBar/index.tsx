import React, { memo } from "react";
import './index.scss';

const TitleBar = memo(function TitleBar() {
  return <div className="titleBarContainer">
    <div className="titleBar">
      <p>Electron</p>
    </div>
  </div>
})

export default TitleBar
