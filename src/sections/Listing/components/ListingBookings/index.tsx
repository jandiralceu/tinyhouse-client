import React from "react";
import { Link } from "react-router-dom"
import { List, Typography, Avatar, Divider } from "antd";

import { Listing } from "../../../../lib/graphql/queries/Listing/__generated__/Listing";

interface Props {
  listings: Listing["listing"]["bookings"];
  page: number;
  limit: number;
  onChangePage: (page: number) => void;
}

export const ListingBookings = ({
  listings,
  page,
  limit,
  onChangePage,
}: Props) => {
  const listingBookings = listings ? (
    <List
      grid={{ gutter: 8, xs: 1, sm: 2, lg: 3 }}
      dataSource={listings?.result ?? undefined}
      locale={{ emptyText: "No bookings have been made yet!" }}
      pagination={{
        current: page,
        total: listings?.total ?? undefined,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => onChangePage(page),
      }}
      renderItem={(listing) => {
        const bookingHistory = (
          <div className="listing-bookings__history">
            <div>
              Check in:{" "}
              <Typography.Text strong>{listing.checkIn}</Typography.Text>
            </div>
            <div>
              Check out:{" "}
              <Typography.Text strong>{listing.checkOut}</Typography.Text>
            </div>
          </div>
        );

        return (
          <List.Item className="listing-bookings__item">
            {bookingHistory}

            <Link to={`/user/${listing.tenant.id}`}>
                <Avatar
                    src={listing.tenant.avatar}
                    size={64}
                    shape="square"
                />
            </Link>
          </List.Item>
        );
      }}
    />
  ) : null;

  const listingBookingsElement = listingBookings ? (
    <div className="listing-bookings">
      <Divider />

      <div className="listing-bookings__section">
        <Typography.Title level={4}>
          Listing
        </Typography.Title>
      </div>

      {listingBookings}
    </div>
  ) : null;

  return listingBookingsElement;
};
