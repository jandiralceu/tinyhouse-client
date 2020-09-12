import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Layout, Row, Col } from "antd";

import { Viewer } from "../../lib/types";
import {
  User as UserData,
  UserVariables,
} from "../../lib/graphql/queries/User/__generated__/User";
import { USER } from "../../lib/graphql/queries";
import { UserProfile, UserListings, UserBookings } from "./components";
import { PageSkeleton, ErrorBanner } from "../../lib/components";

interface UserProps {
  viewer: Viewer;
}
interface MatchParams {
  id: string;
}

const PAGE_LIMIT = 5;

export const User = ({ viewer, match }: UserProps & RouteComponentProps<MatchParams>) => {
  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT
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

  const userListings = data?.user.listings ?? null
  const userBookings = data?.user.bookings ?? null

  const userProfileElement = data?.user ? (
    <UserProfile user={data.user} viewerIsUser={viewer.id === match.params.id} />
  ) : null;

  const userListingsElement = userListings ? (
    <UserListings listings={userListings} page={listingsPage} limit={PAGE_LIMIT} onChangePage={setListingsPage} />
  ) : null

  const userBookingsElement = userBookings ? (
    <UserBookings bookings={userBookings} page={bookingsPage} limit={PAGE_LIMIT} onChangePage={setBookingsPage} />
  ) : null

  return (
    <Layout.Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement} </Col>
        <Col xs={24}>
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Layout.Content>
  );
};
