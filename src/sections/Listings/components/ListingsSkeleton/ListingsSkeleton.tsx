import React from "react";
import { Skeleton, Divider, Alert } from "antd";

import "./styles/ListingsSkeleton.css";

interface ListingsSkeletonProps {
  title: string;
  error: boolean;
}
export const ListingsSkeleton: React.FC<ListingsSkeletonProps> = ({
  title,
  error = false,
}) => {
  return (
    <div className="listings-skeleton">
      {error ? (
        <Alert
          type="error"
          message="Uh oh! Something went wrong. Please try again soon"
          className="listings-skeleton__alert"
        />
      ) : null}
      <h1>{title}</h1>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />

      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />

      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
    </div>
  );
};
