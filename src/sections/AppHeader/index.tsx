import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";

import { MenuItems } from "../../lib/components";
import { Viewer } from "../../lib/types";

import tinyHouseLogo from "./../../assets/images/tinyhouse-logo.png";

interface AppHeaderProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ viewer, setViewer }) => {
  return (
    <Layout.Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={tinyHouseLogo} alt="App logo" />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Layout.Header>
  );
};
