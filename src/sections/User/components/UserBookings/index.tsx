import React from "react";
import { List, Typography } from "antd";

import { ListingCard } from "../../../../lib/components";
import { User } from "../../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  bookings: User["user"]["bookings"];
  page: number;
  limit: number;
  onChangePage: (page: number) => void;
}

export const UserBookings = ({
  bookings,
  page,
  limit,
  onChangePage,
}: Props) => {
  const userBookingsList = bookings ? (
    <List
      grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
      dataSource={bookings?.result ?? undefined }
      locale={{ emptyText: "You haven't made any bookings!" }}
      pagination={{
        position: "top",
        current: page,
        total: bookings?.total ?? undefined,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => onChangePage(page),
      }}
      renderItem={(booking) => {
        const bookingHistory = (
          <div className="user-bookings__booking-history">
            <div>
              Check in:{" "}
              <Typography.Text strong>{booking.checkIn}</Typography.Text>
            </div>
            <div>
              Check out:{" "}
              <Typography.Text strong>{booking.checkOut}</Typography.Text>
            </div>
          </div>
        );

        return (
          <List.Item>
            {bookingHistory}
            <ListingCard listing={booking.listing} />
          </List.Item>
        );
      }}
    />
  ) : null;

  const userBookingsElement = userBookingsList ? (
    <div className="user-bookings">
      <Typography.Title level={4} className="user-bookings__title">
        Bookings
      </Typography.Title>

      <Typography.Paragraph className="user-bookings__description">
        This section highlights the bookings you've made, and the
        check-in/check-out dates associated with said bookings.
      </Typography.Paragraph>

      {userBookingsList}
    </div>
  ) : null;

  return userBookingsElement;
};
