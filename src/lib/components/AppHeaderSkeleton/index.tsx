import React from "react";
import { Layout } from "antd";

import tinyHouseLogo from "./../../../assets/images/tinyhouse-logo.png";

export const AppHeaderSkeleton = () => {
  return (
    <Layout.Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
            <img src={tinyHouseLogo} alt="App logo" />
        </div>
      </div>
    </Layout.Header>
  );
};
