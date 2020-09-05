import React from "react";

import { server } from "../../lib/api";
import { ListingsData, DeleteListingData, DeleteListingVariables } from './types'

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
  const fetchListings = async () => {
   const { data } = await server.fetch<ListingsData>({ query: LISTINGS })

   console.log(data)
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
        query: DELETE_LISTING,
        variables: { id: "5f508415fb17e358ec947a47" }
    })

    console.log(data)
  }

  return (
    <div>
      <h2>{title}</h2>

      <button onClick={fetchListings}>Query Listing</button>
      <button onClick={deleteListing}>Delete a  Listing</button>
    </div>
  );
};
