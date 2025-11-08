import { useCallback, useEffect, useState } from "react";

import productApi from "apis/products";
import { PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import PageNotFound from "components/commons/PageNotFound";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { LeftArrow } from "neetoicons";
import { Button, Typography } from "neetoui";
import { append, isNotNil } from "ramda";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/route";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const history = useHistory();

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrl,
    imageUrls,
    availableQuantity,
  } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const fetchProduct = useCallback(async () => {
    try {
      const product = await productApi.show(slug);
      setProduct(product);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) return <PageNotFound />;

  return (
    <div className="px-6 pb-6">
      <div className="m-2">
        <div className="flex items-center">
          <LeftArrow
            className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6"
            onClick={history.goBack}
          />
          <Typography className="py-2 text-4xl font-semibold">
            {name}
          </Typography>
        </div>
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
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
