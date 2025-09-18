import { useEffect, useState } from "react";

import productApi from "apis/products";
import { Spinner, Typography } from "neetoui";
import { append, isNotNil } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { name, description, mrp, offerPrice, imageUrl, imageUrls } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  const fetchProduct = async () => {
    try {
      const product = await productApi.show();
      setProduct(product);
    } catch (error) {
      console.log("An error occurred", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold">{name}</Typography>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="flex w-2/5 justify-center">
          {isNotNil(imageUrls) ? (
            <Carousel
              imageUrls={append(imageUrl, imageUrls)}
              title="Infinix Inbook"
            />
          ) : (
            <img alt={name} className="h-48 w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <p>MRP: {mrp}</p>
          <p className="font-semibold">Offer price: {offerPrice}</p>
          <p className="font-semibold text-green-600">
            {discountPercentage}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
