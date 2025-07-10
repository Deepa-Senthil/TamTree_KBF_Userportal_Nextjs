import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  fetchCategories,
  fetchProductDetailById,
  fetchProducts,
  getProductsByCategory,
  getReviews,
  getSearchProducts,
} from "../lib/api";


interface Product {
  id: string;
  title: string;
  description: string;
  methods: string;
  ingredients: string;
  sizeWithPrice: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
interface ProductsByCategoryResponse {
  categoryName: string;
  products: Product[];
}
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetProductsByCategory = (categoryId: string) => {
  return useQuery<ProductsByCategoryResponse>({
    queryKey: ["products", categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useProductDetailById = (productId: string) => {
  return useQuery({
    queryKey: ["ProductById", productId],
    queryFn: () => fetchProductDetailById(productId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetSearchProducts = (searchTerm: string) => {
  return useQuery({
    queryKey: ["searchProducts", searchTerm], // Query key
    queryFn: () => getSearchProducts(searchTerm), // Query function
    refetchOnWindowFocus: false, // Optional options
    refetchOnMount: false,
  });
};

export const useCreateOrders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Error creating order:", error);
    },
  });
};
