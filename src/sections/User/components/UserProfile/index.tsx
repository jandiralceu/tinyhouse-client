import React from "react";
import { Avatar, Card, Divider, Typography, Button } from "antd";

import { User as UserData } from "../../../../lib/graphql/queries/User/__generated__/User";

interface UserProfileProps {
  user: UserData["user"];
  viewerIsUser: boolean;
}

export const UserProfile = ({ user, viewerIsUser }: UserProfileProps) => {
  const additionalDetailsSection = viewerIsUser ? (
    <>
      <Divider />
      <div className="user-profile__details">
        <Typography.Title level={4}>Additional Details</Typography.Title>
        <Typography.Paragraph>
          Interested in becoming a TinyHouse host? Register with your Stripe
          account!
        </Typography.Paragraph>
        <Button type="primary" className="user-profile__details-cta">
          Connect with Stripe!
        </Button>
        <Typography.Paragraph type="secondary">
          TinyHouse uses{" "}
          <a
            href="https://stripe.com/en-US/connect"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe
          </a>{" "}
          to help transfer your earnings in a secure and trusted manner.
        </Typography.Paragraph>
      </div>
    </>
  ) : null;

  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Typography.Title level={4}>Details</Typography.Title>
          <Typography.Paragraph>
            Name: <Typography.Text strong>{user.name}</Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            Contact: <Typography.Text strong>{user.contact}</Typography.Text>
          </Typography.Paragraph>
        </div>

        {additionalDetailsSection}
      </Card>
    </div>
  );
};
