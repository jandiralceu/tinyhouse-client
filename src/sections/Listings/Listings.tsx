import React, { useCallback } from "react";

import { useQuery, useMutation } from "../../lib/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
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

const DELETE_LISTING = `
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

  const deleteListingHandler = async (id: string) => {
    await deleteListing({ id });

    refetch();
  };

  const listingList = useCallback(
    () => (
      <ul>
        {data?.listings?.map((listing) => (
          <li key={listing.id}>
            {listing.title}

            <button onClick={() => deleteListingHandler(listing.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    ),
    [data]
  );

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>Sorry! Our intern made something yesterday!</h2>;

  return (
    <div>
      <h2>{title}</h2>

      <ul>{listingList()}</ul>

      {loadingOnRemove ? <h3>Removing listing...</h3> : null}
      {errorOnRemove ? <h3>Uh oh! Something went wrong with deleting :(. Please try again soon.</h3> : null}
    </div>
  );
};