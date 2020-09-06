import React, { useCallback } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";
import { List, Avatar, Button, Spin, Alert } from "antd/es";

import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from "./__generated__/DeleteListing";
import "./styles/Listings.css";
import { ListingsSkeleton } from "./components";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface ListingProps {
  title: string;
}

export const Listings: React.FC<ListingProps> = ({ title }) => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: loadingOnRemove, error: errorOnRemove },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const listingList = useCallback(() => {
    const deleteListingHandler = async (id: string) => {
      await deleteListing({ variables: { id } });

      refetch();
    };

    return (
      <List
        itemLayout="horizontal"
        dataSource={data?.listings}
        renderItem={(listing) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => deleteListingHandler(listing.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={listing.title}
              description={listing.address}
              avatar={<Avatar src={listing.image} shape="square" size={48} />}
            />
          </List.Item>
        )}
      />
    );
  }, [data, refetch, deleteListing]);

  if (loading || error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error={error ? true : false} />
      </div>
    );
  }

  return (
    <div className="listings">
      <Spin spinning={loadingOnRemove}>
        {errorOnRemove ? (
          <Alert
            type="error"
            message="Uh oh! Something went wrong with deleting. Please try again soon."
            className="listings__alert"
          />
        ) : null}

        <h2>{title}</h2>

        <ul>{listingList()}</ul>
      </Spin>
    </div>
  );
};
