import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/ui/StarRating.tsx";
import FragranceNotes from "../components/ui/FragranceNotes.tsx";
import { GetPerfumeDetailDTO } from "@/types/dto/perfumes/GetPerfumeDetailDTO.ts";
import {
  getAverageRatingRequest,
  getPerfumeRequest,
  makeRatingRequest,
  makeReviewRequest,
} from "@/api/index.ts";
import { getAllPublicReviewsForPerfume } from "@/api/review.ts";
import { cn } from "../lib/utils";
import useCart from "@/hooks/contexts/useCart.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Review } from "@/types/entity/Review.ts";
import useAuth from "@/hooks/contexts/useAuth.tsx";
import { AverageRating } from "@/types/entity/AverageRating.ts";
import StarRatingSelect from "@/components/ui/StarRatingSelect.tsx";
import { PerfumeVariant } from "@/types/entity/Perfume.ts";
import { Button } from "@/components/ui/button.tsx";

const PerfumeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [perfume, setPerfume] = useState<GetPerfumeDetailDTO | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratings, setRatings] = useState<AverageRating | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedVariant, setSelectedVariant] =
    React.useState<PerfumeVariant | null>(null);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const { addToBasket, getBasketProduct, removeFromBasket } = useCart();
  const { isAuthenticated, user } = useAuth();

  // #region Mount Functions ==============================================================
  useEffect(() => {
    getPerfume();
    getPerfumeReviews();
    getAverageRating();
  }, []);

  const getPerfume = async () => {
    try {
      if (id) {
        const response = await getPerfumeRequest(id);
        setMinimumVariantWithStock(response.data.item.variants, id);
        setPerfume(response.data.item);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPerfumeReviews = async () => {
    try {
      if (id) {
        const response = await getAllPublicReviewsForPerfume(id);
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAverageRating = async () => {
    try {
      if (id) {
        const response = await getAverageRatingRequest(id);
        setRatings(response.data.rating);
        setSelectedRating(response.data.rating.userRating);
      }
    } catch (error) {
      console.error;
    }
  };

  const setMinimumVariantWithStock = (
    variants: PerfumeVariant[],
    id: string
  ) => {
    const variantsWithStock = variants
      .filter((variant) => variant.stock > 0)
      .sort((a, b) => a.volume - b.volume);

    const basketVariant = variants.find((variant) =>
      getBasketProduct(id, variant.volume)
    );
    setSelectedVariant(
      basketVariant ||
        (variantsWithStock.length > 0 ? variantsWithStock[0] : variants[0])
    );
  };
  // #endregion

  // #region Handler Functions ============================================================
  const handleAddToBasket = (perfume: GetPerfumeDetailDTO) => {
    const item = {
      perfumeId: perfume.id,
      perfumeName: perfume.name,
      brand: perfume.brand,
      volume: selectedVariant?.volume ?? 0,
      quantity: +1,
      basePrice: selectedVariant?.price ?? 0,
    };

    addToBasket(item);
  };

  const handleMakeReview = async () => {
    try {
      if (id) {
        const response = await makeReviewRequest(id, { rating: 5, comment });
        if (response.status === 200) {
          setComment("");
          getPerfumeReviews();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetRating = async (rating: number) => {
    try {
      if (id) {
        const response = await makeRatingRequest(id, {
          rating,
        });
        if (response.status === 200) {
          setSelectedRating(rating);
          getAverageRating();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  // #endregion

  // #region Render Functions =============================================================
  const renderEmptyState = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Fragrance Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The fragrance you're looking for could not be found.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    );
  };

  const renderVariantSelector = () => {
    return (
      <>
        <div className="flex items-center gap-2">
          {perfume?.variants.map((variant) => (
            <span
              className={cn(
                "p-4 border-primary border-2 cursor-pointer text-primary",
                {
                  "bg-primary text-white":
                    selectedVariant?.volume === variant.volume,
                }
              )}
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.volume}
            </span>
          ))}
        </div>
      </>
    );
  };

  const renderRatingSection = () => {
    const reviewPointCount = ratings?.ratingCounts ?? {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const fullName = isAuthenticated
      ? `${user?.firstName} ${user?.lastName}`
      : "Anonymous";

    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Ratings & Reviews</h2>

        <div className="flex items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {perfume?.averageRating?.toFixed(1) ?? 0}
            </div>
            <StarRating
              rating={perfume?.averageRating ?? 0}
              size="lg"
              showNumber={false}
            />
            <div className="text-sm text-gray-500 mt-1">
              {ratings?.ratingCount ?? 0} ratings
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const percentage = reviewPointCount[
                star as keyof typeof reviewPointCount
              ]
                ? (
                    (reviewPointCount[star as keyof typeof reviewPointCount] /
                      (ratings?.ratingCount ?? 1)) *
                    100
                  ).toFixed(1)
                : 0;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-12 text-sm text-gray-600">{star} stars</div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm text-gray-500">
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center mb-4 gap-8">
          <h3 className="text-xl font-bold">
            {ratings?.isRated ? "Your rating" : "Rate the perfume"}:{" "}
          </h3>
          <StarRatingSelect
            rating={selectedRating}
            setRating={handleSetRating}
            size="lg"
          />
        </div>
        <div className="flex flex-col gap-4 mb-8">
          {reviews?.map((review) => {
            if (
              (review.comment && review.isApproved) ||
              review.user === fullName
            ) {
              return (
                <div key={review.id} className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">
                        {review.user}{" "}
                        {!review.isApproved && (
                          <span style={{ fontWeight: 400 }}>
                            (Not approved yet)
                          </span>
                        )}
                      </h3>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        {isAuthenticated && (
          <div>
            <Textarea
              className="mb-4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                resize: "none",
              }}
            />
            <button
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              onClick={handleMakeReview}
            >
              Write a Review
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderFavoriteButton = () => {
    return (
      <button className="text-gray-500 hover:text-red-500">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.414l1.318-1.096a4.5 4.5 0 016.364 6.364l-7.318 7.318a.75.75 0 01-1.06 0l-7.318-7.318a4.5 4.5 0 010-6.364z"
          />
        </svg>
      </button>
    );
  };

  const renderPerfumeContainer = () => {
    return (
      <div className="flex  justify-between gap-9">
        <div className="lg:w-1/2">{renderLeftContainer()}</div>
        <div className="lg:w-1/2">{renderRightContainer()}</div>
      </div>
    );
  };

  const renderLeftContainer = () => {
    return (
      <div className="sticky top-8 bg-white">
        <img
          src={perfume?.assetUrl}
          alt={`${perfume?.name}`}
          className="w-full rounded-lg shadow-lg object-scale-down max-h-[60vh]"
        />
      </div>
    );
  };

  const renderStock = () => {
    return (
      <div className="flex items-center gap-4">
        <div className="text-gray-600 font-semibold">
          Stock: {selectedVariant?.stock}
        </div>
      </div>
    );
  };
  const renderRightContainer = () => {
    const inStock = (selectedVariant?.stock ?? 0) > 0;
    return (
      <div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{perfume?.name}</h1>
            </div>
            {/* {renderFavoriteButton()} */}
          </div>
          {renderVariantSelector()}
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${selectedVariant?.price}{" "}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary rounded-full text-sm text-white">
              {perfume?.gender}
            </span>
            {!inStock && (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                Out of Stock
              </span>
            )}
          </div>
          <p className="text-gray-700">{perfume?.description}</p>
          {renderBasket()}
          {renderStock()}
        </div>
      </div>
    );
  };

  const renderAddToBasketButton = () => {
    const inStock = (selectedVariant?.stock ?? 0) > 0;

    return (
      <div className="mt-4">
        <Button
          className={`w-full py-2 px-4 rounded-md transition-colors duration-200 `}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToBasket(perfume ?? ({} as GetPerfumeDetailDTO));
          }}
          disabled={!inStock}
        >
          {"Add to Cart"}
        </Button>
      </div>
    );
  };

  const renderAdjustBasketButtons = () => {
    return (
      <div className="flex justify-between">
        <div className="flex items-center bg-white p-2 rounded-lg border-2">
          <Button
            className="px-4 py-2 rounded-l-md border-"
            onClick={(e) => {
              e.stopPropagation();
              removeFromBasket(id ?? "", selectedVariant?.volume ?? 0, 1);
            }}
          >
            -
          </Button>
          <div className="px-8 py-2 border-r flex items-center">
            {getBasketProduct(id ?? "", selectedVariant?.volume ?? 0)
              ?.quantity || 0}
          </div>
          <Button
            className="px-4 py-2 rounded-r-md"
            onClick={(e) => {
              e.stopPropagation();
              const basketItem = getBasketProduct(
                id ?? "",
                selectedVariant?.volume ?? 0
              );
              if (
                basketItem &&
                basketItem.quantity < (selectedVariant?.stock ?? 0)
              ) {
                const item = {
                  perfumeId: id ?? "",
                  perfumeName: perfume?.name ?? "",
                  brand: perfume?.brand ?? "",
                  volume: selectedVariant?.volume ?? 0,
                  quantity: +1,
                  basePrice: selectedVariant?.price ?? 0,
                };
                addToBasket(item);
              }
            }}
            // @ts-ignore
            disabled={
              getBasketProduct(perfume.id, selectedVariant.volume)?.quantity >=
              selectedVariant.stock
            }
          >
            +
          </Button>
        </div>
      </div>
    );
  };

  const renderBasket = () => {
    const basketItem = getBasketProduct(
      perfume?.id ?? "",
      selectedVariant?.volume ?? 0
    );
    const renderBasketButton = () => {
      if (basketItem) {
        return renderAdjustBasketButtons();
      } else {
        return renderAddToBasketButton();
      }
    };

    return renderBasketButton();
  };

  // #endregion

  if (isLoading) {
    return <>Loading...</>;
  }

  if (perfume == null) {
    return renderEmptyState();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col  gap-12">
        {/* Left side - Image and Details */}
        {renderPerfumeContainer()}
        {renderRatingSection()}
        {/* Right side - Notes and Reviews */}
        <div className="lg:w-1/2 space-y-8">{/* Ratings Section */}</div>
      </div>
    </div>
  );
};

export default PerfumeDetailPage;
