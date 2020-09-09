import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Menu, Avatar } from "antd";
import { HomeFilled } from "@ant-design/icons";

import { Viewer } from "../../types";
import { LogOut as LogOutData } from "../../graphql/mutations/LogOut/__generated__/LogOut";
import { LOG_OUT } from "../../graphql/mutations";
import { displaySuccessNotification, displayErrorMessage } from "../../utils";

interface MenuItemsProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems: React.FC<MenuItemsProps> = ({ viewer, setViewer }) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data?.logOut) {
        setViewer(data.logOut);
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later!"
      );
    },
  });

  const subMenuLogin = viewer?.id ? (
    <Menu.SubMenu title={<Avatar src={viewer?.avatar ?? ""} />}>
      <Menu.Item key="/user">
        <Link to={`/user/${viewer.id}`}>Profile</Link>
      </Menu.Item>

      <Menu.Item key="/logout">
        <div onClick={() => logOut()}>Log Out</div>
      </Menu.Item>
    </Menu.SubMenu>
  ) : (
    <Menu.Item key="/login">
      <Link to="/login">
        <Button type="primary">Sign In</Button>
      </Link>
    </Menu.Item>
  );
  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Menu.Item key="/host">
        <Link to="/host">
          <HomeFilled />
          Host
        </Link>
      </Menu.Item>
      {subMenuLogin}
    </Menu>
  );
};
