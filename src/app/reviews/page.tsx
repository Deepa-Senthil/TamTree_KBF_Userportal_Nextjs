"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/Reviews.module.scss";
import { useGetReviews } from "@/hooks/Hooks";

type ReviewData = {
  id: number;
  rating: number;
  description: string;
  reviewerName: string;
};

type IReview = {
  id?: number;
  rating: number;
  description: string;
  reviewerName: string;
};

const ReviewCard = ({ reviewData }: { reviewData: ReviewData }) => {
  const { rating, description, reviewerName } = reviewData;

  return (
    <div className={styles.card}>
      <div className={styles.stars}>
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className={styles.description}>{description}</p>
      <p className={styles.reviewer}>- {reviewerName}</p>
    </div>
  );
};

const ReviewCards = () => {
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const reviewsPerPage = isMobile ? 4 : 8;
  const { data: reviews, isLoading, isError } = useGetReviews();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <p className={styles.loading}>Loading reviews...</p>;
  if (isError || !reviews)
    return <p className={styles.error}>Failed to load reviews.</p>;

  const formattedReviews: ReviewData[] = reviews.map((review: IReview) => ({
    id: review.id ?? Math.random(),
    rating: review.rating,
    description: review.description,
    reviewerName: review.reviewerName,
  }));

  const totalPages = Math.ceil(formattedReviews.length / reviewsPerPage);
  const paginatedReviews = formattedReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  const handlePageChange = (value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => (
    <div className={styles.paginationWrapper}>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`${styles.pageButton} ${
            page === i + 1 ? styles.active : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Customer Reviews</h2>

      {/* Top Pagination */}
      {/* {totalPages > 1 && renderPagination()} */}

      <div className={styles.cardsWrapper}>
        {paginatedReviews.map((review) => (
          <ReviewCard key={review.id} reviewData={review} />
        ))}
      </div>

      {/* Bottom Pagination */}
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default ReviewCards;
