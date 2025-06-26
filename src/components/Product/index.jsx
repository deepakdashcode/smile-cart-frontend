import { useCallback, useEffect, useState } from "react";

import productsApi from "apis/products";
import { PageLoader, Header, PageNotFound } from "components/common";
import AddToCart from "components/common/AddToCart";
import { Typography } from "neetoui";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

// import { IMAGE_URLS } from "./constants";

const Product = () => {
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();
  const fetchProduct = useCallback(async () => {
    try {
      const product = await productsApi.show(slug);
      setProduct(product);
    } catch (error) {
      setIsError(true);
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <PageNotFound />;
  }

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(imageUrls) ? (
            <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <AddToCart slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default Product;
