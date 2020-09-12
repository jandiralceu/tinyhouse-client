import React from "react";
import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { formatListingPrice, iconColor } from "../../utils";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
  };
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const { id, title, image, address, price, numOfGuests } = listing;

  return (
    <Link to={`/listing/${id}`}>
      <Card
        hoverable
        cover={
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="listing-card__cover-img"
          />
        }
      >
        <div className="listing-card__details">
          <div className="listing-card__description">
            <Typography.Title level={4} className="listing-card__price">
              {formatListingPrice(price)}
              <span>/day</span>
            </Typography.Title>
            <Typography.Text strong ellipsis className="listing-card__title">
              {title}
            </Typography.Text>
            <Typography.Text ellipsis className="listing-card__address">
              {address}
            </Typography.Text>
          </div>
          <div className="listing-card__dimensions listing-card__dimensions--guests">
            <UserOutlined style={{ color: iconColor }} />
            <Typography.Text>{numOfGuests} guests</Typography.Text>
          </div>
        </div>
      </Card>
    </Link>
  );
};
