import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Divider, Tag, Typography } from "antd";
import { FaMapMarkerAlt } from 'react-icons/fa'

import { Listing as ListingData } from "../../../../lib/graphql/queries/Listing/__generated__/Listing";
import { iconColor } from "../../../../lib/utils";

interface Props {
  listing: ListingData["listing"];
}

export const ListingDetails = ({ listing }: Props) => {
  const {
    title,
    description,
    image,
    type,
    address,
    city,
    numOfGuests,
    host,
  } = listing;

  return (
    <div className="listing-details">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="listing-details__image"
      />

      <div className="listing-details__information">
        <Typography.Paragraph
          type="secondary"
          ellipsis
          className="listing-details__city-address"
        >
          <Link to={`/listings/${city}`}>
            <FaMapMarkerAlt color={iconColor} />
          </Link>
          <Divider type="vertical" />
          {address}
        </Typography.Paragraph>
        <Typography.Title level={3} className="listing-details__title">
          {title}
        </Typography.Title>
      </div>

      <Divider />

      <div className="listing-details__section">
        <Link to={`/user/${host.id}`}>
          <Avatar src={host.avatar} size={64} />
          <Typography.Title level={2} className="listing-details__host-name">
            {host.name}
          </Typography.Title>
        </Link>
      </div>

      <Divider />

      <div className="listing-details__section">
        <Typography.Title level={4}>About this space</Typography.Title>
        <div className="listing-details__about-items">
          <Tag color="magenta">{type}</Tag>
          <Tag color="magenta">{numOfGuests} Guests</Tag>
        </div>
        <Typography.Paragraph ellipsis={{ rows: 3, expandable: true }}>
          {description}
        </Typography.Paragraph>
      </div>
    </div>
  );
};
