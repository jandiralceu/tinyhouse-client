import React from "react";
import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Layout, Row, Col } from "antd";

import { USER } from "../../lib/graphql/queries";
import {
  User as UserData,
  UserVariables,
} from "../../lib/graphql/queries/User/__generated__/User";
import { UserProfile } from "./components";
import { Viewer } from "../../lib/types";
import { PageSkeleton, ErrorBanner } from "../../lib/components";

interface UserProps {
  viewer: Viewer;
}
interface MatchParams {
  id: string;
}

export const User = ({ viewer, match }: UserProps & RouteComponentProps<MatchParams>) => {
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
    },
  });

  if (loading) {
    return (
      <Layout.Content className="user">
        <PageSkeleton />
      </Layout.Content>
    )
  }

  if (error) {
    return (
      <Layout.Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Layout.Content>
    );
  }

  const userProfileElement = data?.user ? (
    <UserProfile user={data.user} viewerIsUser={viewer.id === match.params.id} />
  ) : null;

  return (
    <Layout.Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement} </Col>
      </Row>
    </Layout.Content>
  );
};
