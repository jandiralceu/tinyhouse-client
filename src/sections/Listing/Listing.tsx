import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Layout, Col, Row } from "antd";

import { LISTING } from "../../lib/graphql/queries";
import {
  Listing as ListingData,
  ListingVariables
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { ErrorBanner, PageSkeleton } from "../../lib/components";
import { ListingBookings, ListingDetails } from "./components";

interface MatchParams {
  id: string;
}

const PAGE_LIMIT = 3;

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [page, setPage] = useState(1);

  const { loading, data, error } = useQuery<ListingData, ListingVariables>(LISTING, {
    variables: {
      id: match.params.id,
      page,
      limit: PAGE_LIMIT
    }
  });

  if (loading) {
    return (
      <Layout.Content className="listings">
        <PageSkeleton />
      </Layout.Content>
    );
  }

  if (error) {
    return (
      <Layout.Content className="listing">
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Layout.Content>
    );
  }

  const listingBookings = data?.listing?.bookings ?? null;

  const listingDetailsElement = data?.listing ? <ListingDetails listing={data.listing} /> : null
  const listingBookingsElement = listingBookings ? <ListingBookings listings={listingBookings} page={page} onChangePage={setPage} limit={PAGE_LIMIT}  /> : null

  return (
    <Layout.Content className="listings">
      <Row gutter={24} justify="space-between">
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingBookingsElement}
        </Col>
      </Row>
    </Layout.Content>
  );
};
