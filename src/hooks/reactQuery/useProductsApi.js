import { QUERY_KEYS } from "constants/query";

import productApi from "apis/products";
import { useQuery } from "react-query";

export const useShowProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productApi.show(slug),
  });

export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productApi.fetch(params),
    keepPreviousData: true,
  });
