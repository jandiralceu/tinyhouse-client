import React from "react";
import { List, Typography } from "antd";

import { ListingCard } from "../../../../lib/components";
import { User } from "../../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  listings: User["user"]["listings"];
  page: number;
  limit: number;
  onChangePage: (page: number) => void;
}

export const UserListings = ({
  listings,
  page,
  limit,
  onChangePage,
}: Props) => {
  const userListingsList = (
    <List
      grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
      dataSource={listings?.result ?? undefined}
      locale={{ emptyText: "User doesn't have any listings yet!" }}
      pagination={{
        position: "top",
        current: page,
        total: listings?.total ?? undefined,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => onChangePage(page),
      }}
      renderItem={(listing) => (
        <List.Item>
          <ListingCard listing={listing} />
        </List.Item>
      )}
    />
  );
  return (
    <div className="user-listings">
      <Typography.Title level={4} className="user-listings__title">
        Listings
      </Typography.Title>

      <Typography.Paragraph className="user-listings__description">
        This section highlights the listings this user currently hosts and has
        made available for bookings.
      </Typography.Paragraph>

      {userListingsList}
    </div>
  );
};
